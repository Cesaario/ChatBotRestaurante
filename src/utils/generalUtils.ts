import {
  PLACEHOLDER_ENDERECO,
  PLACEHOLDER_FORMA_PAGAMENTO,
  PLACEHOLDER_NUMERO_CLIENTE,
  PLACEHOLDER_RESUMO_PEDIDO,
  PLACEHOLDER_VALOR,
  RESUMO_PEDIDO,
} from "../constants/Messages";
import { Cart } from "../interfaces/ICart";
import { Pagamento } from "../stages/StagePagamento";
import { calcularValorProdutoComAdicionais, gerarResumoCarrinhoSemValoresComAdicionais } from "./cardapioUtils";
import { formatFormaPagamento } from "./messageUtils";
import { formatarValor } from "./moneyUtils";

interface ResumoPedidoProps {
  user: string;
  carrinho: Cart;
  endereco: string;
  formaPagamento: Pagamento;
}

export const gerarResumoPedido = (props: ResumoPedidoProps) => {
  const resumoCarrinho = gerarResumoCarrinhoSemValoresComAdicionais(
    props.carrinho
  );
  const formaPagamento = formatFormaPagamento(props.formaPagamento);

  return RESUMO_PEDIDO.replace(PLACEHOLDER_NUMERO_CLIENTE, props.user)
    .replace(PLACEHOLDER_RESUMO_PEDIDO, resumoCarrinho)
    .replace(PLACEHOLDER_ENDERECO, props.endereco)
    .replace(PLACEHOLDER_FORMA_PAGAMENTO, formaPagamento)
    .replace(PLACEHOLDER_VALOR, formatarValor(calcularValorPedido(props.carrinho)))
};

export const calcularValorPedido = (carrinho: Cart) => {
  const valorProdutos = carrinho.produtos.reduce((acc, produto) => {
    return acc + calcularValorProdutoComAdicionais(produto);
  }, 0);
  return valorProdutos + carrinho.taxaEntrega;
};
