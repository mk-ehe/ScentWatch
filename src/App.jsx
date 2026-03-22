import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import ContactPage from "./components/ContactPage";
import Footer from './components/Footer';
import SearchPage from './components/SearchPage';
import AlertsPage from './components/AlertsPage';

function App() {
  return(

    <Router>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gray-50/30">
      
      <main className="flex-1">
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/alerty" element={<AlertsPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
      </Routes>
      </main>
      <Footer></Footer>
      </div>
    </Router>
  
  )
}

export default App;