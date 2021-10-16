export enum FormasPagamento {
  DINHEIRO = "Dinheiro",
  CARTAO = "Cartão",
}

export const InstrucoesFormaPagamento: Record<FormasPagamento, string> = {
  [FormasPagamento.DINHEIRO]: "Troco para quantos reais?",
  [FormasPagamento.CARTAO]: "Qual a bandeira do cartão?",
}