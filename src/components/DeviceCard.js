export function DeviceCard(celular) {
  return `
        <div class="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-zinc-700/80 transition duration-300 animate-fade-in text-left">
            <div>
                <div class="flex justify-between items-start mb-3">
                    <span class="text-[10px] font-mono uppercase tracking-wider bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md border border-zinc-700/50">${celular.marca}</span>
                    <span class="text-emerald-400 font-mono text-sm font-semibold">${celular.precio.toLocaleString()} Bs</span>
                </div>
                
                <h3 class="text-lg font-medium text-zinc-100 mb-4 tracking-tight">${celular.modelo}</h3>
                
                <div class="bg-zinc-950/40 border border-zinc-800/60 rounded-xl p-3 mb-4 text-[11px] font-mono text-zinc-400">
                    <span class="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1.5">📊 Ficha Técnica:</span>
                    <p class="text-zinc-300 leading-relaxed">${celular.detalles_tecnicos}</p>
                </div>

                <div class="bg-emerald-950/10 border border-emerald-900/30 rounded-xl p-3 text-[11px] text-zinc-400">
                    <span class="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">✨ Justificación del Sistema Experto:</span>
                    <p class="italic leading-relaxed text-zinc-300/90">"${celular.explicacion}"</p>
                </div>
            </div>
            
            <a href="${celular.tienda_url || '#'}" target="_blank" 
               class="w-full text-center mt-6 py-2.5 bg-zinc-150 hover:bg-zinc-200 text-zinc-950 font-medium rounded-xl text-xs transition block shadow-md cursor-pointer select-none">
                Ver en Tienda (${celular.tienda})
            </a>
        </div>
    `;
}