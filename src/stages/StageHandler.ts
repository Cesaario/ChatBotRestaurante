import { Stages } from "../constants/StagesEnum";
import { StageOption } from "../interfaces/IStageOptions";
import StageAdicionarConfirmarProdutos from "./StageAdicionarConfirmarProdutos";
import StageCardapioSelecionado from "./StageCardapioSelecionado";
import StageCategoriaSelecionada from "./StageCategoriaSelecionada";
import StageConfirmarAdicionais from "./StageConfirmarAdicionais";
import StageConfirmarProduto from "./StageConfirmarProduto";
import StageEndereco from "./StageEndereco";
import StageExibirAdicionais from "./StageExibirAdicionais";
import StageInicio from "./StageInicio";
import StagePagamento from "./StagePagamento";
import StageProdutoSelecionado from "./StageProdutoSelecionado";

export const StageSolvers: Partial<
  Record<Stages, (user: string, message?: string) => void>
> = {
  //TODO: REMOVER PARTIAL QUANDO FINALIZAR
  [Stages.INICIO]: StageInicio,
  [Stages.CARDAPIO_SELECIONADO]: StageCardapioSelecionado,
  [Stages.CATEGORIA_SELECIONADA]: StageCategoriaSelecionada,
  [Stages.PRODUTO_SELECIONADO]: StageProdutoSelecionado,
  [Stages.CONFIRMAR_PRODUTO]: StageConfirmarProduto,
  [Stages.ADICIONAR_CONFIRMAR_PRODUTOS]: StageAdicionarConfirmarProdutos,
  [Stages.EXIBIR_ADICIONAIS]: StageExibirAdicionais,
  [Stages.CONFIRMAR_ADICIONAIS]: StageConfirmarAdicionais,
  [Stages.ENDERECO]: StageEndereco,
  [Stages.PAGAMENTO]: StagePagamento,
};

export const StageOptionsShown: Partial<Record<Stages, Set<string>>> = {};

export const UserStages: Record<string, Stages> = {};

export const setUserOptionsShown = (user: string, stage: Stages) => {
  let set = StageOptionsShown[stage] || new Set();
  set.add(user);
  StageOptionsShown[stage] = set;
};

export const setUserOptionsNotShown = (user: string, stage: Stages) => {
  let set = StageOptionsShown[stage];
  if (!set) throw "setUserOptionsNotShown failed!";
  set.delete(user);
  StageOptionsShown[stage] = set;
};

export const getUserOptionsShown = (user: string, stage: Stages) => {
  return Boolean(StageOptionsShown[stage]?.has(user));
};

export const setUserStage = (user: string, stage: Stages) => {
  UserStages[user] = stage;
};

export const getUserStage = (user: string) => {
  return UserStages[user] || Stages.INICIO;
};

export const getUserStageSolver = (user: string) => {
  const stage = getUserStage(user);
  return StageSolvers[stage]!; //TODO: REMOVER ! QUANDO FINALIZAR;
};

export const getOptionHandler = (
  options: StageOption[],
  selected: Number | null
) => {
  if (!selected) return null;
  return options.find((o) => o.number === selected) || null;
};
