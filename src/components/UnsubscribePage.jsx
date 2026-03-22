import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

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
        setMessage(response.data.message);
        setStatus('success');
      } catch (err) {
        setMessage(err.response?.data?.detail || 'Error occurred while unsubscribing.');
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
            <h2 className="text-xl font-bold text-gray-900">Processing...</h2>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center">
            <CheckCircle className="text-green-600 mb-4" size={60} />
            <h2 className="text-2xl font-black text-gray-900 mb-2">Unsubscribed</h2>
            <p className="text-gray-500 mb-6 text-sm">{message}</p>
            <Link to="/" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-sm">Back to Home</Link>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center">
            <XCircle className="text-red-600 mb-4" size={60} />
            <h2 className="text-2xl font-black text-gray-900 mb-2">Error</h2>
            <p className="text-gray-500 mb-6 text-sm">{message}</p>
            <Link to="/alerty" className="text-purple-600 font-bold text-sm">Manage alerts manually</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default UnsubscribePage;