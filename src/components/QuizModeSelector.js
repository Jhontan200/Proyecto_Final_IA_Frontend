export function QuizModeSelector(alSeleccionarModo) {
  window.manejarSeleccionModo = (modo) => alSeleccionarModo(modo);

  return `
        <div class="w-full max-w-2xl text-center space-y-8 animate-fade-in px-4 font-sans text-slate-100">
            <div class="space-y-2">
                <h2 class="text-3xl font-bold tracking-tight text-slate-100 font-title">¿Qué tipo de asesoramiento buscas?</h2>
                <p class="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">Optimiza tu experiencia con los agentes multiagente según tu tiempo disponible.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button onclick="manejarSeleccionModo('simple')" class="bg-secondary/10 backdrop-blur-xl border border-secondary/30 p-6 rounded-2xl flex flex-col items-center space-y-3 transition duration-300 cursor-pointer text-center group shadow-md hover:border-accent/40 hover:shadow-[0_0_30px_-5px_rgba(86,56,131,0.4)]">
                    <div class="p-3 bg-primary/60 rounded-xl border border-secondary/40 text-accent font-title text-base font-bold shadow-inner group-hover:border-accent/50 transition duration-300">⚡</div>
                    <h3 class="text-xl font-bold text-slate-100 font-title tracking-tight">Test Express</h3>
                    <p class="text-slate-400 text-xs leading-relaxed font-light">Solo 5 preguntas críticas. Ideal para respuestas inmediatas basadas en presupuesto y uso esencial.</p>
                </button>

                <button onclick="manejarSeleccionModo('detallado')" class="bg-secondary/10 backdrop-blur-xl border border-secondary/30 p-6 rounded-2xl flex flex-col items-center space-y-3 transition duration-300 cursor-pointer text-center group shadow-md hover:border-accent/40 hover:shadow-[0_0_30px_-5px_rgba(86,56,131,0.4)]">
                    <div class="p-3 bg-primary/60 rounded-xl border border-secondary/40 text-accent font-title text-base font-bold shadow-inner group-hover:border-accent/50 transition duration-300">🧠</div>
                    <h3 class="text-xl font-bold text-slate-100 font-title tracking-tight">Análisis Avanzado</h3>
                    <p class="text-slate-400 text-xs leading-relaxed font-light">Cuestionario completo de 45 variables relacionales. Calibración milimétrica para entusiastas del hardware.</p>
                </button>
            </div>
        </div>
    `;
}