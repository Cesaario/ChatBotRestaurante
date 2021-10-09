import { Stages } from "../constants/StagesEnum";
import { StageOption } from "../interfaces/IStageOptions";
import StageCardapioSelecionado from "./StageCardapioSelecionado";
import StageInicio from "./StageInicio";

export const StageSolvers: Partial<
  Record<Stages, (user: string, message?: string) => void>
> = {
  //TODO: REMOVER PARTIAL QUANDO FINALIZAR
  [Stages.INICIO]: StageInicio,
  [Stages.CARDAPIO_SELECIONADO]: StageCardapioSelecionado,
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
