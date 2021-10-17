export const PLACEHOLDER_OPTIONS = "{OPTIONS}";
export const PLACEHOLDER_NOME_PRODUTO = "{NOME_PRODUTO}";
export const PLACEHOLDER_DETALHES_PRODUTO = "{DETALHES_PRODUTO}";
export const PLACEHOLDER_ADICIONAIS = "{ADICIONAIS}";
export const PLACEHOLDER_VALOR = "{VALOR}";
export const PLACEHOLDER_RESUMO_CARRINHO = "{RESUMO_CARRINHO}";
export const PLACEHOLDER_NUMERO_CLIENTE = "{PLACEHOLDER_NUMERO_CLIENTE}";
export const PLACEHOLDER_RESUMO_PEDIDO = "{PLACEHOLDER_RESUMO_PEDIDO}";
export const PLACEHOLDER_ENDERECO = "{PLACEHOLDER_ENDERECO}";
export const PLACEHOLDER_FORMA_PAGAMENTO = "{PLACEHOLDER_FORMA_PAGAMENTO}";
export const PLACEHOLDER_OBSERVACAO = "{PLACEHOLDER_OBSERVACAO}";
export const PLACEHOLDER_TELEFONE = "{PLACEHOLDER_TELEFONE}";
export const PLACEHOLDER_LOGRADOURO = "{PLACEHOLDER_LOGRADOURO}";
export const PLACEHOLDER_NUMERO = "{PLACEHOLDER_TELEFONE}";
export const PLACEHOLDER_BAIRRO = "{PLACEHOLDER_TELEFONE}";
export const PLACEHOLDER_HORARIOS = "{PLACEHOLDER_TELEFONE}";
export const PLACEHOLDER_EMAIL = "{PLACEHOLDER_TELEFONE}";

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
Adicionais:
${PLACEHOLDER_ADICIONAIS}
Observação: ${PLACEHOLDER_OBSERVACAO}

Total: ${PLACEHOLDER_VALOR}

${PLACEHOLDER_OPTIONS}
`;

export const STAGE_CONFIRMAR_PEDIDO = `
Deseja confirmar o pedido ou adicionar mais itens?

${PLACEHOLDER_RESUMO_CARRINHO}

${PLACEHOLDER_OPTIONS}
`;

export const STAGE_EXIBIR_ADICIONAIS = `
Qual adicional você deseja?

${PLACEHOLDER_OPTIONS}
`;

export const STAGE_CONFIRMAR_ADICIONAIS = `
Adicionais selecionados:

${PLACEHOLDER_ADICIONAIS}

${PLACEHOLDER_OPTIONS}
`;

export const STAGE_ENDERECO = `
Qual o seu endereço?
`;

export const OPCAO_INVALIDA = `
  Desculpe, essa opção não existe.
`;

export const ENDERECO_INVALIDO = `
  Por favor, digite um endereço válido.
`;

export const TAXA_ENTREGA = `
  Taxa de entrega: ${PLACEHOLDER_VALOR}
`;

export const FORMA_PAGAMENTO = `
Qual será o método de pagamento?

${PLACEHOLDER_OPTIONS}
`;

export const CONFIRMAR_PEDIDO = `
Deseja confirmar ou descartar o seu pedido?
  
${PLACEHOLDER_OPTIONS}
`;

export const RESUMO_PEDIDO = `
    *RESUMO PEDIDO*

Número cliente:
${PLACEHOLDER_NUMERO_CLIENTE}

Pedido:
${PLACEHOLDER_RESUMO_PEDIDO}

Endereço:
${PLACEHOLDER_ENDERECO}

Forma de pagamento:
${PLACEHOLDER_FORMA_PAGAMENTO}

Valor total:
${PLACEHOLDER_VALOR}
`

export const SUCESSO = `
Pedido realizado com sucesso!
`;

export const ENDERECO = `
Endereço do estabelecimento:
*${PLACEHOLDER_LOGRADOURO}, ${PLACEHOLDER_NUMERO} - ${PLACEHOLDER_BAIRRO}*
`;

export const HORARIO_FUNCIOMENTO = `
Horário de funcionamento do estabelecimento:

${PLACEHOLDER_HORARIOS}
`;

export const CONTATO = `
*E-Mail:* ${PLACEHOLDER_EMAIL}
*Telefone:* ${PLACEHOLDER_TELEFONE}
`;

export const OBSERVACAO = `
Digite a observação do produto
`

export const OBSERVACAO_ATUALIZADA = `
Observação atualizada!
`;

export const ERRO_GENERICO = `Oops... Ocorreu um erro.`;
