import { restaurante } from "../config/configHandler";
import { Cart } from "../interfaces/ICart";
import {
  Adicional,
  Categoria,
  Produto,
} from "../interfaces/IRestauranteConfig";
import { formatarValor } from "./moneyUtils";

export const formatCategorias = (
  categorias: Categoria[],
  backOption = false
) => {
  const categoriasMapeadas = categorias.map(
    (categoria, index) => `${index + 1}) ${categoria.nome}`
  );
  if (backOption) categoriasMapeadas.push("0) Voltar");
  return categoriasMapeadas.join("\n");
};
export const formatProduto = (produtos: Produto[], backOption = false) => {
  const categoriasMapeadas = produtos.map(
    (produto, index) => `${index + 1}) ${produto.nome} (${formatarValor(produto.valor)})`
  );
  if (backOption) categoriasMapeadas.push("0) Voltar");
  return categoriasMapeadas.join("\n");
};
export const formatAdicionais = (
  adicionais: Adicional[] | undefined,
  options = true,
  backOption = false
) => {
  const adicionaisMapeados =
    adicionais && adicionais.length > 0
      ? adicionais.map((adicional, index) => {
          if (options)
            return `${index + 1}) ${adicional.nome} (${formatarValor(adicional.valor)})`;
          else return `- ${adicional.nome} (${formatarValor(adicional.valor)})`;
        })
      : ["Sem adicionais selecionados"];
  if (backOption) adicionaisMapeados.push("0) Voltar");
  return adicionaisMapeados.join("\n");
};

export const gerarResumoCarrinhoComValoresSemAdicionais = (carrinho: Cart) => {
  return carrinho.produtos.map(produto => {
    const valorProdutoFormatado = formatarValor(calcularValorProdutoComAdicionais(produto));
    return `- ${produto.nome} (${valorProdutoFormatado})`;
  }).join("\n");
}

export const gerarResumoCarrinhoSemValoresComAdicionais = (carrinho: Cart) => {
  return carrinho.produtos.map(produto => {
    const resumoProduto = `-${produto.nome}\n`;
    const resumoAdicionais = produto.adicionais?.map(adicional => {
      return `\t-${adicional.nome}`;
    }).join("\n") || "";
    return resumoProduto.concat(resumoAdicionais);
  }).join("\n");
}

export const getProdutoSelected = (
  selecionado: number | null,
  opcoes: Produto[]
) => {
  if (!selecionado) return null;
  return opcoes[selecionado - 1];
};

export const getCategoriaSelected = (
  selecionado: number | null,
  opcoes: Categoria[]
) => {
  if (!selecionado) return null;
  return opcoes[selecionado - 1];
};

export const getAdicionalSelected = (
  selecionado: number | null,
  opcoes: Adicional[]
) => {
  if (!selecionado) return null;
  return opcoes[selecionado - 1];
};

export const getCategorias = () => {
  return restaurante.categorias;
};

export const calcularValorProdutoComAdicionais = (produto: Produto) => {
  const valorAdcionais = produto.adicionais?.reduce((acc, curr) => acc += curr.valor, 0) || 0;
  return produto.valor + valorAdcionais;
}