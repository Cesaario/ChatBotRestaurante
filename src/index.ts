import { create, Whatsapp } from "venom-bot";
import { messageHandler } from "./messageHandler";

export let client: Whatsapp;

const inicializar = async () => {
  const createdClient = await create("TESTE");
  client = createdClient;
  iniciarFuncionalidades();
};

const iniciarFuncionalidades = () => {
  client.onMessage(messageHandler);
};

inicializar();
