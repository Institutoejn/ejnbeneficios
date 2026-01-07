
import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { 
  Camera, CheckCircle, AlertCircle, RefreshCw, Info, TrendingUp, Users, 
  History, UserCircle, LogOut, Search, Clock, ChevronRight, Save, Camera as CameraIcon, Lock as LockIcon,
  X
} from 'lucide-react';

type PartnerSection = 'scan' | 'history' | 'profile';

const PartnerView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<PartnerSection>('scan');
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Mock de Histórico
  const [history] = useState([
    { id: 1, user: 'Ana Oliveira', benefit: '20% OFF', date: 'Hoje, 14:20', status: 'SUCCESS' },
    { id: 2, user: 'Bruno Santos', benefit: 'Isenção Taxa', date: 'Hoje, 11:05', status: 'SUCCESS' },
    { id: 3, user: 'Carla Dias', benefit: '20% OFF', date: 'Ontem, 19:45', status: 'SUCCESS' },
    { id: 4, user: 'Marcos Lima', benefit: '20% OFF', date: 'Ontem, 15:30', status: 'EXPIRED' },
  ]);

  // Perfil da Loja
  const [isEditing, setIsEditing] = useState(false);
  const [storeProfile, setStoreProfile] = useState({
    name: 'Burger King - Centro',
    email: 'bk.centro@parceiros.ejn.com.br',
    category: 'Alimentação',
    benefit: '20% OFF em Combos Whopper',
    photo: 'https://picsum.photos/200?random=10'
  });
  const [tempStoreData, setTempStoreData] = useState({ ...storeProfile });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;
    if (isScanning && !scanResult) {
      scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: { width: 250, height: 250 } }, false);
      scanner.render(
        (decodedText) => {
          setScanResult(decodedText);
          setIsScanning(false);
          setIsValid(decodedText.includes("EJN-VALID"));
          if (scanner) scanner.clear();
        },
        (error) => {}
      );
    }
    return () => { if (scanner) scanner.clear().catch(() => {}); };
  }, [isScanning, scanResult]);

  const resetScanner = () => {
    setScanResult(null);
    setIsValid(null);
    setIsScanning(true);
  };

  const NavItem = ({ section, icon: Icon, label }: { section: PartnerSection, icon: any, label: string }) => (
    <button
      onClick={() => setActiveSection(section)}
      className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold text-xs transition-all ${
        activeSection === section 
        ? 'bg-ejn-lime text-ejn-petrol shadow-soft' 
        : 'text-gray-400 hover:bg-ejn-soft hover:text-ejn-petrol'
      }`}
    >
      <Icon size={18} strokeWidth={2.5} />
      {label}
    </button>
  );

  const renderScan = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-2">
        <h2 className="text-2xl font-title text-ejn-petrol tracking-tight">Validar Benefício</h2>
        <p className="text-gray-500 font-medium text-xs">Escaneie o código do jovem para aplicar o desconto.</p>
      </div>

      {!isScanning && !scanResult && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 shadow-premium flex flex-col items-center gap-8 text-center">
            <div className="w-28 h-28 rounded-full bg-ejn-lime/10 flex items-center justify-center text-ejn-lime border-[3px] border-dashed border-ejn-lime animate-pulse">
              <Camera size={44} strokeWidth={1.5} />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl lg:text-2xl font-title text-ejn-petrol">Pronto para validar?</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed max-w-xs mx-auto font-medium">Capture o QR Code individual do assinante para confirmar a elegibilidade.</p>
            </div>
            <button 
              onClick={() => setIsScanning(true)}
              className="w-full max-w-sm bg-ejn-petrol text-white py-5 rounded-2xl font-title text-lg shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
            >
              ESCANEAR AGORA
            </button>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-ejn-petrol p-8 rounded-[2rem] lg:rounded-[2.5rem] text-white shadow-premium relative overflow-hidden h-64 flex flex-col justify-between">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-ejn-lime opacity-10 rounded-full"></div>
              <div className="relative z-10 flex items-center gap-3">
                <div className="p-2 bg-ejn-lime rounded-lg text-ejn-petrol"><Users size={18} /></div>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-60">Hoje</p>
              </div>
              <div className="relative z-10">
                <p className="text-[10px] text-white/50 font-bold mb-1">Atendimentos</p>
                <h4 className="text-5xl font-title text-ejn-lime leading-none">12</h4>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-green-400 font-bold text-[11px]">
                <TrendingUp size={14} /> +15% vs Ontem
              </div>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-gray-50 shadow-soft flex items-center gap-4">
               <div className="w-10 h-10 bg-ejn-soft rounded-xl flex items-center justify-center text-ejn-petrol"><Info size={18} /></div>
               <div>
                 <p className="text-[11px] font-bold text-ejn-petrol">Dica do Parceiro</p>
                 <p className="text-[9px] text-gray-400 font-medium leading-tight">Mantenha a câmera limpa para uma leitura instantânea.</p>
               </div>
            </div>
          </div>
        </div>
      )}

      {isScanning && (
        <div className="max-w-md mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black text-ejn-petrol uppercase tracking-[0.2em]">Câmera Ativa</p>
            <button onClick={() => setIsScanning(false)} className="text-gray-400 hover:text-red-500"><X size={20} /></button>
          </div>
          <div id="qr-reader" className="overflow-hidden rounded-[2.5rem] border-[6px] border-ejn-lime shadow-2xl bg-black aspect-square"></div>
          <p className="text-center text-[11px] text-gray-400 font-medium">Posicione o código no centro do quadro</p>
        </div>
      )}

      {scanResult && (
        <div className={`p-8 lg:p-16 rounded-[2.5rem] border-2 flex flex-col items-center text-center gap-8 animate-in zoom-in-95 ${isValid ? 'bg-green-50 border-green-500/30' : 'bg-red-50 border-red-500/30'}`}>
          <div className={`p-6 rounded-full ${isValid ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {isValid ? <CheckCircle size={64} strokeWidth={1.5} /> : <AlertCircle size={64} strokeWidth={1.5} />}
          </div>
          <div className="space-y-3">
            <h3 className={`text-2xl lg:text-3xl font-title ${isValid ? 'text-green-700' : 'text-red-700'}`}>
              {isValid ? 'VANTAGEM APROVADA!' : 'CARTÃO INVÁLIDO'}
            </h3>
            <p className="text-gray-500 text-xs font-medium max-w-xs">{isValid ? 'O desconto de 20% pode ser aplicado ao pedido do jovem.' : 'Este jovem não possui uma assinatura ativa ou o código expirou.'}</p>
          </div>
          <button onClick={resetScanner} className="w-full max-w-xs bg-white border border-gray-100 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 font-title text-base text-ejn-petrol hover:border-ejn-lime transition-all shadow-lg active:scale-95">
            <RefreshCw size={20} /> NOVA VALIDAÇÃO
          </button>
        </div>
      )}
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="px-2">
        <h2 className="text-2xl font-title text-ejn-petrol tracking-tight">Histórico de Atendimentos</h2>
        <p className="text-gray-500 font-medium text-xs">Acompanhe as validações realizadas recentemente.</p>
      </div>

      <div className="bg-white rounded-[2rem] lg:rounded-[2.5rem] border border-gray-100 shadow-soft overflow-hidden">
        <div className="p-4 lg:p-6 border-b border-gray-50">
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <input type="text" placeholder="Buscar por nome..." className="w-full bg-ejn-soft border-none rounded-xl py-2.5 pl-11 pr-4 text-[11px] font-medium" />
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-ejn-soft/30 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-8 py-5">Jovem</th>
                <th className="px-8 py-5">Benefício</th>
                <th className="px-8 py-5">Data/Hora</th>
                <th className="px-8 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {history.map((h) => (
                <tr key={h.id} className="hover:bg-ejn-soft/20 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-ejn-lime/10 flex items-center justify-center text-ejn-petrol font-black text-[10px] uppercase">{h.user.charAt(0)}</div>
                      <span className="font-bold text-ejn-petrol text-xs">{h.user}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[11px] font-bold text-ejn-lime uppercase">{h.benefit}</td>
                  <td className="px-8 py-5 text-[11px] text-gray-400 font-medium">{h.date}</td>
                  <td className="px-8 py-5">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${h.status === 'SUCCESS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {h.status === 'SUCCESS' ? 'Aprovado' : 'Falhou'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-top-4 duration-700 pb-10">
      <div className="flex justify-between items-center px-4">
        <div><h2 className="text-2xl font-title text-ejn-petrol tracking-tight">Perfil do Parceiro</h2><p className="text-xs text-gray-400 font-medium">Dados de exibição da sua loja.</p></div>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="bg-ejn-petrol text-white px-5 py-2.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest shadow-lg">Editar</button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-400 px-5 py-2.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest">Cancelar</button>
            <button onClick={() => { setStoreProfile({...tempStoreData}); setIsEditing(false); }} className="bg-ejn-petrol text-white px-5 py-2.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest flex items-center gap-2 shadow-lg"><Save size={14}/> Salvar</button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-premium border border-gray-100 p-8 lg:p-10">
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="relative group flex-shrink-0">
             <div onClick={() => isEditing && fileInputRef.current?.click()} className={`w-32 h-32 md:w-40 md:h-40 rounded-[2rem] overflow-hidden border-4 border-ejn-soft shadow-soft relative transition-all ${isEditing ? 'cursor-pointer ring-4 ring-ejn-lime/30' : ''}`}>
                <img src={isEditing ? tempStoreData.photo : storeProfile.photo} className="w-full h-full object-cover" />
                {isEditing && <div className="absolute inset-0 bg-ejn-petrol/40 flex flex-col items-center justify-center text-white"><CameraIcon size={24} /><span className="text-[8px] font-black uppercase mt-1">Logo</span></div>}
             </div>
             <input type="file" ref={fileInputRef} onChange={(e) => { const file = e.target.files?.[0]; if(file){ const reader = new FileReader(); reader.onloadend = () => setTempStoreData({...tempStoreData, photo: reader.result as string}); reader.readAsDataURL(file); } }} className="hidden" />
          </div>
          <div className="flex-1 w-full space-y-6">
             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nome da Loja</label>
                {isEditing ? <input value={tempStoreData.name} onChange={(e)=>setTempStoreData({...tempStoreData, name: e.target.value})} className="w-full bg-ejn-soft border-2 border-transparent focus:border-ejn-lime/50 focus:bg-white outline-none rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol" /> : <div className="bg-white border border-gray-100 rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol shadow-soft">{storeProfile.name}</div>}
             </div>
             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Benefício Ativo</label>
                {isEditing ? <input value={tempStoreData.benefit} onChange={(e)=>setTempStoreData({...tempStoreData, benefit: e.target.value})} className="w-full bg-ejn-soft border-2 border-transparent focus:border-ejn-lime/50 focus:bg-white outline-none rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol" /> : <div className="bg-white border border-gray-100 rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol shadow-soft">{storeProfile.benefit}</div>}
             </div>
             <div className="space-y-1.5 opacity-60">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">E-mail Corporativo</label>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl py-3.5 px-6 font-bold text-gray-400 flex items-center justify-between cursor-not-allowed">{storeProfile.email}<LockIcon size={14}/></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-mesh relative overflow-x-hidden">
      {/* 1. SIDEBAR ADMINISTRATIVA (Desktop) */}
      <nav className="hidden lg:flex fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex-col p-6 shadow-premium">
        <div className="mb-10 flex flex-col items-center">
          <img src="https://i.imgur.com/8KTBmcm.png" alt="Logo EJN" className="h-20 w-auto object-contain" />
          <div className="w-full h-px bg-gray-50 mt-8"></div>
        </div>
        <div className="flex-1 space-y-2">
          <NavItem section="scan" icon={Camera} label="Escanear" />
          <NavItem section="history" icon={History} label="Histórico" />
          <NavItem section="profile" icon={UserCircle} label="Perfil" />
        </div>
        <div className="mt-auto pt-6 border-t border-gray-50">
          <button onClick={() => window.location.reload()} className="w-full flex items-center gap-3 p-4 rounded-2xl font-bold text-xs text-red-400 hover:bg-red-50 transition-all">
            <LogOut size={18} strokeWidth={2.5} /> Sair
          </button>
        </div>
      </nav>

      {/* 2. BOTTOM NAV MOBILE */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 flex items-center justify-around p-3 z-50 shadow-2xl">
        {[
          { id: 'scan', label: 'Escanear', icon: Camera },
          { id: 'history', label: 'Histórico', icon: History },
          { id: 'profile', label: 'Perfil', icon: UserCircle }
        ].map((item) => (
          <button key={item.id} onClick={() => setActiveSection(item.id as PartnerSection)} className={`flex flex-col items-center gap-1 transition-all ${activeSection === item.id ? 'text-ejn-lime' : 'text-gray-400'}`}>
            <item.icon size={18} strokeWidth={activeSection === item.id ? 3 : 2} />
            <span className="text-[9px] font-bold">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* 3. ÁREA DE CONTEÚDO PRINCIPAL */}
      <main className="flex-1 min-h-screen transition-all duration-300 ml-0 lg:ml-64 pb-24 lg:pb-0 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-8 lg:pt-10">
          {activeSection === 'scan' && renderScan()}
          {activeSection === 'history' && renderHistory()}
          {activeSection === 'profile' && renderProfile()}
        </div>
      </main>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default PartnerView;
