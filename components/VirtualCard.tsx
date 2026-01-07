
import React from 'react';
import { UserData } from '../types';

interface Props {
  user: UserData;
}

const VirtualCard: React.FC<Props> = ({ user }) => {
  /**
   * URLs dos Mockups atualizados para Imgur para evitar problemas de CORS.
   * Estes links apontam diretamente para os arquivos de imagem.
   */
  const imgFeminina = 'https://i.imgur.com/AiMNfkM.jpeg';
  const imgMasculina = 'https://i.imgur.com/qp1wPRC.jpeg';

  // Lógica de seleção por gênero: masculino ou feminino
  const imgSrc = user.gender === 'feminino' ? imgFeminina : imgMasculina;

  return (
    <div className="w-full mx-auto block px-2">
      <div className="relative group transition-all duration-500">
        {/* 
          A imagem possui agora as classes exatas solicitadas para controle de escala.
          mx-auto garante a centralização e max-w trava o tamanho em telas grandes.
        */}
        <img 
          src={imgSrc} 
          alt="Cartão EJN Benefícios"
          className="w-full h-auto max-w-[340px] md:max-w-[380px] lg:max-w-[400px] mx-auto block shadow-2xl rounded-2xl transition-transform hover:scale-105 object-contain"
          loading="eager"
          onError={(e) => {
            console.error("Erro ao carregar imagem do cartão EJN via Imgur");
            // Fallback para um placeholder colorido caso o Imgur falhe
            e.currentTarget.src = 'https://via.placeholder.com/600x380/002E2C/A4DF02?text=EJN+BENEFÍCIOS+ID';
          }}
        />
        
        {/* 
          Overlay Container: sincronizado com o tamanho da imagem para manter
          os efeitos de reflexo e profundidade alinhados perfeitamente.
        */}
        <div className="absolute inset-0 max-w-[340px] md:max-w-[380px] lg:max-w-[400px] mx-auto rounded-2xl overflow-hidden pointer-events-none">
          {/* Efeito de Overlay para profundidade visual (Estilo Apple) */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"></div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-black/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Efeito de Reflexo "Glossy" dinâmico */}
          <div className="absolute -inset-full top-0 h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shine_1.8s_ease-in-out]"></div>
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 150%; }
        }
      `}</style>
    </div>
  );
};

export default VirtualCard;
