
import React, { useState, useRef, useEffect } from 'react';
import { LogOut, User, Bell, Sparkles, X, Gift } from 'lucide-react';

interface Props {
  onLogout: () => void;
}

const Header: React.FC<Props> = ({ onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, text: 'Bem-vindo ao EJN Benefícios!', time: 'Agora', icon: <Sparkles size={14} />, color: 'bg-ejn-lime/20 text-ejn-petrol' },
    { id: 2, text: 'Você ganhou 50 pontos por completar seu perfil.', time: 'Há 2 min', icon: <Gift size={14} />, color: 'bg-orange-100 text-orange-600' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="px-6 md:px-12 py-3 md:py-4 flex items-center justify-between relative bg-white">
      <div className="flex items-center gap-4 group cursor-pointer">
        <img 
          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EJN-LOGO-FALLBACK" 
          className="hidden" 
          alt="Pre-fetch fallback" 
        />
        <img 
          src="https://i.imgur.com/8KTBmcm.png" 
          alt="Logo EJN Benefícios" 
          className="h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <div className="hidden sm:block h-10 w-px bg-gray-100 ml-2"></div>
        <p className="hidden sm:block text-[9px] uppercase tracking-[0.3em] text-gray-400 font-extrabold opacity-60 max-w-[80px] leading-tight">Negócios com Propósito</p>
      </div>
      
      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-3 transition-all relative rounded-xl ${showNotifications ? 'bg-ejn-soft text-ejn-petrol' : 'text-gray-400 hover:text-ejn-petrol hover:bg-ejn-soft'}`}
          >
             <Bell size={20} md:size={24} strokeWidth={1.5} />
             <span className="absolute top-3 right-3 w-2 h-2 bg-ejn-lime rounded-full border-2 border-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-4 w-72 glass rounded-[2rem] shadow-premium p-6 border border-white/40 z-[120] animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-title text-[10px] text-ejn-petrol uppercase tracking-widest">Notificações</h4>
                <button onClick={() => setShowNotifications(false)} className="text-gray-300 hover:text-red-500 transition-colors">
                  <X size={14} />
                </button>
              </div>
              
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="flex gap-3 p-2 rounded-xl hover:bg-white/40 transition-colors cursor-pointer group">
                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${n.color}`}>
                      {n.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-ejn-petrol leading-tight">{n.text}</p>
                      <p className="text-[8px] text-gray-400 font-bold uppercase mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-4 pl-6 border-l border-gray-100">
          <div className="text-right">
            <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-0.5">Membro Gold</p>
            <p className="text-xs font-black text-ejn-petrol">Rodrigo Silva</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-ejn-soft border border-ejn-lime/20 flex items-center justify-center text-ejn-petrol">
            <User size={20} strokeWidth={1.5} />
          </div>
        </div>
        
        <button 
          onClick={onLogout}
          className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={20} md:size={24} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
};

export default Header;
