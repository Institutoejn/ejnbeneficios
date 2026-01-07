
import React from 'react';
import { HeartPulse, Bus, Gamepad2, GraduationCap } from 'lucide-react';
import { BenefitCategory, UserData } from './types';

export const CATEGORIES: BenefitCategory[] = [
  { id: 'health', name: 'Saúde', icon: 'HeartPulse', description: 'Consultas e exames' },
  { id: 'transport', name: 'Transporte', icon: 'Bus', description: 'Passagens e recargas' },
  { id: 'leisure', name: 'Lazer', icon: 'Gamepad2', description: 'Cinemas e eventos' },
  { id: 'edu', name: 'Educação', icon: 'GraduationCap', description: 'Cursos e livros' },
];

export const MOCK_USER: UserData = {
  name: 'Rodrigo Silva',
  cpf: '123.***.***-00',
  status: 'ACTIVE',
  gender: 'masculino'
};

export const MOCK_PARTNERS = [
  { name: 'Burger King', offer: '2 Whoppers por R$ 25', color: 'bg-orange-50', categoryId: 'leisure' },
  { name: 'Droga Raia', offer: '30% em Medicamentos', color: 'bg-red-50', categoryId: 'health' },
  { name: 'SmartFit', offer: 'Zero adesão + 1 mês grátis', color: 'bg-yellow-50', categoryId: 'health' },
  { name: 'Cinemark', offer: 'Meia entrada todos os dias', color: 'bg-blue-50', categoryId: 'leisure' },
  { name: 'Metrô SP', offer: 'Cashback na recarga', color: 'bg-gray-50', categoryId: 'transport' },
  { name: 'CNA Idiomas', offer: '50% de desconto na mensalidade', color: 'bg-emerald-50', categoryId: 'edu' },
];

export const CategoryIcon = ({ name, size = 24 }: { name: string; size?: number }) => {
  switch (name) {
    case 'HeartPulse': return <HeartPulse size={size} />;
    case 'Bus': return <Bus size={size} />;
    case 'Gamepad2': return <Gamepad2 size={size} />;
    case 'GraduationCap': return <GraduationCap size={size} />;
    default: return <HeartPulse size={size} />;
  }
};
