export interface Restaurante {
  categorias: Categoria[];
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
}

export interface Adicional {
  nome: string;
  valor: number;
}
