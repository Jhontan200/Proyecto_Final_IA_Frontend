export function ErrorView() {
  return `
        <div class="max-w-md w-full text-center bg-secondary/10 backdrop-blur-xl border border-secondary/30 p-8 rounded-2xl shadow-[0_0_50px_-10px_rgba(86,56,131,0.4)] animate-fade-in text-slate-100 font-sans">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4 shadow-sm shadow-accent/20">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
            </div>
            <h2 class="text-2xl font-bold text-slate-100 mb-2 font-title tracking-tight">Puente de Datos Inactivo</h2>
            <p class="text-slate-400 text-sm mb-6 leading-relaxed">El Frontend no pudo comunicarse con la API de FastAPI. Levanta el servidor ejecutando estos comandos en la carpeta del backend:</p>
            
            <div class="bg-primary/70 border border-secondary/40 p-4 rounded-xl text-xs text-left font-mono space-y-2 text-slate-300 select-all shadow-inner">
                <p class="text-slate-500 font-title text-[10px] uppercase tracking-widest mb-1 font-bold select-none">Ejecutar en tu terminal (Backend):</p>
                <p class="text-accent/90"><span class="text-secondary select-none">$</span> source venv/Scripts/activate</p>
                <p class="text-accent/90"><span class="text-secondary select-none">$</span> uvicorn main:app --reload</p>
            </div>
        </div>
    `;
}