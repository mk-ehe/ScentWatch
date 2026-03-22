import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Loader2, X, CheckCircle, XCircle } from 'lucide-react';

function UnsubscribePage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const fragranceUrl = searchParams.get('url');
  const token = searchParams.get('token');

  const [status, setStatus] = useState('loading'); 
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!email || !fragranceUrl || !token) {
      setStatus('invalid');
      return;
    }

    const unsubscribe = async () => {
      try {
        const response = await axios.post('https://perfumehub-api.onrender.com/unsubscribe', {
          email: email,
          url: fragranceUrl,
          token: token
        });
        setMessage('Sukces! Subskrypcja została anulowana, dziękujemy za skorzystanie z usług ScentWatch.' || response.data.message);
        setStatus('success');
      } catch (err) {
        setMessage('Błąd podczas anulowania subskrypcji.' || err.response?.data?.detail);
        setStatus('error');
      }
    };

    unsubscribe();
  }, [email, fragranceUrl, token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl max-w-lg w-full border border-gray-100 text-center">
        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin text-purple-600 mb-4" size={40} />
            <h2 className="text-xl font-bold text-gray-900">Ładowanie...</h2>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center">
            <CheckCircle className="text-green-600 mb-4" size={60} />
            <h2 className="text-2xl font-black text-gray-900 mb-2">Subskrypcja anulowana.</h2>
            <p className="text-gray-500 mb-6 text-sm">{message}</p>
            <Link to="/" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-sm">Strona Główna</Link>
          </div>
        )}

        {status === 'invalid' && (
            <div className="flex flex-col items-center animate-in zoom-in duration-300">
                <div className="bg-red-100 w-20 h-20 rounded-4xl flex items-center justify-center mb-6">
                <X className="text-red-600 opacity-80" size={40} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tighter">Brak danych</h2>
                <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                Wygląda na to, że link jest niepełny. <br/> Skorzystaj z linku w wiadomości e-mail.
                </p>
                <Link 
                to="/alerty" 
                className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl text-sm"
                >
                Przejdź do alertów
                </Link>
            </div>
            )}

        {status === 'error' && (
          <div className="flex flex-col items-center">
            <XCircle className="text-red-600 mb-4" size={60} />
            <h2 className="text-2xl font-black text-gray-900 mb-2">Błąd</h2>
            <p className="text-gray-500 mb-6 text-sm">{message}</p>
            <Link to="/alerty" className="text-purple-600 font-bold text-sm">Zarządzaj alertami ręcznie</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default UnsubscribePage;