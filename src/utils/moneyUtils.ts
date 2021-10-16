const formatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export const formatarValor = (valor: number) => formatter.format(valor);
