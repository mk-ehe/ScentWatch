import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Mail, Loader2, Trash2, Plus, BellRing, ExternalLink, CheckCircle } from 'lucide-react';

function AlertsPage() {
  const [searchParams] = useSearchParams();
  const urlEmail = searchParams.get('email');
  const urlToken = searchParams.get('token');

  const [emailInput, setEmailInput] = useState('');
  const [authStatus, setAuthStatus] = useState('idle');

  const [alerts, setAlerts] = useState([]);
  const [isLoadingAlerts, setIsLoadingAlerts] = useState(false);
  
  const [newUrl, setNewUrl] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const [cooldown, setCooldown] = useState(0);

  const isAuthenticated = urlEmail && urlToken;

  useEffect(() => {
    const savedExpiry = localStorage.getItem('scentwatch_cooldown_expiry');
    if (savedExpiry) {
      const remaining = Math.ceil((parseInt(savedExpiry) - Date.now()) / 1000);
      if (remaining > 0) {
        setCooldown(remaining);
      } else {
        localStorage.removeItem('scentwatch_cooldown_expiry');
      }
    }
  }, []);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            localStorage.removeItem('scentwatch_cooldown_expiry');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAlerts();
    }
  }, [isAuthenticated]);

  const fetchAlerts = async () => {
    setIsLoadingAlerts(true);
    try {
      const res = await axios.get(`https://perfumehub-api.onrender.com/my-alerts?email=${urlEmail}&token=${urlToken}`);
      setAlerts(res.data.alerts);
    } catch (e) {
      alert("Sesja wygasła lub link jest błędny. Zaloguj się ponownie.");
      window.location.href = '/alerty';
    } finally {
      setIsLoadingAlerts(false);
    }
  };

  const handleRequestAccess = async (e) => {
    e.preventDefault();
    if (cooldown > 0) return;

    setAuthStatus('loading');
    try {
      await axios.post('https://perfumehub-api.onrender.com/request-access', { email: emailInput });
      const expiry = Date.now() + 60 * 1000;
      localStorage.setItem('scentwatch_cooldown_expiry', expiry.toString());
      setCooldown(60);
      setAuthStatus('success');
    } catch (err) {
      if (err.response?.status === 429) {
        const expiry = Date.now() + 900 * 1000;
        localStorage.setItem('scentwatch_cooldown_expiry', expiry.toString());
        setCooldown(900);
        alert("Przekroczono limit. Spróbuj ponownie za 15 minut.");
      } else {
        alert("Błąd serwera przy wysyłaniu linku.");
      }
      setAuthStatus('idle');
    }
  };

  const handleRemoveAlert = async (fragranceUrl) => {
    try {
      await axios.post('https://perfumehub-api.onrender.com/unsubscribe', {
        url: fragranceUrl,
        email: urlEmail,
        token: urlToken
      });
      setAlerts(alerts.filter(a => a.url !== fragranceUrl));
    } catch (e) {
      alert("Błąd przy usuwaniu powiadomienia.");
    }
  };

  const handleAddNewAlert = async (e) => {
    e.preventDefault();
    if (!newUrl) return;
    setIsAdding(true);
    try {
      await axios.get(`https://perfumehub-api.onrender.com/subscribe?url=${encodeURIComponent(newUrl)}&email=${urlEmail}&token=${urlToken}`, {timeout:10000});
      setNewUrl('');
      fetchAlerts();
    } catch (e) {
      alert("Błąd przy dodawaniu alertu.");
    } finally {
      setIsAdding(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 px-4 transition-all pb-20">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-xl w-full border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-600 to-purple-600 animate-bg-flow"></div>
          
          {authStatus !== 'success' ? (
            <>
              <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BellRing className="text-purple-600" size={32} />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">
                Twój Panel Zapachów
              </h2>
              <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                Podaj swój e-mail. Wyślemy Ci jednorazowy, bezpieczny link do zarządzania Twoimi alertami cenowymi.
              </p>
              <form onSubmit={handleRequestAccess} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="email" required placeholder="Twój e-mail..."
                    value={emailInput} onChange={(e) => setEmailInput(e.target.value)}
                    disabled={authStatus === 'loading' || cooldown > 0}
                    className="w-full py-4 pl-12 pr-6 rounded-2xl border-2 border-gray-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none font-bold text-gray-700 transition-all disabled:opacity-50"
                  />
                </div>
                <button 
                  type="submit" disabled={authStatus === 'loading' || cooldown > 0}
                  className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95 disabled:opacity-50 cursor-pointer flex justify-center"
                >
                  {authStatus === 'loading' ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : cooldown > 0 ? (
                    `Odczekaj ${cooldown}s`
                  ) : (
                    'Wyślij link dostępu'
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="animate-in fade-in zoom-in duration-500">
              <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">Sprawdź pocztę!</h2>
              <p className="text-gray-500 text-s mb-6 leading-relaxed">Wysłano link na:<br/><b className="text-gray-900">{emailInput}</b>.</p>
              <button 
                onClick={() => setAuthStatus('idle')} 
                disabled={cooldown > 0}
                className="text-purple-600 hover:cursor-pointer font-bold text-xs uppercase tracking-widest hover:underline disabled:opacity-50"
              >
                {cooldown > 0 ? `Wyślij ponownie za ${cooldown}s` : 'Spróbuj inny e-mail'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-12 px-4 pb-20">
      <div className="w-full max-w-5xl">
        
        <div className="mb-8 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Zarządzanie Alertami</h1>
            <p className="text-sm text-gray-500 font-medium">Zalogowano jako: <span className="animate-text-flow font-bold">{urlEmail}</span></p>
          </div>
          <button onClick={() => window.location.href='/alerty'} className="text-s font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors cursor-pointer">
            Wyjdź
          </button>
        </div>

        <form onSubmit={handleAddNewAlert} className="mb-10 flex relative shadow-lg rounded-4xl">
          <input 
            type="text" required placeholder="Wklej link z Perfumehub aby dodać nowy alert..."
            value={newUrl} onChange={(e) => setNewUrl(e.target.value)}
            className="w-full py-6 pl-8 pr-40 rounded-4xl border-2 border-gray-100 focus:border-purple-500 outline-none font-medium text-gray-700 bg-white shadow-inner"
          />
          <button 
            type="submit" disabled={isAdding}
            className="absolute right-3 top-3 bottom-3 bg-purple-600 hover:bg-blue-600 text-white px-8 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-md"
          >
            {isAdding ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />} Dodaj
          </button>
        </form>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 bg-gray-50/50 border-b border-gray-100">
            <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">Obserwowane zapachy ({alerts.length})</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {isLoadingAlerts ? (
              <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-purple-600" size={40} /></div>
            ) : alerts.length === 0 ? (
              <div className="p-20 text-center text-gray-400 font-medium text-lg">Nie obserwujesz jeszcze żadnych zapachów.</div>
            ) : (
              alerts.map((item, idx) => (
                <div key={idx} className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 hover:bg-gray-50/50 transition-colors">
                  <div className="w-24 h-24 shrink-0 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-2 shadow-sm">
                    {item.picture ? (
                        <img src={item.picture} alt="Perfume" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                    ) : (
                        <span className="text-[10px] font-bold text-gray-300">BRAK</span>
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-lg font-black text-gray-900 mb-2 leading-tight">{item.fragrance}</h4>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        <span className="text-xs font-black text-green-700 bg-green-50 border border-green-100 px-3 py-1.5 rounded-lg">Aktualna: {item.price}</span>
                        {item.low_30d && item.low_30d !== "Brak" && (
                            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">Najniższa (30d): {item.low_30d}</span>
                        )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <a href={item.url} target="_blank" rel="noreferrer" className="p-4 text-blue-600 bg-blue-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-colors shadow-sm cursor-pointer" title="Zobacz w sklepie">
                      <ExternalLink size={20} />
                    </a>
                    <button onClick={() => handleRemoveAlert(item.url)} className="p-4 text-red-500 bg-red-50 rounded-2xl hover:bg-red-500 hover:text-white transition-colors shadow-sm cursor-pointer" title="Usuń alert">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AlertsPage;