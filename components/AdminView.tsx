
import React, { useState, useRef } from 'react';
import { 
  Users, TicketCheck, TrendingUp, Trophy, ArrowUpRight, MapPin, 
  Calendar, Filter, LayoutDashboard, Store, UserCircle, LogOut,
  Plus, Search, Edit3, Trash2, ShieldCheck, ShieldAlert, Camera, Save, Lock as LockIcon,
  X, Check
} from 'lucide-react';

interface Props {
  onLogout: () => void;
}

type AdminSection = 'overview' | 'jovens' | 'parceiros' | 'perfil';

interface Jovem {
  id: number;
  name: string;
  cpf: string;
  status: 'ACTIVE' | 'INACTIVE';
  email: string;
  img: string;
}

interface Parceiro {
  id: number;
  name: string;
  category: string;
  benefit: string;
  status: 'ACTIVE' | 'INACTIVE';
  img: string;
}

const AdminView: React.FC<Props> = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');

  // --- ESTADO DO BANCO DE DADOS LOCAL ---
  const [jovens, setJovens] = useState<Jovem[]>([
    { id: 1, name: 'Ana Oliveira', cpf: '456.***.***-11', status: 'ACTIVE', email: 'ana@email.com', img: 'https://i.pravatar.cc/150?u=ana' },
    { id: 2, name: 'Bruno Santos', cpf: '789.***.***-22', status: 'INACTIVE', email: 'bruno@email.com', img: 'https://i.pravatar.cc/150?u=bruno' },
    { id: 3, name: 'Carla Dias', cpf: '101.***.***-33', status: 'ACTIVE', email: 'carla@email.com', img: 'https://i.pravatar.cc/150?u=carla' },
  ]);

  const [parceiros, setParceiros] = useState<Parceiro[]>([
    { id: 1, name: 'Burger King', category: 'Alimentação', benefit: '20% OFF', status: 'ACTIVE', img: 'https://picsum.photos/100?random=50' },
    { id: 2, name: 'SmartFit', category: 'Saúde', benefit: 'Isenção Taxa', status: 'ACTIVE', img: 'https://picsum.photos/100?random=51' },
    { id: 3, name: 'Cinemark', category: 'Lazer', benefit: 'Meia Entrada', status: 'INACTIVE', img: 'https://picsum.photos/100?random=52' },
  ]);

  // --- ESTADOS DE MODAIS E EDIÇÃO ---
  const [modalJovem, setModalJovem] = useState<{ open: boolean, data: Partial<Jovem> | null }>({ open: false, data: null });
  const [modalParceiro, setModalParceiro] = useState<{ open: boolean, data: Partial<Parceiro> | null }>({ open: false, data: null });

  // --- FUNÇÕES CRUD JOVENS ---
  const handleSaveJovem = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const cpf = formData.get('cpf') as string;

    if (modalJovem.data?.id) {
      setJovens(jovens.map(j => j.id === modalJovem.data!.id ? { ...j, name, email, cpf } : j));
    } else {
      const newJovem: Jovem = {
        id: Date.now(),
        name,
        email,
        cpf,
        status: 'ACTIVE',
        img: `https://i.pravatar.cc/150?u=${Date.now()}`
      };
      setJovens([newJovem, ...jovens]);
    }
    setModalJovem({ open: false, data: null });
  };

  const deleteJovem = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este jovem?')) {
      setJovens(jovens.filter(j => j.id !== id));
    }
  };

  const toggleStatusJovem = (id: number) => {
    setJovens(jovens.map(j => j.id === id ? { ...j, status: j.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : j));
  };

  // --- FUNÇÕES CRUD PARCEIROS ---
  const handleSaveParceiro = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const benefit = formData.get('benefit') as string;

    if (modalParceiro.data?.id) {
      setParceiros(parceiros.map(p => p.id === modalParceiro.data!.id ? { ...p, name, category, benefit } : p));
    } else {
      const newParceiro: Parceiro = {
        id: Date.now(),
        name,
        category,
        benefit,
        status: 'ACTIVE',
        img: `https://picsum.photos/100?random=${Date.now()}`
      };
      setParceiros([newParceiro, ...parceiros]);
    }
    setModalParceiro({ open: false, data: null });
  };

  const deleteParceiro = (id: number) => {
    if (confirm('Deseja realmente remover este parceiro da rede?')) {
      setParceiros(parceiros.filter(p => p.id !== id));
    }
  };

  const toggleStatusParceiro = (id: number) => {
    setParceiros(parceiros.map(p => p.id === id ? { ...p, status: p.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : p));
  };

  // --- PERFIL DO GESTOR ---
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [adminProfile, setAdminProfile] = useState({
    name: 'Carlos Gestor',
    email: 'carlos@ejnbeneficios.com.br',
    photo: '',
    role: 'Administrador Master'
  });
  const [tempAdminData, setTempAdminData] = useState({ ...adminProfile });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const NavItem = ({ section, icon: Icon, label }: { section: AdminSection, icon: any, label: string }) => (
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

  const renderOverview = () => (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-title text-ejn-petrol tracking-tight">Visão Geral</h2>
          <p className="text-[11px] lg:text-xs text-gray-500 font-medium">Indicadores de impacto e crescimento da rede.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex-1 lg:flex-none bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-[10px] lg:text-[11px] font-bold text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
            <Filter size={14} /> Filtrar
          </button>
          <button className="flex-1 lg:flex-none bg-ejn-petrol text-white px-5 py-2.5 rounded-xl text-[10px] lg:text-[11px] font-bold flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-all">
            <Calendar size={14} /> Relatórios
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {[
          { label: 'Total Assinantes', value: jovens.length.toString(), icon: <Users size={20} />, trend: '+12%', color: 'bg-blue-600' },
          { label: 'Validados Hoje', value: '84', icon: <TicketCheck size={20} />, trend: '+5%', color: 'bg-ejn-lime' },
          { label: 'Rede Ativa', value: parceiros.length.toString(), icon: <Store size={20} />, trend: '+18%', color: 'bg-ejn-petrol' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-5 lg:p-7 rounded-[1.5rem] lg:rounded-[2.5rem] border border-gray-100 shadow-soft flex items-center justify-between group hover:border-ejn-lime/30 transition-all">
            <div className="flex items-center gap-4 lg:gap-5">
              <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center text-white ${stat.color} ${stat.color === 'bg-ejn-lime' ? '!text-ejn-petrol' : ''}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[9px] lg:text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-xl lg:text-3xl font-title text-ejn-petrol">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-12 bg-white rounded-[1.5rem] lg:rounded-[2.5rem] border border-gray-100 shadow-soft p-5 lg:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-ejn-lime/10 rounded-lg text-ejn-petrol">
              <Trophy size={18} />
            </div>
            <h3 className="text-base lg:text-lg font-title text-ejn-petrol">Rede de Parceiros</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parceiros.slice(0, 6).map((partner, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between rounded-2xl border border-gray-50 hover:bg-ejn-soft/50 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-100">
                    <img src={partner.img} alt={partner.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-ejn-petrol text-xs">{partner.name}</p>
                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{partner.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-title text-ejn-lime">{partner.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const renderJovens = () => (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h2 className="text-xl lg:text-2xl font-title text-ejn-petrol tracking-tight">Gerenciar Jovens</h2>
          <p className="text-[11px] lg:text-xs text-gray-500 font-medium">Controle total dos assinantes da plataforma.</p>
        </div>
        <button 
          onClick={() => setModalJovem({ open: true, data: null })}
          className="w-full md:w-auto bg-ejn-lime text-ejn-petrol px-6 py-3 rounded-2xl font-black text-[10px] lg:text-[11px] uppercase tracking-widest shadow-lg shadow-ejn-lime/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all"
        >
          <Plus size={16} /> Novo Jovem
        </button>
      </div>

      <div className="bg-white rounded-[1.5rem] lg:rounded-[2.5rem] border border-gray-100 shadow-soft overflow-hidden">
        <div className="p-4 lg:p-6 border-b border-gray-50">
          <div className="relative w-full max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <input 
              type="text" 
              placeholder="Buscar por nome, CPF ou e-mail..."
              className="w-full bg-ejn-soft border-2 border-transparent focus:border-ejn-lime/30 focus:bg-white outline-none rounded-xl lg:rounded-2xl py-2.5 pl-11 pr-4 text-[11px] lg:text-xs font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-ejn-soft/30 text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-6 lg:px-8 py-4 lg:py-5">Jovem / Identificação</th>
                <th className="px-6 lg:px-8 py-4 lg:py-5">CPF</th>
                <th className="px-6 lg:px-8 py-4 lg:py-5">Status</th>
                <th className="px-6 lg:px-8 py-4 lg:py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {jovens.map((jovem) => (
                <tr key={jovem.id} className="hover:bg-ejn-soft/20 transition-colors group">
                  <td className="px-6 lg:px-8 py-4 lg:py-5">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                        <img src={jovem.img} alt={jovem.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-ejn-petrol text-xs lg:text-sm truncate max-w-[150px]">{jovem.name}</p>
                        <p className="text-[9px] lg:text-[10px] text-gray-400 font-medium truncate max-w-[150px]">{jovem.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 lg:px-8 py-4 lg:py-5 text-[10px] lg:text-xs font-mono text-gray-500">{jovem.cpf}</td>
                  <td className="px-6 lg:px-8 py-4 lg:py-5">
                    <button 
                      onClick={() => toggleStatusJovem(jovem.id)}
                      className={`px-2.5 lg:px-3 py-1 rounded-full text-[8px] lg:text-[9px] font-black uppercase tracking-widest border transition-all hover:scale-105 active:scale-95 ${
                        jovem.status === 'ACTIVE' 
                        ? 'bg-green-50 text-green-600 border-green-100' 
                        : 'bg-red-50 text-red-600 border-red-100'
                      }`}
                    >
                      {jovem.status === 'ACTIVE' ? 'Ativo' : 'Bloqueado'}
                    </button>
                  </td>
                  <td className="px-6 lg:px-8 py-4 lg:py-5 text-right">
                    <div className="flex items-center justify-end gap-2 lg:gap-3">
                      <button 
                        onClick={() => setModalJovem({ open: true, data: jovem })}
                        className="p-2 text-gray-400 hover:text-ejn-petrol hover:bg-white rounded-lg lg:rounded-xl shadow-sm transition-all"
                      >
                        <Edit3 size={14} lg:size={16} />
                      </button>
                      <button 
                        onClick={() => deleteJovem(jovem.id)}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg lg:rounded-xl shadow-sm transition-all"
                      >
                        <Trash2 size={14} lg:size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderParceiros = () => (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h2 className="text-xl lg:text-2xl font-title text-ejn-petrol tracking-tight">Gerenciar Parceiros</h2>
          <p className="text-[11px] lg:text-xs text-gray-500 font-medium">Rede de benefícios do EJN.</p>
        </div>
        <button 
          onClick={() => setModalParceiro({ open: true, data: null })}
          className="w-full md:w-auto bg-ejn-petrol text-white px-6 py-3 rounded-2xl font-black text-[10px] lg:text-[11px] uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all"
        >
          <Plus size={16} /> Novo Parceiro
        </button>
      </div>

      <div className="bg-white rounded-[1.5rem] lg:rounded-[2.5rem] border border-gray-100 shadow-soft overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-ejn-soft/30 text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-6 lg:px-8 py-4 lg:py-5">Empresa / Categoria</th>
                <th className="px-6 lg:px-8 py-4 lg:py-5">Benefício</th>
                <th className="px-6 lg:px-8 py-4 lg:py-5">Status</th>
                <th className="px-6 lg:px-8 py-4 lg:py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {parceiros.map((p) => (
                <tr key={p.id} className="hover:bg-ejn-soft/20 transition-colors group">
                  <td className="px-6 lg:px-8 py-4 lg:py-5">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl overflow-hidden border border-gray-50 shadow-sm bg-white flex-shrink-0">
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-ejn-petrol text-xs lg:text-sm truncate max-w-[150px]">{p.name}</p>
                        <p className="text-[9px] lg:text-[10px] text-gray-400 font-medium truncate max-w-[150px]">{p.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 lg:px-8 py-4 lg:py-5 font-bold text-ejn-lime text-[10px] lg:text-xs uppercase tracking-widest">{p.benefit}</td>
                  <td className="px-6 lg:px-8 py-4 lg:py-5">
                    <button 
                      onClick={() => toggleStatusParceiro(p.id)}
                      className={`px-2.5 lg:px-3 py-1 rounded-full text-[8px] lg:text-[9px] font-black uppercase tracking-widest border transition-all hover:scale-105 active:scale-95 ${
                        p.status === 'ACTIVE' 
                        ? 'bg-green-50 text-green-600 border-green-100' 
                        : 'bg-red-50 text-red-600 border-red-100'
                      }`}
                    >
                      {p.status === 'ACTIVE' ? 'Ativo' : 'Pausado'}
                    </button>
                  </td>
                  <td className="px-6 lg:px-8 py-4 lg:py-5 text-right">
                    <div className="flex items-center justify-end gap-2 lg:gap-3">
                      <button 
                        onClick={() => setModalParceiro({ open: true, data: p })}
                        className="p-2 text-gray-400 hover:text-ejn-petrol hover:bg-white rounded-lg lg:rounded-xl shadow-sm transition-all"
                      >
                        <Edit3 size={14} lg:size={16} />
                      </button>
                      <button 
                        onClick={() => deleteParceiro(p.id)}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg lg:rounded-xl shadow-sm transition-all"
                      >
                        <Trash2 size={14} lg:size={16} />
                      </button>
                    </div>
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
    <div className="max-w-2xl mx-auto space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-top-4 duration-700 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-title text-ejn-petrol tracking-tight">Meu Perfil Gestor</h2>
          <p className="text-[11px] lg:text-xs text-gray-400 font-medium">Gerencie suas credenciais administrativas.</p>
        </div>
        {!isEditingProfile ? (
          <button 
            onClick={() => {
              setTempAdminData({ ...adminProfile });
              setIsEditingProfile(true);
            }}
            className="w-full sm:w-auto bg-ejn-petrol text-white px-5 py-2.5 rounded-xl lg:rounded-2xl font-bold text-[10px] lg:text-[11px] uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
          >
            Editar Perfil
          </button>
        ) : (
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={() => setIsEditingProfile(false)}
              className="flex-1 sm:flex-none bg-gray-100 text-gray-500 px-5 py-2.5 rounded-xl lg:rounded-2xl font-bold text-[10px] lg:text-[11px] uppercase tracking-widest hover:bg-gray-200 transition-all"
            >
              Cancelar
            </button>
            <button 
              onClick={() => {
                setAdminProfile({ ...tempAdminData });
                setIsEditingProfile(false);
                alert('Perfil administrativo atualizado!');
              }}
              className="flex-1 sm:flex-none bg-ejn-petrol text-white px-5 py-2.5 rounded-xl lg:rounded-2xl font-bold text-[10px] lg:text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
            >
              <Save size={14} /> Salvar
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[1.5rem] lg:rounded-[2.5rem] shadow-premium border border-gray-100 overflow-hidden p-6 lg:p-10">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-10 items-center md:items-start">
          <div className="relative group flex-shrink-0">
             <div 
               onClick={() => isEditingProfile && fileInputRef.current?.click()}
               className={`w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-ejn-soft shadow-soft relative transition-all ${isEditingProfile ? 'cursor-pointer ring-4 ring-ejn-lime/30 group-hover:opacity-80' : ''}`}
             >
                {tempAdminData.photo || adminProfile.photo ? (
                  <img src={isEditingProfile ? tempAdminData.photo : adminProfile.photo} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-ejn-soft flex items-center justify-center text-ejn-petrol">
                    <UserCircle size={48} strokeWidth={1.5} />
                  </div>
                )}
                
                {isEditingProfile && (
                  <div className="absolute inset-0 bg-ejn-petrol/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={24} className="mb-1" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Alterar</span>
                  </div>
                )}
             </div>
             <input type="file" ref={fileInputRef} onChange={(e) => {
               const file = e.target.files?.[0];
               if (file) {
                 const reader = new FileReader();
                 reader.onloadend = () => setTempAdminData(prev => ({ ...prev, photo: reader.result as string }));
                 reader.readAsDataURL(file);
               }
             }} accept="image/*" className="hidden" />
          </div>

          <div className="flex-1 w-full space-y-5 lg:space-y-6">
             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nome Completo</label>
                {isEditingProfile ? (
                  <input 
                    type="text" 
                    value={tempAdminData.name}
                    onChange={(e) => setTempAdminData({...tempAdminData, name: e.target.value})}
                    className="w-full bg-ejn-soft border-2 border-transparent focus:border-ejn-lime/50 focus:bg-white outline-none rounded-xl lg:rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol transition-all"
                  />
                ) : (
                  <div className="bg-white border border-gray-100 rounded-xl lg:rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol shadow-soft truncate">{adminProfile.name}</div>
                )}
             </div>

             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">E-mail Institucional</label>
                {isEditingProfile ? (
                  <input 
                    type="email" 
                    value={tempAdminData.email}
                    onChange={(e) => setTempAdminData({...tempAdminData, email: e.target.value})}
                    className="w-full bg-ejn-soft border-2 border-transparent focus:border-ejn-lime/50 focus:bg-white outline-none rounded-xl lg:rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol transition-all"
                  />
                ) : (
                  <div className="bg-white border border-gray-100 rounded-xl lg:rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol shadow-soft truncate">{adminProfile.email}</div>
                )}
             </div>

             <div className="space-y-1.5 opacity-60">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nível de Acesso (Travado)</label>
                <div className="bg-gray-50 border border-gray-200 rounded-xl lg:rounded-2xl py-3.5 px-6 font-bold text-gray-400 flex items-center justify-between cursor-not-allowed">
                  {adminProfile.role}
                  <LockIcon size={14} />
                </div>
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
        <div className="mb-8 flex flex-col items-center">
          <img src="https://i.imgur.com/8KTBmcm.png" alt="Logo EJN" className="h-20 w-auto object-contain" />
          <div className="w-full h-px bg-gray-50 mt-8"></div>
        </div>
        <div className="flex-1 space-y-2">
          <NavItem section="overview" icon={LayoutDashboard} label="Visão Geral" />
          <NavItem section="jovens" icon={Users} label="Gerenciar Jovens" />
          <NavItem section="parceiros" icon={Store} label="Gerenciar Parceiros" />
          <NavItem section="perfil" icon={UserCircle} label="Meu Perfil" />
        </div>
        <div className="mt-auto pt-6 border-t border-gray-50">
           <button onClick={onLogout} className="w-full flex items-center gap-3 p-4 rounded-2xl font-bold text-xs text-red-400 hover:bg-red-50 transition-all">
             <LogOut size={18} strokeWidth={2.5} /> Sair
           </button>
        </div>
      </nav>

      {/* 2. BOTTOM NAV MOBILE */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 flex items-center justify-around p-3 z-50 shadow-2xl">
        {[
          { id: 'overview', label: 'Visão', icon: LayoutDashboard },
          { id: 'jovens', label: 'Jovens', icon: Users },
          { id: 'parceiros', label: 'Parceiros', icon: Store },
          { id: 'perfil', label: 'Perfil', icon: UserCircle }
        ].map((item) => (
          <button key={item.id} onClick={() => setActiveSection(item.id as AdminSection)} className={`flex flex-col items-center gap-1 transition-all ${activeSection === item.id ? 'text-ejn-lime' : 'text-gray-400'}`}>
            <item.icon size={18} strokeWidth={activeSection === item.id ? 3 : 2} />
            <span className="text-[9px] font-bold">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* 3. ÁREA DE CONTEÚDO PRINCIPAL */}
      <main className="flex-1 min-h-screen transition-all duration-300 ml-0 lg:ml-64 pb-24 lg:pb-0 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-8 lg:pt-10">
          {activeSection === 'overview' && renderOverview()}
          {activeSection === 'jovens' && renderJovens()}
          {activeSection === 'parceiros' && renderParceiros()}
          {activeSection === 'perfil' && renderProfile()}
        </div>
      </main>

      {/* MODAL JOVEM */}
      {modalJovem.open && (
        <div className="fixed inset-0 z-[300] bg-ejn-petrol/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-[95%] md:w-1/2 max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 lg:p-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-title text-ejn-petrol">{modalJovem.data?.id ? 'Editar Jovem' : 'Novo Jovem'}</h3>
                <button onClick={() => setModalJovem({ open: false, data: null })} className="p-2 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"><X size={20}/></button>
              </div>
              <form onSubmit={handleSaveJovem} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nome Completo</label>
                  <input name="name" defaultValue={modalJovem.data?.name || ''} required className="w-full bg-ejn-soft border-2 border-transparent focus:border-ejn-lime focus:bg-white outline-none rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">E-mail</label>
                  <input name="email" type="email" defaultValue={modalJovem.data?.email || ''} required className="w-full bg-ejn-soft border-2 border-transparent focus:border-ejn-lime focus:bg-white outline-none rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">CPF</label>
                  <input name="cpf" defaultValue={modalJovem.data?.cpf || ''} required placeholder="000.000.000-00" className="w-full bg-ejn-soft border-2 border-transparent focus:border-ejn-lime focus:bg-white outline-none rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol transition-all" />
                </div>
                <button type="submit" className="w-full bg-ejn-petrol text-white py-4 rounded-2xl font-title text-base shadow-xl flex items-center justify-center gap-2 mt-4 hover:shadow-ejn-petrol/30 transition-all">
                  <Check size={20} /> SALVAR DADOS
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARCEIRO */}
      {modalParceiro.open && (
        <div className="fixed inset-0 z-[300] bg-ejn-petrol/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-[95%] md:w-1/2 max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 lg:p-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-title text-ejn-petrol">{modalParceiro.data?.id ? 'Editar Parceiro' : 'Novo Parceiro'}</h3>
                <button onClick={() => setModalParceiro({ open: false, data: null })} className="p-2 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"><X size={20}/></button>
              </div>
              <form onSubmit={handleSaveParceiro} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nome da Empresa</label>
                  <input name="name" defaultValue={modalParceiro.data?.name || ''} required className="w-full bg-ejn-soft border-2 border-transparent focus:border-ejn-lime focus:bg-white outline-none rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Categoria</label>
                  <select name="category" defaultValue={modalParceiro.data?.category || 'Alimentação'} className="w-full bg-ejn-soft border-2 border-transparent focus:border-ejn-lime focus:bg-white outline-none rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol transition-all">
                    <option>Alimentação</option>
                    <option>Saúde</option>
                    <option>Lazer</option>
                    <option>Educação</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Benefício Oferecido</label>
                  <input name="benefit" defaultValue={modalParceiro.data?.benefit || ''} required placeholder="Ex: 20% OFF" className="w-full bg-ejn-soft border-2 border-transparent focus:border-ejn-lime focus:bg-white outline-none rounded-2xl py-3.5 px-6 font-bold text-ejn-petrol transition-all" />
                </div>
                <button type="submit" className="w-full bg-ejn-lime text-ejn-petrol py-4 rounded-2xl font-title text-base shadow-xl flex items-center justify-center gap-2 mt-4 hover:shadow-ejn-lime/30 transition-all">
                  <Check size={20} /> CADASTRAR PARCEIRO
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AdminView;
