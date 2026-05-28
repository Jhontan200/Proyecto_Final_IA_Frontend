import './style.css';
import { Navbar } from './components/Navbar.js';
import { AuthForm } from './components/AuthForm.js';
import { ErrorView } from './components/ErrorView.js';
import { API } from './services/api.js';

const navbarRoot = document.getElementById('navbar-root');
const appRoot = document.getElementById('app-root');

let rutaActual = 'loading';
let modoRegistro = false;

// Sincroniza y re-renderiza el Navbar con los datos frescos de la sesión
function sincronizarNavbar() {
  const usuarioActivo = JSON.parse(localStorage.getItem('usuario_ia'));
  navbarRoot.innerHTML = Navbar(usuarioActivo, () => {
    navegarA('auth'); // Callback al cerrar sesión: redirige al login
  });
}

function navegarA(nuevaRuta) {
  rutaActual = nuevaRuta;
  sincronizarNavbar(); // Actualización inmediata de la barra de navegación

  switch (rutaActual) {
    case 'loading':
      appRoot.innerHTML = `
                <div class="text-center space-y-4">
                    <div class="animate-spin rounded-full h-7 w-7 border-b-2 border-zinc-500 mx-auto"></div>
                    <p class="text-zinc-500 text-xs font-mono">Sincronizando SBC Router...</p>
                </div>
            `;
      break;

    case 'error':
      appRoot.innerHTML = ErrorView();
      break;

    case 'auth':
      appRoot.innerHTML = AuthForm(modoRegistro, manejarPeticionAuth, (cambiarAModo) => {
        modoRegistro = cambiarAModo;
        navegarA('auth');
      });
      break;

    case 'quiz':
      const user = JSON.parse(localStorage.getItem('usuario_ia'));
      appRoot.innerHTML = `
                <div class="max-w-xl w-full text-center bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl shadow-2xl animate-fade-in">
                    <p class="text-sm text-zinc-300">¡Ingreso Exitoso! Bienvenido, <span class="text-emerald-400 font-semibold">${user.nombre}</span></p>
                    <p class="text-xs text-zinc-500 mt-2">El enrutador está listo para montar el motor de preguntas de IA.</p>
                </div>
            `;
      break;
  }
}

async function manejarPeticionAuth(datos) {
  const errorContainer = document.getElementById('auth-error-container');
  errorContainer.classList.add('hidden');

  try {
    if (modoRegistro) {
      const res = await API.registro(datos.nombre, datos.correo, datos.contrasena);
      alert(res.message);
      modoRegistro = false;
      navegarA('auth');
    } else {
      const res = await API.login(datos.correo, datos.contrasena);
      localStorage.setItem('usuario_ia', JSON.stringify(res.usuario));
      protegerRutas();
    }
  } catch (err) {
    errorContainer.textContent = err.message;
    errorContainer.classList.remove('hidden');
  }
}

function protegerRutas() {
  const usuarioLogueado = localStorage.getItem('usuario_ia');
  navegarA(usuarioLogueado ? 'quiz' : 'auth');
}

async function inicializarSistema() {
  navegarA('loading');
  try {
    await API.verificarEstado();
    protegerRutas();
  } catch (error) {
    navegarA('error');
  }
}

inicializarSistema();