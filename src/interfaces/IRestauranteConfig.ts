export interface Restaurante {
  categorias: Categoria[];
  endereco: Endereco,
  horarioDeFuncionamento: HorarioFuncionamento[],
  contato: Contato
}

export interface Endereco {
  cep: number,
  logradouro: string,
  numero: number,
  bairro: string
}

export interface HorarioFuncionamento {
  dia: string,
  abertura: string,
  fechamento: string
}

export interface Contato {
  telefone: string,
  email: string,
}

export interface Categoria {
  nome: string;
  produtos: Produto[];
}

export interface Produto {
  nome: string;
  desc: string | undefined;
  valor: number;
  adicionais: Adicional[] | undefined;
  observacao: string | undefined;
}

export interface Adicional {
  nome: string;
  valor: number;
}
