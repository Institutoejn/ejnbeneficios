
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_USER, CATEGORIES, MOCK_PARTNERS, CategoryIcon } from '../constants';
import VirtualCard from './VirtualCard';
import { X, QrCode, Star, Sparkles, TrendingUp, Clock, Home, Store, Wallet, User as UserIcon, ArrowRight, Camera, Lock as LockIcon, Check, Save, CreditCard, ChevronRight } from 'lucide-react';

type Tab = 'home' | 'partners' | 'wallet' | 'profile';

const BANNERS = [
  { id: 1, title: 'Cinema com 50% OFF', subtitle: 'Válido para todas as redes Cinemark', img: 'https://picsum.photos/800/300?random=1' },
  { id: 2, title: 'Nova Parceria: SmartFit', subtitle: 'Aproveite isenção total de matrícula', img: 'https://picsum.photos/800/300?random=2' }
];

const RICH_PARTNERS = [
  { id: 1, name: 'Burger King', cat: 'Alimentação', benefit: '20% OFF', img: 'https://picsum.photos/400/300?random=11' },
  { id: 2, name: 'Cinemark', cat: 'Lazer', benefit: 'Meia Entrada', img: 'https://picsum.photos/400/300?random=12' },
  { id: 3, name: 'SmartFit', cat: 'Saúde', benefit: 'Isenção Taxa', img: 'https://picsum.photos/400/300?random=13' },
  { id: 4, name: 'Droga Raia', cat: 'Saúde', benefit: '30% Desconto', img: 'https://picsum.photos/400/300?random=14' },
];

const MOCK_TRANSACTIONS = [
  { id: 1, partner: 'Burger King', date: '20 Mai, 2025', original: 45.00, paid: 36.00, saved: 9.00, icon: 'https://picsum.photos/100?random=21' },
  { id: 2, partner: 'Cinemark', date: '18 Mai, 2025', original: 60.00, paid: 30.00, saved: 30.00, icon: 'https://picsum.photos/100?random=22' },
  { id: 3, partner: 'SmartFit', date: '10 Mai, 2025', original: 110.00, paid: 0.00, saved: 110.00, icon: 'https://picsum.photos/100?random=23' },
  { id: 4, partner: 'Droga Raia', date: '05 Mai, 2025', original: 85.50, paid: 59.85, saved: 25.65, icon: 'https://picsum.photos/100?random=24' },
  { id: 5, partner: 'Burger King', date: '02 Mai, 2025', original: 32.00, paid: 25.60, saved: 6.40, icon: 'https://picsum.photos/100?random=21' },
];

const SubscriberView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showQRModal, setShowQRModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [currentBanner, setCurrentBanner] = useState(0);

  // Estados do Perfil
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: MOCK_USER.name,
    email: 'rodrigo.silva@email.com',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    photo: '',
    phone: '(11) 98765-4321',
    cpf: MOCK_USER.cpf
  });
  const [tempData, setTempData] = useState({ ...profileData });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSaved = MOCK_TRANSACTIONS.reduce((acc, curr) => acc + curr.saved, 0);

  const handleOpenQR = () => {
    setTimeLeft(300);
    setShowQRModal(true);
  };

  useEffect(() => {
    let timer: number;
    if (showQRModal && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setShowQRModal(false);
    }
    return () => clearInterval(timer);
  }, [showQRModal, timeLeft]);

  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(bannerTimer);
  }, []);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEditToggle = () => {
    if (!isEditing) setTempData({ ...profileData });
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setProfileData({ ...tempData });
    setIsEditing(false);
    alert('Dados atualizados com sucesso!');
  };

  const handleCancel = () => setIsEditing(false);

  const handlePhotoClick = () => {
    if (isEditing && fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderHome = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-4xl overflow-hidden shadow-premium group">
        <div className="absolute inset-0 flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${currentBanner * 100}%)` }}>
          {BANNERS.map((banner) => (
            <div key={banner.id} className="relative w-full h-full flex-shrink-0">
              <img src={banner.img} alt={banner.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ejn-petrol/90 via-ejn-petrol/40 to-transparent flex flex-col justify-end p-6 md:p-10">
                <span className="bg-ejn-lime text-ejn-petrol text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-3">Destaque</span>
                <h3 className="text-white text-2xl md:text-3xl font-title tracking-tighter">{banner.title}</h3>
                <p className="text-white/70 text-sm font-medium mt-1">{banner.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 right-6 flex gap-2">
          {BANNERS.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${currentBanner === i ? 'w-6 bg-ejn-lime' : 'w-1.5 bg-white/30'}`}></div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <aside className="lg:col-span-4 space-y-6">
          <div className="space-y-1">
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em]">Bem-vindo de volta</p>
            <h2 className="text-2xl font-title text-ejn-petrol tracking-tighter">Olá, <span className="text-ejn-lime">{profileData.name.split(' ')[0]}</span></h2>
          </div>
          
          <VirtualCard user={MOCK_USER} />

          <div className="glass p-5 rounded-4xl shadow-soft space-y-4">
            <div className="flex items-center gap-2">
               <div className="p-1.5 bg-ejn-lime rounded-lg text-ejn-petrol">
                 <Sparkles size={14} />
               </div>
               <p className="text-[10px] font-bold text-ejn-petrol uppercase tracking-widest">Acesso Rápido</p>
            </div>
            <button 
              onClick={handleOpenQR}
              className="w-full bg-ejn-petrol text-white py-4 rounded-2xl font-title text-sm flex items-center justify-center gap-3 shadow-xl hover:shadow-ejn-petrol/20 transition-all hover:-translate-y-0.5 active:scale-[0.98] group"
            >
              <QrCode size={18} className="text-ejn-lime group-hover:rotate-12 transition-transform" />
              VALIDAR AGORA
            </button>
          </div>
        </aside>

        <section className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-5 rounded-4xl shadow-soft border border-gray-50 flex flex-col justify-between h-40 hover:shadow-premium transition-all duration-500 cursor-pointer group">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-ejn-light rounded-xl flex items-center justify-center text-ejn-petrol group-hover:bg-ejn-lime transition-colors">
                    <Star size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-title text-ejn-petrol">Clube Cinema</h4>
                  <p className="text-[10px] text-gray-400 mt-1 font-medium">50% OFF todos os dias.</p>
                </div>
             </div>
             <div className="bg-ejn-petrol p-5 rounded-4xl shadow-soft flex flex-col justify-between h-40 hover:-translate-y-0.5 transition-all duration-500 cursor-pointer group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-ejn-lime">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h4 className="text-base font-title text-white">Impacto EJN</h4>
                  <p className="text-[10px] text-white/50 mt-1 font-medium">Economizou R$ 420 este mês.</p>
                </div>
             </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-title text-ejn-petrol tracking-tight px-2">Categorias</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat.id} 
                  onClick={() => setActiveTab('partners')}
                  className="bg-white p-5 rounded-4xl border border-transparent shadow-soft flex flex-col items-center text-center gap-3 transition-all duration-500 hover:shadow-premium hover:-translate-y-1 group"
                >
                  <div className="p-3 bg-ejn-soft rounded-2xl text-ejn-petrol group-hover:bg-ejn-lime transition-all">
                    <CategoryIcon name={cat.icon} size={24} />
                  </div>
                  <span className="font-bold text-ejn-petrol block text-xs tracking-tight">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const renderPartners = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 px-2">
        <div>
          <h2 className="text-2xl font-title text-ejn-petrol tracking-tight">Nossos Parceiros</h2>
          <p className="text-xs text-gray-400 font-medium">Economize nos melhores lugares.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {RICH_PARTNERS.map((partner) => (
          <div key={partner.id} className="bg-white rounded-4xl shadow-soft hover:shadow-premium transition-all duration-500 cursor-pointer group overflow-hidden border border-gray-100 flex flex-col">
            <div className="relative h-36 overflow-hidden">
              <img src={partner.img} alt={partner.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-3 right-3">
                <span className="bg-ejn-lime text-ejn-petrol text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                  {partner.benefit}
                </span>
              </div>
            </div>
            <div className="p-5 flex flex-col gap-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{partner.cat}</p>
              <h4 className="font-title text-lg text-ejn-petrol leading-tight">{partner.name}</h4>
              <button className="mt-4 flex items-center justify-between text-[11px] font-black uppercase text-ejn-petrol/60 group-hover:text-ejn-petrol transition-colors">
                Ver Benefício <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWallet = () => (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700 pb-10">
      <div className="px-2">
        <h2 className="text-2xl font-title text-ejn-petrol tracking-tight">Minha Carteira</h2>
        <p className="text-xs text-gray-400 font-medium">Acompanhe sua economia real com o clube.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LADO ESQUERDO: RESUMO (DESKTOP) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-ejn-petrol p-8 rounded-[2.5rem] text-white shadow-premium relative overflow-hidden flex flex-col justify-between h-64">
            <div className="absolute top-0 right-0 w-32 h-32 bg-ejn-lime opacity-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-ejn-lime uppercase tracking-[0.3em] mb-2">Economia Total no Mês</p>
              <h3 className="text-5xl font-title text-ejn-lime">{formatCurrency(totalSaved)}</h3>
              <div className="mt-4 flex items-center gap-2 text-white/50">
                <TrendingUp size={14} className="text-ejn-lime" />
                <p className="text-[11px] font-bold uppercase tracking-widest">Batendo Recordes!</p>
              </div>
            </div>
            <div className="relative z-10 bg-white/5 p-4 rounded-2xl border border-white/5">
              <p className="text-[11px] font-medium leading-tight">
                <span className="text-ejn-lime font-bold">Incrível!</span> Sua economia este mês paga <span className="text-ejn-lime font-bold">6x</span> o valor da sua assinatura.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-soft space-y-5">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-ejn-soft rounded-xl flex items-center justify-center text-ejn-petrol">
                     <CreditCard size={20} />
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sua Assinatura</p>
                     <p className="text-sm font-bold text-ejn-petrol">EJN Digital Gold</p>
                   </div>
                </div>
                <span className="bg-green-100 text-green-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Ativa</span>
             </div>
             <div className="flex justify-between items-center text-[11px] font-medium text-gray-500 pt-2 border-t border-gray-50">
                <span>Próxima Cobrança:</span>
                <span className="text-ejn-petrol font-bold">25/02/2026</span>
             </div>
             <button className="w-full bg-ejn-soft text-ejn-petrol py-3 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-ejn-lime transition-all">
                Gerenciar Plano
             </button>
          </div>
        </div>

        {/* LADO DIREITO: EXTRATO (DESKTOP) */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-soft overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-10">
             <h4 className="font-title text-base text-ejn-petrol">Extrato de Benefícios</h4>
             <button className="text-[10px] font-black text-ejn-lime uppercase tracking-widest hover:underline">Ver tudo</button>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[600px] divide-y divide-gray-50">
            {MOCK_TRANSACTIONS.map((t) => (
              <div key={t.id} className="p-6 flex items-center justify-between hover:bg-ejn-soft/30 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white flex-shrink-0">
                    <img src={t.icon} alt={t.partner} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="font-bold text-ejn-petrol text-sm leading-tight">{t.partner}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{t.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-500 font-black text-sm">+{formatCurrency(t.saved)}</p>
                  <p className="text-[9px] text-gray-300 font-bold uppercase line-through mt-0.5">De {formatCurrency(t.original)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-ejn-soft/20 flex items-center justify-center">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={12} className="text-ejn-lime" />
                Mais 12 benefícios disponíveis este mês
             </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-top-4 duration-700 pb-10">
      <div className="flex justify-between items-center px-4">
        <div>
          <h2 className="text-2xl font-title text-ejn-petrol tracking-tight">Meu Perfil</h2>
          <p className="text-xs text-gray-400 font-medium">Gerencie suas informações pessoais.</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={handleEditToggle}
            className="bg-ejn-petrol text-white px-5 py-2.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
          >
            Editar Perfil
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={handleCancel}
              className="bg-gray-100 text-gray-500 px-5 py-2.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-gray-200 transition-all"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave}
              className="bg-ejn-petrol text-white px-5 py-2.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-ejn-petrol/20"
            >
              <Save size={14} /> Salvar
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-premium border border-gray-100 overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start">
          <div className="relative group mx-auto md:mx-0">
             <div 
               onClick={handlePhotoClick}
               className={`w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-ejn-soft shadow-soft relative transition-all ${isEditing ? 'cursor-pointer ring-4 ring-ejn-lime/30 group-hover:opacity-80' : ''}`}
             >
                {tempData.photo || profileData.photo ? (
                  <img src={isEditing ? tempData.photo : profileData.photo} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-ejn-soft flex items-center justify-center text-ejn-petrol">
                    <UserIcon size={48} strokeWidth={1.5} />
                  </div>
                )}
                
                {isEditing && (
                  <div className="absolute inset-0 bg-ejn-petrol/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={24} className="mb-1" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Alterar</span>
                  </div>
                )}
             </div>
             <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
             <div className="absolute -bottom-2 -right-2 bg-ejn-lime text-ejn-petrol p-3 rounded-2xl shadow-lg border-2 border-white">
                <Star size={16} />
             </div>
          </div>

          <div className="flex-1 w-full space-y-6">
             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nome Completo</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={tempData.name}
                    onChange={(e) => setTempData({...tempData, name: e.target.value})}
                    className="w-full bg-ejn-soft border-2 border-transparent focus:border-ejn-lime/50 focus:bg-white outline-none rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol transition-all"
                  />
                ) : (
                  <div className="bg-white border border-gray-100 rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol shadow-soft">
                    {profileData.name}
                  </div>
                )}
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">E-mail</label>
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={tempData.email}
                      onChange={(e) => setTempData({...tempData, email: e.target.value})}
                      className="w-full bg-ejn-soft border-2 border-transparent focus:border-ejn-lime/50 focus:bg-white outline-none rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol transition-all"
                    />
                  ) : (
                    <div className="bg-white border border-gray-100 rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol shadow-soft truncate">
                      {profileData.email}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 opacity-60">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">CPF (Travado)</label>
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl py-3.5 px-6 font-bold text-gray-400 flex items-center justify-between cursor-not-allowed">
                    {profileData.cpf}
                    <LockIcon size={14} />
                  </div>
                </div>
             </div>

             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Endereço Residencial</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={tempData.address}
                    onChange={(e) => setTempData({...tempData, address: e.target.value})}
                    className="w-full bg-ejn-soft border-2 border-transparent focus:border-ejn-lime/50 focus:bg-white outline-none rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol transition-all"
                  />
                ) : (
                  <div className="bg-white border border-gray-100 rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol shadow-soft">
                    {profileData.address}
                  </div>
                )}
             </div>

             <div className="space-y-1.5 opacity-60">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Telefone de Segurança</label>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl py-3.5 px-6 font-bold text-gray-400 flex items-center justify-between cursor-not-allowed">
                  {profileData.phone}
                  <LockIcon size={14} />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <nav className="hidden lg:flex w-60 bg-white border-r border-gray-100 flex-col p-6 sticky top-0 h-screen z-[115] shadow-premium">
        <div className="mb-10 flex flex-col items-center">
          <img src="https://i.imgur.com/8KTBmcm.png" alt="Logo EJN Benefícios" className="h-20 w-auto object-contain" />
          <div className="w-full h-px bg-gray-50 mt-6"></div>
        </div>
        <div className="flex-1 space-y-1">
          {[
            { id: 'home', label: 'Início', icon: Home },
            { id: 'partners', label: 'Parceiros', icon: Store },
            { id: 'wallet', label: 'Carteira', icon: Wallet },
            { id: 'profile', label: 'Perfil', icon: UserIcon }
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id as Tab)} className={`w-full flex items-center gap-3 p-3.5 rounded-2xl font-bold text-xs transition-all ${activeTab === item.id ? 'bg-ejn-lime text-ejn-petrol shadow-soft' : 'text-gray-400 hover:bg-ejn-soft hover:text-ejn-petrol'}`}>
              <item.icon size={16} strokeWidth={2.5} /> {item.label}
            </button>
          ))}
        </div>
      </nav>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 flex items-center justify-around p-3 z-[200] shadow-2xl">
        {[
          { id: 'home', label: 'Início', icon: Home },
          { id: 'partners', label: 'Parceiros', icon: Store },
          { id: 'wallet', label: 'Carteira', icon: Wallet },
          { id: 'profile', label: 'Perfil', icon: UserIcon }
        ].map((item) => (
          <button key={item.id} onClick={() => setActiveTab(item.id as Tab)} className={`flex flex-col items-center gap-1 transition-all ${activeTab === item.id ? 'text-ejn-lime' : 'text-gray-400'}`}>
            <item.icon size={18} strokeWidth={activeTab === item.id ? 3 : 2} />
            <span className="text-[9px] font-bold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="flex-1 px-6 lg:px-10 py-8 lg:py-10 pb-24 lg:pb-10 bg-mesh overflow-x-hidden">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'home' && renderHome()}
          {activeTab === 'partners' && renderPartners()}
          {activeTab === 'wallet' && renderWallet()}
          {activeTab === 'profile' && renderProfile()}
        </div>
      </div>

      {showQRModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-ejn-petrol/60 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-white w-full max-w-[320px] rounded-[2.5rem] overflow-hidden shadow-premium animate-in zoom-in-95 duration-500">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="mb-6"><h4 className="text-xl font-title text-ejn-petrol">Apresente ao Parceiro</h4><p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">Código Individual</p></div>
              <div className="bg-white p-4 rounded-3xl border-2 border-ejn-lime mb-6"><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EJN-VALIDO-123" alt="QR Code" className="w-[140px] h-[140px]" /></div>
              <div className="flex items-center gap-2 mb-8 text-ejn-petrol font-bold text-xs uppercase tracking-widest"><Clock size={14} className="text-ejn-lime" /><span>Expira em <span className="font-mono text-ejn-lime">{formatTime(timeLeft)}</span></span></div>
              <button onClick={() => setShowQRModal(false)} className="w-full bg-ejn-petrol text-white py-4 rounded-2xl font-title text-base shadow-xl active:scale-95 transition-all">FECHAR</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriberView;
