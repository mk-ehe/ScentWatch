import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import axios from 'axios';

function SearchPage() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    setData(null);

    const trimmedUrl = url.trim();
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
            alert("Błąd połączenia z serwerem");
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
    <div className="flex flex-col items-center justify-start min-h-screen pt-32 px-4 transition-all">
      
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tighter">
          Znajdź swoje <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">perfumy</span>
        </h1>
        <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
          Wklej link z Perfumehub lub Fragrantica, aby przeanalizować nuty i ceny.
        </p>
      </div>

      <div className="w-full max-w-2xl relative flex items-center mb-10">
        <input 
          type="text" 
          value={url} 
          disabled={isLoading}
          onChange={(e) => setUrl(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} 
          placeholder="Wklej link..."
          className="w-full py-4 pl-6 pr-37 rounded-full border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-gray-700 shadow-sm"
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

      <div className="w-full max-w-2xl min-h-25 flex flex-col items-center">
        {isLoading && (
            <div className="animate-pulse flex flex-col items-center gap-2">
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
                <div className="h-32 w-full max-w-2xl bg-gray-100 rounded-xl"></div>
            </div>
        )}

        {data && !isLoading && (
            <div className="w-full p-6 bg-white rounded-2xl shadow-xl border border-gray-100 animate-in fade-in zoom-in duration-300">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Wynik</p>
                <pre className="text-sm text-gray-700 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        )}
      </div>
    </div>
  );
}


export default SearchPage;