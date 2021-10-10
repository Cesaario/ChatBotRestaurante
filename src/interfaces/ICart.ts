import { Produto } from "./IRestauranteConfig";

export interface Cart {
  produtos: Produto[];
  taxaEntrega: number;
}
