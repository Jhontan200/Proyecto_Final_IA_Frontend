export function QuestionCard(preguntaObj, indiceActual, totalPreguntas, alSeleccionarOpcion) {
  window.idPreguntaActiva = preguntaObj.id_pregunta;
  window.idManejarOpcion = (valor) => {
    alSeleccionarOpcion(window.idPreguntaActiva, valor);
  };

  const progreso = (indiceActual / totalPreguntas) * 100;

  return `
        <div class="w-full max-w-xl bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 p-8 rounded-2xl shadow-2xl animate-fade-in flex flex-col">
            <div class="w-full bg-zinc-950 h-1.5 rounded-full mb-6 overflow-hidden border border-zinc-800/50">
                <div class="bg-gradient-to-r from-zinc-500 to-zinc-200 h-full transition-all duration-300" style="width: ${progreso}%"></div>
            </div>

            <div class="mb-6">
                <span class="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Pregunta ${indiceActual + 1} de ${totalPreguntas}</span>
                <h2 class="text-xl font-medium tracking-tight text-zinc-100 mt-1">${preguntaObj.pregunta}</h2>
            </div>

            <div class="flex flex-col space-y-3">
                ${preguntaObj.opciones.map(opc => `
                    <button onclick="idManejarOpcion('${opc}')"
                        class="w-full text-left px-5 py-4 bg-zinc-950/40 hover:bg-zinc-800/40 border border-zinc-800/60 hover:border-zinc-700 rounded-xl text-sm text-zinc-300 hover:text-zinc-100 transition duration-200 shadow-md cursor-pointer group flex justify-between items-center">
                        <span>${opc}</span>
                        <span class="text-zinc-600 group-hover:text-zinc-400 transition font-mono text-xs">→</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}