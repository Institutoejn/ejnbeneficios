
import React, { useState } from 'react';
import { UserView } from './types';
import Header from './components/Header';
import SubscriberView from './components/SubscriberView';
import PartnerView from './components/PartnerView';
import AdminView from './components/AdminView';
import Login from './components/Login';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserView | null>(null);

  const handleLogin = (role: UserView) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center p-8">
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  // Subscriber, Partner and Admin Views now manage their own layouts/navbars
  const isCustomLayout = userRole === UserView.SUBSCRIBER || userRole === UserView.PARTNER || userRole === UserView.ADMIN;

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-1000">
      {!isCustomLayout && (
        <div className="w-full sticky top-0 z-[110] glass shadow-soft">
          <div className="max-w-6xl mx-auto">
            <Header onLogout={handleLogout} />
          </div>
        </div>
      )}
      
      <main className={`flex-1 w-full ${isCustomLayout ? 'max-w-full' : 'max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-10'}`}>
        <div className="animate-in fade-in duration-1000 slide-in-from-bottom-6 h-full">
          {userRole === UserView.SUBSCRIBER && <SubscriberView />}
          {userRole === UserView.PARTNER && <PartnerView />}
          {userRole === UserView.ADMIN && <AdminView />}
        </div>
      </main>

      {!isCustomLayout && (
        <footer className="w-full py-12 border-t border-gray-100 bg-white">
          <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-300 text-[11px] font-black uppercase tracking-[0.3em]">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-200">
                 +
               </div>
               <span>EJN Benefícios &copy; {new Date().getFullYear()}</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-ejn-lime transition-colors">Privacidade</a>
              <a href="#" className="hover:text-ejn-lime transition-colors">Termos</a>
              <a href="#" className="hover:text-ejn-lime transition-colors">Ajuda</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
