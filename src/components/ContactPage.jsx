import { Mail, Github } from 'lucide-react';

function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-30 px-4">
      
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full border border-gray-100 text-center relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-2 animate-bg-flow"></div>

        <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">
          Bądźmy w kontakcie
        </h2>
        
        <p className="text-gray-500 mb-6 leading-relaxed text-sm">
          Masz problem z działaniem aplikacji, znalazłeś błąd przy wyszukiwaniu perfum, a może masz pomysł na nową funkcję? Skontaktuj się ze mną!
        </p>

        <div className="flex flex-col gap-4">
          
          <a 
            href="mailto:kontakt.mateusz.kudas@gmail.com" 
            className="group flex text-xs md:text-base items-center justify-center gap-3 w-full bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 py-4 px-6 rounded-xl font-bold transition-all border border-gray-100 hover:border-blue-600"
          >
            <Mail size={22} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
            kontakt.mateusz.kudas@gmail.com
          </a>

          <a 
            href="https://github.com/mk-ehe" 
            target="_blank" 
            rel="noreferrer"
            className="group flex text-xs md:text-base items-center justify-center gap-3 w-full bg-gray-50 hover:bg-purple-50 text-gray-700 hover:text-purple-700 py-4 px-6 rounded-xl font-bold transition-all border border-gray-100 hover:border-purple-600"
          >
            <Github size={22} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
            github.com/mk-ehe
          </a>
          
        </div>
      </div>
    </div>
  );
}

export default ContactPage;