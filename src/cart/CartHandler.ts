import { Cart } from "../interfaces/ICart";
import { Produto } from "../interfaces/IRestauranteConfig";

const Carts: Map<string, Cart> = new Map();

export const getUserCart = (user: string) => {
  if (!Carts.has(user)) Carts.set(user, { produtos: [], taxaEntrega: 0 });
  return Carts.get(user)!;
};

export const addProductToCart = (user: string, produto: Produto) => {
  const { produtos } = getUserCart(user);
  produtos.push(produto);
};

export const setTaxaEntrega = (user: string, valor: number) => {
  getUserCart(user).taxaEntrega = valor;
}