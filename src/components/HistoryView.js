// src/components/HistoryView.js
export function HistoryView(historial, alVolver) {
    window.volverAlQuiz = () => alVolver();

    const filas = historial.map(item => {
        const disp = item.dispositivos || {};
        const marca = disp.marcas?.nombre || "Genérica";
        const fechaFmt = new Date(item.fecha).toLocaleDateString('es-BO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

        return `
            <div class="bg-zinc-900/30 border border-zinc-800/60 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-mono text-xs">
                <div class="space-y-1 text-left">
                    <div class="flex items-center gap-2">
                        <span class="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border border-zinc-700/40">${marca}</span>
                        <span class="text-zinc-100 font-medium font-sans text-sm">${disp.modelo || "Modelo Desconocido"}</span>
                    </div>
                    <p class="text-zinc-500 text-[11px]">Plataforma: ${disp.sistema_operativo || "S/D"} | Precisión: ${item.puntuacion}%</p>
                </div>
                <div class="text-zinc-400 text-[11px] font-mono md:text-right w-full md:w-auto border-t md:border-t-0 border-zinc-800/50 pt-2 md:pt-0">
                    📅 ${fechaFmt}
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="w-full max-w-3xl mx-auto space-y-6 px-4 py-6 animate-fade-in">
            <div class="flex justify-between items-center border-b border-zinc-800 pb-4">
                <div class="text-left">
                    <h2 class="text-xl font-semibold tracking-tight text-zinc-100">Historial de Consultas</h2>
                    <p class="text-zinc-400 text-xs mt-0.5">Auditoría cronológica de las recomendaciones del Sistema Experto.</p>
                </div>
                <button onclick="volverAlQuiz()" class="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 rounded-xl text-xs font-medium transition cursor-pointer">
                    Volver al Test
                </button>
            </div>
            <div class="space-y-3">
                ${historial.length ? filas : '<p class="text-center text-zinc-500 text-xs py-8 font-mono">No tienes consultas registradas en tu historial todavía.</p>'}
            </div>
        </div>
    `;
}