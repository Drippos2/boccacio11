import React, { useState, useEffect } from 'react';
import { Save, Utensils, LogOut, Lock, CheckCircle, XCircle } from 'lucide-react';

const AdminPanel = () => {
  const ADMIN_PASSWORD = "Bo123654";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [status, setStatus] = useState({ type: '', message: '' });
  const [menu, setMenu] = useState({
    soup: '',
    mainCourse: '',
    price: '8,90 €'
  });

  // Kontrola prihlásenia pri štarte
  useEffect(() => {
    if (localStorage.getItem("admin_auth") === "true") {
      setIsLoggedIn(true);
      fetchCurrentMenu();
    }
  }, []);

  const fetchCurrentMenu = async () => {
    try {
      const res = await fetch("https://boccacio11.onrender.com/api/daily-menu");
      const data = await res.json();
      if (data && data.length > 0) {
        setMenu({
          soup: data[0].soup || '',
          mainCourse: data[0].mainCourse || '',
          price: data[0].price || '8,90 €'
        });
      }
    } catch (err) {
      console.error("Nepodarilo sa načítať dáta z backendu.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem("admin_auth", "true");
      fetchCurrentMenu();
    } else {
      alert("Nesprávne heslo!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("admin_auth");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Ukladám...' });

    try {
      const response = await fetch("https://boccacio11.onrender.com/api/daily-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menu),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Menu bolo úspešne uložené!' });
      } else {
        throw new Error();
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Chyba! Beží ti backend (Python)?' });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-orange-500">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-100 p-4 rounded-full">
              <Lock className="text-orange-600" size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Prístup</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Zadajte heslo"
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg">
              Vstúpiť
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-orange-500 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Utensils size={24} />
            <h1 className="text-xl font-bold uppercase tracking-wider">Správa Denného Menu</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            <LogOut size={18} /> Odhlásiť
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase italic">Dnešná polievka</label>
            <input
              type="text"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-lg"
              value={menu.soup}
              onChange={(e) => setMenu({...menu, soup: e.target.value})}
              placeholder="napr. Slepačí vývar s rezancami"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase italic">Hlavné jedlo</label>
            <textarea
              rows="3"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-lg"
              value={menu.mainCourse}
              onChange={(e) => setMenu({...menu, mainCourse: e.target.value})}
              placeholder="napr. 150g Viedenský bravčový rezeň, zemiakový šalát"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase italic">Cena menu</label>
            <input
              type="text"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-xl font-bold text-orange-600"
              value={menu.price}
              onChange={(e) => setMenu({...menu, price: e.target.value})}
            />
          </div>

          {status.message && (
            <div className={`p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {status.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
              {status.message}
            </div>
          )}

          <button type="submit" className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl">
            <Save size={24} /> ULOŽIŤ ZMENY
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;