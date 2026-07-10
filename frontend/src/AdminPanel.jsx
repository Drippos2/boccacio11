import React, { useState, useEffect } from 'react';
import { Save, Utensils, LogOut, Lock, CheckCircle, XCircle, Eye, Megaphone, Video, Image as ImageIcon } from 'lucide-react';

const AnimatedCounter = ({ targetValue }) => {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let start = displayValue;
    const end = targetValue;
    if (start === end) return;
    const duration = 1500; 
    const range = end - start;
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentCount = Math.floor(progress * range + start);
      setDisplayValue(currentCount);
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplayValue(end);
    };
    requestAnimationFrame(animate);
  }, [targetValue]);
  return <span>{displayValue.toLocaleString()}</span>;
};

const AdminPanel = () => {
  const ADMIN_PASSWORD = "Bo123654";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [status, setStatus] = useState({ type: '', message: '' });
  const [visits, setVisits] = useState(0);
  
  // Rozšírený state pre menu
  const [menu, setMenu] = useState({
    soup: '',
    mainCourse: '',
    price: '8,90 €',
    announcement: '',
    mediaType: 'none', // 'none', 'image', 'video-file', 'video-url'
    mediaContent: ''   // Tu bude Base64 alebo URL
  });

  useEffect(() => {
    if (localStorage.getItem("admin_auth") === "true") {
      setIsLoggedIn(true);
      fetchCurrentMenu();
      fetchStats();
    }
  }, []);

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMenu({ ...menu, mediaContent: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("https://boccacio11.onrender.com/api/stats");
      const data = await res.json();
      setVisits(data.total_visits || 0);
    } catch (err) { console.error("Chyba stats"); }
  };

  const fetchCurrentMenu = async () => {
    try {
      const res = await fetch("https://boccacio11.onrender.com/api/daily-menu");
      const data = await res.json();
      if (data) {
        setMenu({
          soup: data.soup || '',
          mainCourse: data.mainCourse || '',
          price: data.price || '8,90 €',
          announcement: data.announcement || '',
          mediaType: data.mediaType || 'none',
          mediaContent: data.mediaContent || ''
        });
      }
    } catch (err) { console.error("Chyba menu"); }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem("admin_auth", "true");
      fetchCurrentMenu();
      fetchStats();
    } else { alert("Nesprávne heslo!"); }
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
        setStatus({ type: 'success', message: 'Uložené!' });
        setTimeout(() => setStatus({ type: '', message: '' }), 3000);
      } else throw new Error();
    } catch (err) { setStatus({ type: 'error', message: 'Chyba servera!' }); }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-orange-500">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Prístup</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder="Heslo" className="w-full p-4 border rounded-xl" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
            <button className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold">Vstúpiť</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-black">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 flex items-center gap-6">
          <Eye size={32} className="text-blue-600" />
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Návštevnosť</p>
            <p className="text-5xl font-black"><AnimatedCounter targetValue={visits} /></p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-orange-500 p-6 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold uppercase">Správa Menu</h1>
            <button onClick={() => { localStorage.removeItem("admin_auth"); window.location.reload(); }} className="bg-orange-600 px-4 py-2 rounded-lg text-sm">Odhlásiť</button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase">Polievka</label>
              <input type="text" className="w-full p-4 border rounded-xl" value={menu.soup} onChange={(e) => setMenu({...menu, soup: e.target.value})} />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase">Hlavné jedlo</label>
              <textarea rows="3" className="w-full p-4 border rounded-xl" value={menu.mainCourse} onChange={(e) => setMenu({...menu, mainCourse: e.target.value})} />
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-4">
              <label className="block text-sm font-bold text-gray-700 uppercase">Typ média</label>
              <select className="w-full p-4 border rounded-xl bg-white" value={menu.mediaType} onChange={(e) => setMenu({...menu, mediaType: e.target.value, mediaContent: ''})}>
                <option value="none">Žiadne médium</option>
                <option value="image">Obrázok (nahrať)</option>
                <option value="video-file">Video súbor (nahrať)</option>
                <option value="video-url">Video z linku (URL)</option>
              </select>

              {menu.mediaType === 'image' && (
                <input type="file" accept="image/*" onChange={handleMediaUpload} />
              )}
              {menu.mediaType === 'video-file' && (
                <input type="file" accept="video/mp4" onChange={handleMediaUpload} />
              )}
              {menu.mediaType === 'video-url' && (
                <input type="text" placeholder="Vlož URL adresu videa..." className="w-full p-4 border rounded-xl" value={menu.mediaContent} onChange={(e) => setMenu({...menu, mediaContent: e.target.value})} />
              )}
            </div>

            {status.message && <div className="p-4 rounded-xl bg-green-50 text-green-700">{status.message}</div>}

            <button type="submit" className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold shadow-xl">ULOŽIŤ ZMENY</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;