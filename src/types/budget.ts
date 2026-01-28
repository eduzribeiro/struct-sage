export interface BudgetFormData {
  // Identificação
  obraName: string;
  obraLocal: string;
  clienteName: string;
  clienteEmail: string;
  
  // Escopo
  escopoServico: string;
  
  // Dados técnicos
  areaConstruida: number | null;
  numElementosEstruturais: number | null;
  areaContencao: number | null;
  
  // Tipos
  tipoFundacao: string[];
  tipoEstrutura: string[];
  tipoContencao: string[];
  
  // Configurações
  nivelComplexidade: '01' | '02' | '03';
  pavimentosTipo: boolean;
  visitaTecnica: boolean;
  horasVisita: number;
}

export interface CalculatedBudget {
  infraestruturaFundacoes: {
    descricao: string;
    valor: number;
  } | null;
  infraestruturaContencoes: {
    descricao: string;
    valor: number;
  } | null;
  superestrutura: {
    descricao: string;
    valor: number;
    valorOriginal?: number;
    descontoPavimentoTipo?: number;
  } | null;
  visitaTecnica: {
    descricao: string;
    valor: number;
  } | null;
  subtotal: number;
  descontoAVista: number;
  total: number;
  totalAVista: number;
  entrada: number;
  saldo: number;
}

export interface CompanyInfo {
  name: string;
  subtitle: string;
  email: string;
  website: string;
  instagram: string;
  phone: string;
  director: string;
  directorTitle: string;
  crea: string;
}

export const FUNDACAO_OPTIONS = [
  { value: 'sapatas', label: 'Fundação rasa por sapatas isoladas e/ou associadas' },
  { value: 'radier', label: 'Fundação rasa por radier' },
  { value: 'escavadas', label: 'Fundação profunda por estacas escavadas' },
  { value: 'helice', label: 'Fundação profunda por hélice contínua' },
  { value: 'metalicas', label: 'Fundação profunda por estacas metálicas' },
];

export const ESTRUTURA_OPTIONS = [
  { value: 'concreto', label: 'Estrutura em concreto armado' },
  { value: 'alvenaria', label: 'Estrutura em alvenaria estrutural' },
  { value: 'metalica', label: 'Estruturas metálicas' },
];

export const CONTENCAO_OPTIONS = [
  { value: 'bloco', label: 'Contenção por bloco de concreto preenchido com concreto' },
  { value: 'cortina', label: 'Contenção por cortinas de estacas' },
];

export const COMPLEXIDADE_OPTIONS = [
  { value: '01', label: 'Nível 01 - Baixa complexidade', multiplicador: 1000 },
  { value: '02', label: 'Nível 02 - Média complexidade', multiplicador: 1500 },
  { value: '03', label: 'Nível 03 - Alta complexidade', multiplicador: 2000 },
];

export const DEFAULT_COMPANY_INFO: CompanyInfo = {
  name: 'Gama',
  subtitle: 'cálculo estrutural',
  email: 'projetos@gamaestruturas.com.br',
  website: 'www.gamaestruturas.com.br',
  instagram: 'gama_calculoestrutural',
  phone: '(35) 9 9891 6836',
  director: 'Roberto Gama',
  directorTitle: 'Engenheiro civil',
  crea: 'CREA - MG 226.714/D',
};
