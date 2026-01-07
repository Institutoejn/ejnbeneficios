
import React, { useState } from 'react';
import { UserView } from '../types';
import { Lock, User, AlertCircle, ArrowRight, Shield } from 'lucide-react';

interface Props {
  onLogin: (role: UserView) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lowerUser = username.toLowerCase();
    
    if (lowerUser === 'jovem') {
      onLogin(UserView.SUBSCRIBER);
    } else if (lowerUser === 'parceiro') {
      onLogin(UserView.PARTNER);
    } else if (lowerUser === 'admin') {
      onLogin(UserView.ADMIN);
    } else {
      setError('Acesso negado. Verifique os dados.');
    }
  };

  return (
    <div className="w-full max-w-md glass rounded-5xl p-8 md:p-12 shadow-premium animate-in fade-in zoom-in-95 duration-1000 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute -top-16 -left-16 w-32 h-32 bg-ejn-lime opacity-10 blur-2xl rounded-full"></div>
      <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-ejn-petrol opacity-5 blur-2xl rounded-full"></div>

      <div className="flex flex-col items-center mb-10 relative z-10">
        <div className="mb-6 transform hover:scale-105 transition-transform duration-500">
          <img 
            src="https://i.imgur.com/8KTBmcm.png" 
            alt="Logo EJN Benefícios" 
            className="h-24 md:h-32 w-auto object-contain"
          />
        </div>
        <div className="flex items-center gap-2 opacity-50">
          <Shield size={10} className="text-ejn-petrol" />
          <p className="text-gray-400 text-[9px] font-bold uppercase tracking-[0.3em]">Portal Seguro</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-ejn-petrol/40 uppercase ml-4 tracking-[0.2em]">Identificação</label>
          <div className="relative group">
            <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-ejn-lime transition-colors duration-300" />
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuário"
              className="w-full bg-white/50 border-2 border-transparent focus:border-ejn-lime/30 focus:bg-white outline-none rounded-3xl py-4 pl-14 pr-6 font-semibold text-base transition-all shadow-soft"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-ejn-petrol/40 uppercase ml-4 tracking-[0.2em]">Chave de Acesso</label>
          <div className="relative group">
            <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-ejn-lime transition-colors duration-300" />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full bg-white/50 border-2 border-transparent focus:border-ejn-lime/30 focus:bg-white outline-none rounded-3xl py-4 pl-14 pr-6 font-semibold text-base transition-all shadow-soft"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 text-red-600 text-xs font-bold bg-red-50/50 backdrop-blur-md p-4 rounded-2xl border border-red-100 animate-in slide-in-from-top-2">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <button 
          type="submit"
          className="w-full bg-ejn-petrol text-white py-4 rounded-3xl font-title text-lg shadow-premium hover:shadow-2xl hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
        >
          CONECTAR <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
      
      <div className="mt-10 text-center opacity-40">
        <p className="text-gray-500 text-[9px] uppercase font-bold tracking-[0.3em]">
          EJN Brasil • Impacto Social
        </p>
      </div>
    </div>
  );
};

export default Login;
