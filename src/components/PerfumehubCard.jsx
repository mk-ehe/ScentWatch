import { Bell } from 'lucide-react';

const PerfumehubCard = ({ data }) => {
  if (!data) return null;

  const { fragrance, concentration, picture, price, low_30d, shop, url } = data;

  return (
    <div className="w-full max-w-4xl mb-10 bg-white rounded-[2.5rem] shadow-2xl shadow-blue-500/5 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 hover:border-blue-400 transition-colors">
      
      <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-center">
        
        <div className="relative shrink-0">
          <div className="w-48 h-64 bg-linear-to-b from-gray-50 to-white rounded-3xl flex items-center justify-center p-6 border border-gray-50 shadow-inner">
            <img 
              src={picture} 
              alt={fragrance} 
              className="max-w-full max-h-full object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-600 rounded-xl"
            />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left w-full">
          <p className="text-[12px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2">
            {concentration}
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 leading-[1.2] tracking-tighter">
            {fragrance}
          </h2>

          <div className="bg-gray-50/80 p-6 md:p-8 rounded-3xl border border-gray-100 w-full flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="text-center md:text-left">
              <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                Najlepsza cena
              </span>
              <div className="text-3xl md:text-[40px] font-black text-green-500 tracking-tight whitespace-nowrap">
                {price}
              </div>
              {low_30d && (
                <div className="text-[11px] text-gray-500 font-medium mt-1">
                  Najniższa z 30 dni: <span>{low_30d}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 w-full md:w-48 shrink-0">
              <a 
                href={shop?.shop_url} 
                target="_blank" 
                rel="noreferrer" 
                className="w-full px-4 py-3 bg-blue-500 hover:bg-purple-500 text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center flex items-center justify-center"
              >
                Idź do sklepu
              </a>

              <a 
                href="/alerty" 
                className="w-full px-4 py-3 bg-purple-500 hover:bg-blue-500 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-sm hover:shadow-md text-center flex items-center hover:-translate-y-0.5 justify-center gap-2 text-white"
              >
                <Bell size={14} strokeWidth={2.5} />
                Ustaw Alert
              </a>
            </div>

          </div>
        </div>
      </div>

      <footer className="px-8 py-6 bg-white border-t border-gray-100 flex justify-between items-center">
        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">ScentWatch Engine</span>
        <a 
          href={url} 
          target="_blank" 
          rel="noreferrer"
          className="text-xs font-black text-blue-600 hover:text-purple-600 transition-colors uppercase tracking-tighter"
        >
          Otwórz na Perfumehub →
        </a>
      </footer>
    </div>
  );
};

export default PerfumehubCard;