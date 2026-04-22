import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search, Loader2 } from 'lucide-react';

export default function FragranticaSearchBar({ onSelectPerfume }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    if (query.length < 2 || query.includes(" - ")) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await axios.get(`https://perfumehub-api.onrender.com/autocomplete?q=${query}`);
        setResults(res.data.results);
      } catch (e) {
        console.error("Błąd wyszukiwania", e);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (item) => {
    setQuery(`${item.Brand} - ${item.Perfume}`);
    setIsOpen(false);
    onSelectPerfume(item.url);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative flex items-center shadow-sm rounded-full">
        <Search className="absolute left-6 text-gray-400" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Wyszukaj zapach..."
          className="w-full py-4 pl-14 pr-12 rounded-full border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all font-medium text-gray-700 bg-white"
        />
        {isLoading && <Loader2 className="absolute right-6 animate-spin text-purple-600" size={18} />}
      </div>

      {isOpen && query.length >= 2 && !query.includes(" - ") && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            <ul className="divide-y divide-gray-50">
              {results.map((item, idx) => (
                <li 
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="px-6 py-4 hover:bg-purple-50 cursor-pointer transition-colors flex flex-col"
                >
                  <span className="font-bold text-gray-900">{item.Perfume}</span>
                  <span className="text-sm text-gray-500 font-medium">{item.Brand}</span>
                </li>
              ))}
            </ul>
          ) : !isLoading ? (
            <div className="px-6 py-8 text-center text-gray-500 font-medium text-sm">
              Nie znaleziono zapachu: "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}