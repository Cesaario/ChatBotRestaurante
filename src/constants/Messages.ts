export const PLACEHOLDER_OPTIONS = "{OPTIONS}";
export const PLACEHOLDER_NOME_PRODUTO = "{NOME_PRODUTO}";
export const PLACEHOLDER_DETALHES_PRODUTO = "{DETALHES_PRODUTO}";
export const PLACEHOLDER_ADICIONAIS = "{ADICIONAIS}";
export const PLACEHOLDER_VALOR = "{VALOR}";
export const PLACEHOLDER_RESUMO_CARRINHO = "{RESUMO_CARRINHO}";

export const STAGE_INICIO = `
Olá! Seja bem vindo(a) ao Restaurante do Sabor!
O que deseja saber?

${PLACEHOLDER_OPTIONS}
`;

export const STAGE_CARDAPIO_SELECIONADO = `
Selecione uma opção:

${PLACEHOLDER_OPTIONS}
`;

export const STAGE_CATEGORIA_SELECIONADO = `
Selecione uma opção:

${PLACEHOLDER_OPTIONS}
`;

export const STAGE_PRODUTO_SELECIONADO = `
Você selecionou "${PLACEHOLDER_NOME_PRODUTO}"
${PLACEHOLDER_DETALHES_PRODUTO}

${PLACEHOLDER_OPTIONS}
`;

export const STAGE_CONFIRMAR_PRODUTO = `
Deseja confirmar o produto?

Produto: ${PLACEHOLDER_NOME_PRODUTO}
Adicionais: ${PLACEHOLDER_ADICIONAIS}
Total: ${PLACEHOLDER_VALOR}

${PLACEHOLDER_OPTIONS}
`;

export const STAGE_CONFIRMAR_PEDIDO = `
  Confirmar ou adicionar mais?

  ${PLACEHOLDER_RESUMO_CARRINHO}

  ${PLACEHOLDER_OPTIONS}
`

export const OPCAO_INVALIDA = `
  Desculpe, essa opção não existe.
`;

export const ERRO_GENERICO = `Oops... Ocorreu um erro.`;