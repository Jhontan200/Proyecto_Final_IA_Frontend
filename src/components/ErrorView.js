export function ErrorView() {
  return `
        <div class="max-w-md w-full text-center bg-zinc-900/60 backdrop-blur-xl border border-red-950 p-8 rounded-2xl shadow-2xl animate-fade-in">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 text-red-400 mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
            </div>
            <h2 class="text-xl font-semibold text-zinc-200 mb-2">Puente de Datos Inactivo</h2>
            <p class="text-zinc-400 text-sm mb-6">El Frontend no pudo comunicarse con la API de FastAPI. Levanta el servidor ejecutando estos comandos en la carpeta del backend:</p>
            
            <div class="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl text-xs text-left font-mono space-y-2 text-zinc-400 select-all shadow-inner">
                <p class="text-zinc-600 font-sans text-[10px] uppercase tracking-wider mb-1 font-bold select-none">Ejecutar en tu terminal (Backend):</p>
                <p class="text-emerald-400"><span class="text-zinc-600 select-none">$</span> source venv/Scripts/activate</p>
                <p class="text-emerald-400"><span class="text-zinc-600 select-none">$</span> uvicorn main:app --reload</p>
            </div>
        </div>
    `;
}