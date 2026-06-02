export function AuthForm(esRegistro = false, alEnviar, alCambiarModo) {
    // Exponer callbacks globalmente para los clicks nativos del HTML string
    window.manejarEnvioAuth = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        alEnviar(Object.fromEntries(formData));
    };
    window.cambiarModoAuth = () => alCambiarModo(!esRegistro);

    return `
        <div class="w-full max-w-md bg-secondary/10 backdrop-blur-xl border border-secondary/30 p-8 rounded-2xl shadow-[0_0_50px_-10px_rgba(86,56,131,0.5)] animate-fade-in text-slate-100">
            <div class="text-center mb-6">
                <h2 class="text-3xl font-bold tracking-tight text-slate-100 font-title">
                    ${esRegistro ? 'Crea tu cuenta' : 'Te damos la bienvenida'}
                </h2>
                <p class="text-slate-400 text-sm mt-1">Ingresa tus credenciales para continuar</p>
            </div>

            <form onsubmit="manejarEnvioAuth(event)" class="space-y-4">
                ${esRegistro ? `
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Nombre Completo</label>
                        <input type="text" name="nombre" required placeholder="John Doe"
                            class="w-full bg-primary/60 border border-secondary/50 focus:border-accent/70 rounded-xl px-4 py-2.5 text-sm text-slate-100 outline-none transition duration-200 focus:ring-1 focus:ring-accent/70">
                    </div>
                ` : ''}
                
                <div>
                    <label class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Correo Electrónico</label>
                    <input type="email" name="correo" required placeholder="tu@correo.com"
                        class="w-full bg-primary/60 border border-secondary/50 focus:border-accent/70 rounded-xl px-4 py-2.5 text-sm text-slate-100 outline-none transition duration-200 focus:ring-1 focus:ring-accent/70">
                </div>

                <div>
                    <label class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Contraseña</label>
                    <input type="password" name="contrasena" required placeholder="••••••••"
                        class="w-full bg-primary/60 border border-secondary/50 focus:border-accent/70 rounded-xl px-4 py-2.5 text-sm text-slate-100 outline-none transition duration-200 focus:ring-1 focus:ring-accent/70">
                </div>

                <div id="auth-error-container" class="text-xs text-red-400 font-medium hidden text-center pt-1"></div>

                <button type="submit" 
                    class="w-full py-3 bg-gradient-to-r from-accent/90 via-accent/80 to-secondary/80 hover:from-accent hover:to-secondary text-primary font-bold font-title rounded-xl text-sm tracking-wide transition duration-300 mt-4 shadow-lg shadow-accent/10 cursor-pointer uppercase">
                    ${esRegistro ? 'Registrarse' : 'Iniciar Sesión'}
                </button>
            </form>

            <div class="text-center mt-6 pt-4 border-t border-secondary/20">
                <button onclick="cambiarModoAuth()" class="text-xs text-slate-400 hover:text-accent/90 transition duration-200 underline underline-offset-4 cursor-pointer">
                    ${esRegistro ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                </button>
            </div>
        </div>
    `;
}