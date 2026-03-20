import { Search, Scale, Bell, Mail } from 'lucide-react';

function Navbar() {
  const navBtnStyle = "flex font-bold text-[#FFFFFF] tracking-tight gap-1 cursor-pointer hover:text-blue-300 transition-colors items-center";

  return (
    <nav className="bg-linear-to-r from-blue-600 to-purple-600 w-full p-3 shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#FFFFFF] tracking-tight">
          ScentWatch
        </h1>
      
        <div className="flex gap-5 items-center">
          <a href="#" className={navBtnStyle}><Search size={20}></Search>Wyszukaj</a>
          <a href="#" className={navBtnStyle}><Scale size={20}></Scale>Porównaj</a>
          <a href="#" className={navBtnStyle}><Bell size={20}></Bell>Alerty</a>
          <a href="#" className={navBtnStyle}><Mail size={20}></Mail>Kontakt</a>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;