export function Navbar(usuario, alCerrarSesion) {
    // Exponer las acciones de sesión y toggle al objeto global window
    window.ejecutarCerrarSesion = () => {
        localStorage.removeItem('usuario_ia');
        alCerrarSesion();
    };

    window.toggleMenuMovil = () => {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
    };

    return `
        <nav class="w-full bg-primary/60 backdrop-blur-md border-b border-secondary/30 sticky top-0 z-50 px-6 py-4 font-sans text-slate-100">
            <div class="container mx-auto flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <span class="text-xl font-bold tracking-tight bg-gradient-to-r from-accent via-slate-100 to-slate-200 bg-clip-text text-transparent font-title">
                        Celulares<span class="text-secondary font-medium">.IA</span>
                    </span>
                </div>

                <button onclick="toggleMenuMovil()" class="md:hidden text-slate-400 hover:text-accent focus:outline-none text-2xl p-1 cursor-pointer transition-colors duration-200">
                    ≡
                </button>

                <div class="hidden md:flex items-center space-x-6">
                    ${usuario ? `
                        <div class="flex items-center space-x-4 animate-fade-in">
                            <span class="text-xs text-slate-400">Sesión de: <span class="text-slate-200 font-bold font-title">${usuario.nombre}</span></span>
                            <button onclick="ejecutarCerrarSesion()" 
                                class="text-xs bg-secondary/30 hover:bg-secondary/60 text-slate-200 border border-secondary/50 px-3 py-1.5 rounded-xl transition duration-200 font-title font-bold uppercase tracking-wider cursor-pointer">
                                Cerrar Sesión
                            </button>
                        </div>
                    ` : `
                        <span class="text-xs text-slate-400 font-title uppercase font-bold tracking-widest bg-primary/90 border border-secondary/40 px-3 py-1 rounded-full flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-accent animate-pulse shadow-sm shadow-accent"></span>
                            SBC + SMA Router
                        </span>
                    `}
                </div>
            </div>

            <div id="mobile-menu" class="hidden md:hidden mt-4 pt-4 border-t border-secondary/20 animate-fade-in">
                <div class="flex flex-col space-y-3 px-2">
                    ${usuario ? `
                        <div class="text-xs text-slate-400">Usuario: <span class="text-slate-200 font-bold font-title">${usuario.nombre}</span></div>
                        <button onclick="ejecutarCerrarSesion()" 
                            class="w-full text-center py-2.5 bg-secondary/30 hover:bg-secondary/50 text-slate-200 border border-secondary/40 rounded-xl text-xs font-title font-bold uppercase tracking-wider transition cursor-pointer">
                            Cerrar Sesión
                        </button>
                    ` : `
                        <span class="text-xs text-slate-400 font-title uppercase font-bold tracking-widest bg-primary/90 border border-secondary/40 px-3 py-2.5 rounded-xl flex items-center justify-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-accent animate-pulse shadow-sm shadow-accent"></span>
                            Autenticación Requerida
                        </span>
                    `}
                </div>
            </div>
        </nav>
    `;
}