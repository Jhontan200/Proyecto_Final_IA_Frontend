export function QuestionCard(preguntaObj, indiceActual, totalPreguntas, alSeleccionarOpcion) {
  window.idPreguntaActiva = preguntaObj.id_pregunta;
  window.idManejarOpcion = (valor) => {
    alSeleccionarOpcion(window.idPreguntaActiva, valor);
  };

  const progreso = (indiceActual / totalPreguntas) * 100;

  return `
        <div class="w-full max-w-xl bg-secondary/10 backdrop-blur-xl border border-secondary/30 p-8 rounded-2xl shadow-[0_0_50px_-10px_rgba(86,56,131,0.4)] animate-fade-in flex flex-col text-slate-100 font-sans">
            <div class="w-full bg-primary/80 h-2 rounded-full mb-6 overflow-hidden border border-secondary/40">
                <div class="bg-gradient-to-r from-secondary via-accent/80 to-accent h-full transition-all duration-300" style="width: ${progreso}%"></div>
            </div>

            <div class="mb-6">
                <span class="text-[10px] font-title font-bold uppercase tracking-widest text-slate-400">Pregunta ${indiceActual + 1} de ${totalPreguntas}</span>
                <h2 class="text-2xl font-bold tracking-tight text-slate-100 mt-1 font-title leading-tight">${preguntaObj.pregunta}</h2>
            </div>

            <div class="flex flex-col space-y-3">
                ${preguntaObj.opciones.map(opc => `
                    <button onclick="idManejarOpcion('${opc}')"
                        class="w-full text-left px-5 py-4 bg-primary/40 hover:bg-secondary/20 border border-secondary/50 hover:border-accent/60 rounded-xl text-sm text-slate-300 hover:text-slate-100 transition duration-200 shadow-md cursor-pointer group flex justify-between items-center font-medium">
                        <span>${opc}</span>
                        <span class="text-secondary group-hover:text-accent font-title transition duration-200 text-sm font-bold">→</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}