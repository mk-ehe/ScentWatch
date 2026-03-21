import { Search, Scale, Bell, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar() {
  const navBtnStyle = "flex font-bold text-[#FFFFFF] tracking-tight gap-1 cursor-pointer hover:text-purple-400 transition-colors items-center text-sm md:text-base";

  return (
    <nav className="w-full p-3 animate-bg-flow sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center w-full mx-auto">
        <Link to="/" className="text-xl md:text-2xl font-bold text-[#FFFFFF] tracking-tight shrink-0">
          ScentWatch
        </Link>
      
        <div className="flex gap-4 md:gap-8 items-center">
          <Link to="/" className={navBtnStyle}>
            <Search size={20} />
            <span className="hidden md:block">Wyszukaj</span>
          </Link>
          <Link to="/porownaj" className={navBtnStyle}>
            <Scale size={20} />
            <span className="hidden md:block">Porównaj</span>
          </Link>
          <Link to="/alerty" className={navBtnStyle}>
            <Bell size={20} />
            <span className="hidden md:block">Alerty</span>
          </Link>
          <Link to="/kontakt" className={navBtnStyle}>
            <Mail size={20} />
            <span className="hidden md:block">Kontakt</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;