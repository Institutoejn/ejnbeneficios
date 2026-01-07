
export enum UserView {
  SUBSCRIBER = 'ASSINANTE',
  PARTNER = 'PARCEIRO',
  ADMIN = 'GESTOR'
}

export interface BenefitCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface UserData {
  name: string;
  cpf: string;
  status: 'ACTIVE' | 'INACTIVE';
  gender: 'masculino' | 'feminino';
}
