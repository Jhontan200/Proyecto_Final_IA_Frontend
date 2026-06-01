import './style.css';
import { Navbar } from './components/Navbar.js';
import { AuthForm } from './components/AuthForm.js';
import { ErrorView } from './components/ErrorView.js';
import { QuestionCard } from './components/QuestionCard.js';
import { DeviceCard } from './components/DeviceCard.js';
import { QuizModeSelector } from './components/QuizModeSelector.js';
import { HistoryView } from './components/HistoryView.js';
import { API } from './services/api.js';

const navbarRoot = document.getElementById('navbar-root');
const appRoot = document.getElementById('app-root');
let modoRegistro = false, preguntas = [], indiceActual = 0, respuestasAcumuladas = {}, modoQuiz = 'detallado';

function sincronizarNavbar() {
  const usuario = JSON.parse(localStorage.getItem('usuario_ia'));
  navbarRoot.innerHTML = Navbar(usuario, () => navegarA('auth'));
  if (usuario && document.getElementById('btn-historial-nav') === null) {
    const btn = document.createElement('button'); btn.id = 'btn-historial-nav';
    btn.className = 'text-zinc-400 hover:text-zinc-200 text-xs font-mono ml-4 cursor-pointer';
    btn.textContent = '[Historial]'; btn.onclick = () => navegarA('historial');
    navbarRoot.appendChild(btn);
  }
}

async function navegarA(ruta) {
  sincronizarNavbar();
  if (ruta === 'loading') appRoot.innerHTML = `<div class="text-center space-y-4"><div class="animate-spin rounded-full h-7 w-7 border-b-2 border-zinc-500 mx-auto"></div></div>`;
  else if (ruta === 'error') appRoot.innerHTML = ErrorView();
  else if (ruta === 'auth') appRoot.innerHTML = AuthForm(modoRegistro, manejarAuth, (m) => { modoRegistro = m; navegarA('auth'); });
  else if (ruta === 'selector_modo') appRoot.innerHTML = QuizModeSelector((modo) => { modoQuiz = modo; navegarA('quiz'); });
  else if (ruta === 'quiz') ejecutarFlujoQuiz();
  else if (ruta === 'historial') {
    try {
      const u = JSON.parse(localStorage.getItem('usuario_ia'));
      const data = await API.obtenerHistorial(u.id_usuario);
      appRoot.innerHTML = HistoryView(data, () => { indiceActual = 0; respuestasAcumuladas = {}; navegarA('selector_modo'); });
    } catch { navegarA('error'); }
  }
}

async function manejarAuth(datos) {
  const errDiv = document.getElementById('auth-error-container'); errDiv.classList.add('hidden');
  try {
    if (modoRegistro) {
      const res = await API.registro(datos.nombre, datos.correo, datos.contrasena);
      alert(res.message); modoRegistro = false; navegarA('auth');
    } else {
      const res = await API.login(datos.correo, datos.contrasena);
      localStorage.setItem('usuario_ia', JSON.stringify(res.usuario)); protegerRutas();
    }
  } catch (err) { errDiv.textContent = err.message; errDiv.classList.remove('hidden'); }
}

async function ejecutarFlujoQuiz() {
  try {
    if (preguntas.length === 0) {
      const res = await API.obtenerFormulario();
      const rawPreguntas = res.preguntas || [];
      const idsExpress = [1, 2, 3, 5, 7];
      preguntas = modoQuiz === 'simple' ? rawPreguntas.filter(p => idsExpress.includes(p.id_pregunta)) : rawPreguntas;
    }
    if (indiceActual < preguntas.length) {
      appRoot.innerHTML = QuestionCard(preguntas[indiceActual], indiceActual, preguntas.length, (id, val) => { respuestasAcumuladas[id] = val; indiceActual++; ejecutarFlujoQuiz(); });
    } else mostrarResultadosIA();
  } catch { navegarA('error'); }
}

function protegerRutas() { navegarA(localStorage.getItem('usuario_ia') ? 'selector_modo' : 'auth'); }

async function mostrarResultadosIA() {
  appRoot.innerHTML = `<div class="text-center space-y-4"><div class="animate-spin h-7 w-7 border-b-2 border-zinc-500 mx-auto"></div></div>`;
  try {
    const textoGlobal = Object.values(respuestasAcumuladas).join(" ").toLowerCase();
    let pCalibrado = 4500;
    if (textoGlobal.includes("menos de bs 1500")) pCalibrado = 1200;
    else if (textoGlobal.includes("entre bs 1500")) pCalibrado = 2500;

    const uActivo = JSON.parse(localStorage.getItem('usuario_ia'));
    const payloadCalibrado = {
      id_usuario: uActivo ? uActivo.id_usuario : null, // Sella la fuga de guardado
      presupuesto: pCalibrado,
      uso: textoGlobal.includes("gaming") ? "gaming" : textoGlobal.includes("estudio") ? "estudio" : "trabajo",
      fotografia: textoGlobal.includes("alta") || textoGlobal.includes("importante") ? "alta" : "normal",
      bateria: textoGlobal.includes("sí") || textoGlobal.includes("autonomía") ? "sí" : "no",
      multitarea: textoGlobal.includes("múltiples") ? "sí" : "no",
      almacenamiento: textoGlobal.includes("256") || textoGlobal.includes("512") ? "alto" : "normal",
      pantalla: textoGlobal.includes("grande") || textoGlobal.includes("oled") ? "grande" : "normal",
      "5g": textoGlobal.includes("5g") ? "sí" : "no",
      sistema_operativo: textoGlobal.includes("ios") || textoGlobal.includes("iphone") ? "ios" : "android"
    };
    const res = await API.obtenerRecomendaciones(payloadCalibrado);
    appRoot.innerHTML = `<div class="w-full max-w-5xl space-y-8 px-4 py-6 animate-fade-in"><div class="grid grid-cols-1 md:grid-cols-3 gap-6">${res.recomendaciones.map(cel => DeviceCard(cel)).join('')}</div></div>`;
  } catch { navegarA('error'); }
}

async function inicializar() { try { await API.verificarEstado(); protegerRutas(); } catch { navegarA('error'); } }
inicializar();