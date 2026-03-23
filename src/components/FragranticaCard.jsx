const FragranticaCard = ({ data }) => {
  if (!data) return null;

  const { fragrance, gender, rating, amount_of_rates, accords, notes, url } = data;

  return (
    <div className="w-full mb-10 max-w-4xl bg-white rounded-[2.5rem] shadow-2xl shadow-purple-500/5 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 hover:border-purple-400">
      
      <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center md:items-start">
        
        <div className="relative shrink-0">
          <div className="w-44 h-56 bg-linear-to-b from-gray-50 to-white rounded-3xl flex items-center justify-center p-4 border border-gray-50 shadow-inner">
            <img 
              src={fragrance?.image} 
              alt={fragrance?.name} 
              className="max-w-full max-h-full object-contain drop-shadow-2xl hover:rotate-6 transition-transform duration-500 rounded-2xl"
            />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm font-black text-gray-800">{rating}</span>
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-[10px] text-gray-400 font-bold border-l pl-2 uppercase">{amount_of_rates}</span>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <p className="text-[13px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2">
            {gender}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tighter">
            {fragrance?.name}
          </h2>

            <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {accords?.map((accord, idx) => (
                <div 
                key={idx}
                className="px-3 py-2 flex items-center rounded-xl transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
                style={{ 
                    backgroundColor: accord.color,
                    boxShadow: `0 4px 12px ${accord.color}33` 
                }}
                >
                <span className="text-[11px] font-black uppercase tracking-wider text-black">
                    {accord.name}
                </span>
                </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 md:px-12 py-8 bg-linear-to-b from-gray-50/50 to-white border-t border-gray-100 text-center">
        <h3 className="text-3xl font-black mb-4 italic">Piramida zapachowa</h3>
        
        {notes?.linear && notes.linear.length > 0 ? (
          <NoteSection title="Nuty Zapachowe" notes={notes.linear} />
        ) : (
          <>
            <NoteSection title="Nuty Głowy" notes={notes?.top} />
            <NoteSection title="Nuty Serca" notes={notes?.heart} />
            <NoteSection title="Nuty Bazy" notes={notes?.base} />
          </>
        )}
      </div>

      <footer className="px-8 py-6 bg-white border-t border-gray-100 flex justify-between items-center">
        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">ScentWatch Engine</span>
        <a 
          href={url} 
          target="_blank" 
          rel="noreferrer"
          className="text-xs font-black text-purple-600 hover:text-blue-600 transition-colors uppercase tracking-tighter"
        >
          Otwórz źródło →
        </a>
      </footer>
    </div>
  );
};

export default FragranticaCard;