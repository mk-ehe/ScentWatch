import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import axios from 'axios';
import FragranticaCard from './FragranticaCard';
import PerfumehubCard from './PerfumehubCard';
import FragranticaSearchBar from './FragranticaSearchBar'; // <-- DODANY IMPORT

function SearchPage() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchUrl) => {
    const targetUrl = typeof searchUrl === 'string' ? searchUrl : url;

    if (!targetUrl.trim()) return;
    
    setIsLoading(true);
    setData(null);

    const trimmedUrl = targetUrl.trim();
    let apiUrl = "";
    
    if (trimmedUrl.includes("perfumehub.")) {
        apiUrl = `https://perfumehub-api.onrender.com/search?url=${encodeURIComponent(trimmedUrl)}`;
    } else if (trimmedUrl.includes("fragrantica.")) {
        apiUrl = `https://fragrantica-api.vercel.app/search?url=${encodeURIComponent(trimmedUrl)}`;  
    }

    if (apiUrl) {
        try {
            const response = await axios.get(apiUrl);
            setData(response.data);
        } catch (e) {
            console.error(e);
            alert("Błąd połączenia z serwerem!");
        } finally {
            setIsLoading(false);
        }
    } else {
        alert("Błędny link!");
        setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-8 px-4 transition-all">
      
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tighter">
          Znajdź swoje <span className="text-transparent bg-clip-text animate-bg-flow">perfumy!</span>
        </h1>
        <p className="text-gray-500 text-sm md:text-base w-full mx-auto">
          Znajdź swoje perfumy wpisując ich nazwę poniżej lub wklej link <a href='https://perfumehub.pl' className="font-bold animate-text-flow underline" target="_blank" rel="noopener noreferrer">Perfumehub!</a>
        </p>
      </div>

      <div className="w-full max-w-2xl relative z-50 mb-6">
        <FragranticaSearchBar onSelectPerfume={handleSearch} />
      </div>

      <div className="w-full max-w-2xl relative flex items-center mb-10">
        <Search className="absolute left-6 text-gray-400" size={18} />
        <input 
          type="text" 
          value={url} 
          disabled={isLoading}
          onChange={(e) => setUrl(e.target.value)} 
          onKeyDown={handleKeyDown} 
          placeholder="Wklej link..."
          className="w-full py-4 pl-14 pr-12 rounded-full border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all font-medium text-gray-700 bg-white"
        />
        
        <button 
          onClick={handleSearch}
          disabled={isLoading}
          className="disabled:opacity-70 cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-transform"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Search size={18} />
          )}
          <span className="hidden sm:inline">{isLoading ? 'Szukam' : 'Szukaj'}</span>
        </button>
      </div>
      
      <div className="w-full max-w-4xl min-h-25 flex flex-col items-center">
        {isLoading && (
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-58 bg-gray-200 rounded-t-xl"></div>
                <div className="h-52 w-full max-w-2xl bg-gray-100 rounded-b-xl"></div>
            </div>
        )}

        {data && !isLoading && (
          data.price ? (<PerfumehubCard data={data} />) : (<FragranticaCard data={data} />)
        )}
      </div>
    </div>

  );
}

export default SearchPage;