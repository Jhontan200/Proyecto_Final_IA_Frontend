export function DeviceCard(celular) {
  return `
        <div class="bg-secondary/10 backdrop-blur-xl border border-secondary/30 rounded-2xl p-6 shadow-lg flex flex-col justify-between hover:border-accent/40 hover:shadow-[0_0_30px_-5px_rgba(86,56,131,0.4)] transition duration-300 animate-fade-in text-left text-slate-100 font-sans">
            <div>
                <div class="flex justify-between items-start mb-3">
                    <span class="text-[10px] font-title uppercase tracking-widest bg-primary/80 text-accent/90 px-2.5 py-1 rounded-md border border-secondary/40 font-bold">${celular.marca}</span>
                    <span class="text-accent font-title text-base font-bold tracking-tight">${celular.precio.toLocaleString()} Bs</span>
                </div>
                
                <h3 class="text-xl font-bold text-slate-100 mb-4 tracking-tight font-title">${celular.modelo}</h3>
                
                <div class="bg-primary/50 border border-secondary/40 rounded-xl p-3 mb-4 text-xs text-slate-300">
                    <span class="text-[10px] font-title font-bold uppercase tracking-wider text-slate-400 block mb-1.5">📊 Ficha Técnica:</span>
                    <p class="leading-relaxed font-light">${celular.detalles_tecnicos}</p>
                </div>

                <div class="bg-secondary/10 border border-secondary/40 rounded-xl p-3 text-xs text-slate-300">
                    <span class="text-[10px] font-title font-bold uppercase tracking-wider text-accent/90 block mb-1">✨ Justificación del Sistema Experto:</span>
                    <p class="italic leading-relaxed text-slate-200">"${celular.explicacion}"</p>
                </div>
            </div>
            
            <a href="${celular.tienda_url || '#'}" target="_blank" 
               class="w-full text-center mt-6 py-2.5 bg-gradient-to-r from-accent/90 via-accent/80 to-secondary/80 hover:from-accent hover:to-secondary text-primary font-bold font-title rounded-xl text-xs tracking-wider transition duration-300 block shadow-md hover:shadow-accent/10 cursor-pointer select-none uppercase">
                Ver en Tienda (${celular.tienda})
            </a>
        </div>
    `;
}