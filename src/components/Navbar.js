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
        <nav class="w-full bg-zinc-900/50 backdrop-blur-md border-b border-zinc-800/80 sticky top-0 z-50 px-6 py-4">
            <div class="container mx-auto flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <span class="text-lg font-semibold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                        Celulares<span class="text-zinc-500 font-normal">.IA</span>
                    </span>
                </div>

                <button onclick="toggleMenuMovil()" class="md:hidden text-zinc-400 hover:text-zinc-100 focus:outline-none text-xl p-1 cursor-pointer">
                    ≡
                </button>

                <div class="hidden md:flex items-center space-x-6">
                    ${usuario ? `
                        <div class="flex items-center space-x-4 animate-fade-in">
                            <span class="text-xs text-zinc-400">Sesión de: <span class="text-zinc-200 font-medium">${usuario.nombre}</span></span>
                            <button onclick="ejecutarCerrarSesion()" 
                                class="text-xs bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded-xl transition cursor-pointer">
                                Cerrar Sesión
                            </button>
                        </div>
                    ` : `
                        <span class="text-xs text-zinc-500 font-mono bg-zinc-950 border border-zinc-800 px-3 py-1 rounded-full flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            SBC + SMA Router
                        </span>
                    `}
                </div>
            </div>

            <div id="mobile-menu" class="hidden md:hidden mt-4 pt-4 border-t border-zinc-800/60 animate-fade-in">
                <div class="flex flex-col space-y-3 px-2">
                    ${usuario ? `
                        <div class="text-xs text-zinc-400">Usuario: <span class="text-zinc-200 font-medium">${usuario.nombre}</span></div>
                        <button onclick="ejecutarCerrarSesion()" 
                            class="w-full text-center py-2.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-xl text-xs transition cursor-pointer">
                            Cerrar Sesión
                        </button>
                    ` : `
                        <span class="text-xs text-zinc-500 font-mono bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Autenticación Requerida
                        </span>
                    `}
                </div>
            </div>
        </nav>
    `;
}