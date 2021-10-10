import { restaurante } from "../config/configHandler";
import { Categoria, Produto } from "../interfaces/IRestauranteConfig";

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
