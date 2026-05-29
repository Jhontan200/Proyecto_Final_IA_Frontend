import './style.css';
import { Navbar } from './components/Navbar.js';
import { AuthForm } from './components/AuthForm.js';
import { ErrorView } from './components/ErrorView.js';
import { QuestionCard } from './components/QuestionCard.js';
import { DeviceCard } from './components/DeviceCard.js';
import { API } from './services/api.js';

const navbarRoot = document.getElementById('navbar-root');
const appRoot = document.getElementById('app-root');
let modoRegistro = false, preguntas = [], indiceActual = 0, respuestasAcumuladas = {};

function sincronizarNavbar() {
  navbarRoot.innerHTML = Navbar(JSON.parse(localStorage.getItem('usuario_ia')), () => navegarA('auth'));
}

function navegarA(ruta) {
  sincronizarNavbar();
  if (ruta === 'loading') {
    appRoot.innerHTML = `<div class="text-center space-y-4"><div class="animate-spin rounded-full h-7 w-7 border-b-2 border-zinc-500 mx-auto"></div><p class="text-zinc-500 text-xs font-mono">Sincronizando...</p></div>`;
  } else if (ruta === 'error') {
    appRoot.innerHTML = ErrorView();
  } else if (ruta === 'auth') {
    appRoot.innerHTML = AuthForm(modoRegistro, manejarAuth, (m) => { modoRegistro = m; navegarA('auth'); });
  } else if (ruta === 'quiz') {
    ejecutarFlujoQuiz();
  }
}

async function manejarAuth(datos) {
  const errDiv = document.getElementById('auth-error-container');
  errDiv.classList.add('hidden');
  try {
    if (modoRegistro) {
      const res = await API.registro(datos.nombre, datos.correo, datos.contrasena);
      alert(res.message); modoRegistro = false; navegarA('auth');
    } else {
      const res = await API.login(datos.correo, datos.contrasena);
      localStorage.setItem('usuario_ia', JSON.stringify(res.usuario));
      protegerRutas();
    }
  } catch (err) { errDiv.textContent = err.message; errDiv.classList.remove('hidden'); }
}

async function ejecutarFlujoQuiz() {
  try {
    if (preguntas.length === 0) {
      const res = await API.obtenerFormulario();
      preguntas = res.preguntas || [];
    }

    if (!preguntas || preguntas.length === 0) {
      appRoot.innerHTML = `<div class="max-w-md w-full text-center bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl shadow-2xl animate-fade-in"><h2 class="text-base font-medium text-zinc-200 mb-1">Cuestionario en Espera</h2><p class="text-zinc-500 text-xs mb-4">Sincronizando el esquema...</p></div>`;
      return;
    }

    if (indiceActual < preguntas.length) {
      appRoot.innerHTML = QuestionCard(preguntas[indiceActual], indiceActual, preguntas.length, (idPregunta, valorSeleccionado) => {
        respuestasAcumuladas[idPregunta] = valorSeleccionado;
        indiceActual++;
        ejecutarFlujoQuiz();
      });
    } else {
      mostrarResultadosIA();
    }
  } catch (error) { navegarA('error'); }
}

function protegerRutas() { navegarA(localStorage.getItem('usuario_ia') ? 'quiz' : 'auth'); }

async function mostrarResultadosIA() {
  appRoot.innerHTML = `<div class="text-center space-y-4"><div class="animate-spin rounded-full h-7 w-7 border-b-2 border-zinc-500 mx-auto"></div><p class="text-zinc-400 text-xs font-mono">El Módulo Multiagente está analizando las reglas lógicas...</p></div>`;
  try {
    // CORRECCIÓN LÓGICA: Extracción semántica por palabras clave únicas para evitar solapamientos
    const respuestaBolsillo = respuestasAcumuladas["1"] || "";
    let presupuestoCalibrado = 4500; // Por defecto para "Más de Bs 3000"
    if (respuestaBolsillo.includes("Menos de")) presupuestoCalibrado = 1200;
    else if (respuestaBolsillo.includes("Entre")) presupuestoCalibrado = 2500;

    const payloadCalibrado = {
      presupuesto: presupuestoCalibrado,
      uso: respuestasAcumuladas["2"]?.toLowerCase().includes("gaming") ? "gaming" : respuestasAcumuladas["2"]?.toLowerCase().includes("estudio") ? "estudio" : "trabajo",
      fotografia: respuestasAcumuladas["3"]?.toLowerCase().includes("alta") || respuestasAcumuladas["3"]?.toLowerCase().includes("excelente") ? "muy importante" : "normal",
      bateria: respuestasAcumuladas["3"]?.toLowerCase().includes("autonomía") || respuestasAcumuladas["3"]?.toLowerCase().includes("sí") ? "sí" : "no",
      multitarea: "no", almacenamiento: "normal", pantalla: "normal", "5g": "no"
    };

    const res = await API.obtenerRecomendaciones(payloadCalibrado);
    appRoot.innerHTML = `
        <div class="w-full max-w-5xl space-y-8 px-4 py-6 animate-fade-in">
            <div class="text-center max-w-xl mx-auto">
                <h2 class="text-2xl font-semibold tracking-tight text-zinc-100">Dispositivos Recomendados</h2>
                <p class="text-zinc-400 text-xs mt-1">El Agente Broker Comercial optimizó las mejores opciones del mercado relacional.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${res.recomendaciones.map(cel => DeviceCard(cel)).join('')}
            </div>
        </div>
    `;
  } catch { navegarA('error'); }
}

async function inicializar() { try { await API.verificarEstado(); protegerRutas(); } catch { navegarA('error'); } }
inicializar();