import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import ContactPage from "./components/ContactPage";
import Footer from './components/Footer';
import { Search } from 'lucide-react';
import SearchPage from './components/SearchPage';


function App() {
  return(

    <Router>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gray-50/30">
      
      <main className="flex-1">
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/porownaj" element={<div className="p-10 text-white">Tu będzie porównywarka</div>} />
        <Route path="/alerty" element={<div className="p-10 text-white">Tu będą alerty</div>} />
        <Route path="/kontakt" element={<ContactPage />} />
      </Routes>
      </main>
      <Footer></Footer>
      </div>
    </Router>
  
  )
}

export default App;