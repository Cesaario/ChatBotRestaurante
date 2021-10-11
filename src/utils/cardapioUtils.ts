import { restaurante } from "../config/configHandler";
import {
  Adicional,
  Categoria,
  Produto,
} from "../interfaces/IRestauranteConfig";

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
    (produto, index) => `${index + 1}) ${produto.nome} (${produto.valor})`
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
            return `${index + 1}) ${adicional.nome} (${adicional.valor})`;
          else return `- ${adicional.nome} (${adicional.valor})`;
        })
      : ["Sem adicionais selecionados"];
  if (backOption) adicionaisMapeados.push("0) Voltar");
  return adicionaisMapeados.join("\n");
};

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

export const getCategorias = () => {
  return restaurante.categorias;
};
