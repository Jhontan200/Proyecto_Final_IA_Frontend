export function QuizModeSelector(alSeleccionarModo) {
  window.manejarSeleccionModo = (modo) => alSeleccionarModo(modo);

  return `
        <div class="w-full max-w-2xl text-center space-y-8 animate-fade-in px-4">
            <div class="space-y-2">
                <h2 class="text-2xl font-semibold tracking-tight text-zinc-100">¿Qué tipo de asesoramiento buscas?</h2>
                <p class="text-zinc-400 text-xs max-w-md mx-auto">Optimiza tu experiencia con los agentes multiagente según tu tiempo disponible.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button onclick="manejarSeleccionModo('simple')" class="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 hover:border-zinc-700 p-6 rounded-2xl flex flex-col items-center space-y-3 transition duration-200 cursor-pointer text-center group shadow-xl">
                    <div class="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-400 group-hover:text-zinc-200 font-mono text-sm">⚡</div>
                    <h3 class="text-base font-medium text-zinc-200">Test Express</h3>
                    <p class="text-zinc-500 text-[11px] leading-relaxed">Solo 5 preguntas críticas. Ideal para respuestas inmediatas basadas en presupuesto y uso esencial.</p>
                </button>

                <button onclick="manejarSeleccionModo('detallado')" class="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 hover:border-emerald-900/40 p-6 rounded-2xl flex flex-col items-center space-y-3 transition duration-200 cursor-pointer text-center group shadow-xl">
                    <div class="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-emerald-500 font-mono text-sm">🧠</div>
                    <h3 class="text-base font-medium text-zinc-200">Análisis Avanzado</h3>
                    <p class="text-zinc-500 text-[11px] leading-relaxed">Cuestionario completo de 45 variables relacionales. Calibración milimétrica para entusiastas del hardware.</p>
                </button>
            </div>
        </div>
    `;
}