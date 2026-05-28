export function AuthForm(esRegistro = false, alEnviar, alCambiarModo) {
  // Exponer callbacks globalmente para los clicks nativos del HTML string
  window.manejarEnvioAuth = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    alEnviar(Object.fromEntries(formData));
  };
  window.cambiarModoAuth = () => alCambiarModo(!esRegistro);

  return `
        <div class="w-full max-w-md bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 p-8 rounded-2xl shadow-2xl animate-fade-in">
            <div class="text-center mb-6">
                <h2 class="text-2xl font-semibold tracking-tight text-zinc-100">
                    ${esRegistro ? 'Crea tu cuenta' : 'Te damos la bienvenida'}
                </h2>
                <p class="text-zinc-500 text-xs mt-1">Ingresa tus credenciales para continuar</p>
            </div>

            <form onsubmit="manejarEnvioAuth(event)" class="space-y-4">
                ${esRegistro ? `
                    <div>
                        <label class="block text-xs font-medium text-zinc-400 mb-1.5">Nombre Completo</label>
                        <input type="text" name="nombre" required placeholder="John Doe"
                            class="w-full bg-zinc-950/50 border border-zinc-800 focus:border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-200 outline-none transition">
                    </div>
                ` : ''}
                
                <div>
                    <label class="block text-xs font-medium text-zinc-400 mb-1.5">Correo Electrónico</label>
                    <input type="email" name="correo" required placeholder="tu@correo.com"
                        class="w-full bg-zinc-950/50 border border-zinc-800 focus:border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-200 outline-none transition">
                </div>

                <div>
                    <label class="block text-xs font-medium text-zinc-400 mb-1.5">Contraseña</label>
                    <input type="password" name="contrasena" required placeholder="••••••••"
                        class="w-full bg-zinc-950/50 border border-zinc-800 focus:border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-200 outline-none transition">
                </div>

                <div id="auth-error-container" class="text-xs text-red-400 font-medium hidden text-center pt-1"></div>

                <button type="submit" 
                    class="w-full py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-xl text-sm transition duration-200 mt-2 shadow-lg cursor-pointer">
                    ${esRegistro ? 'Registrarse' : 'Iniciar Sesión'}
                </button>
            </form>

            <div class="text-center mt-6 pt-4 border-t border-zinc-800/60">
                <button onclick="cambiarModoAuth()" class="text-xs text-zinc-400 hover:text-zinc-200 transition underline underline-offset-4 cursor-pointer">
                    ${esRegistro ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                </button>
            </div>
        </div>
    `;
}