import { create, Whatsapp } from "venom-bot";
import { messageHandler } from "./messageHandler";

export let client: Whatsapp;

const inicializar = async () => {
  const createdClient = await create("ChatBot");
  client = createdClient;
  iniciarFuncionalidades();
};

const list = [
  {
    title: "Pasta",
    rows: [
      {
        title: "Ravioli Lasagna",
        description: "Made with layers of frozen cheese",
      },
    ],
  },
  {
    title: "Dessert",
    rows: [
      {
        title: "Baked Ricotta Cake",
        description: "Sweets pecan baklava rolls",
      },
      {
        title: "Lemon Meringue Pie",
        description: "Pastry filled with lemonand meringue.",
      },
    ],
  },
];

const iniciarFuncionalidades = () => {
  //client.onMessage(messageHandler);
  client.onMessage(async (msg) => {
    const buttons = [
      {
        buttonText: {
          displayText: "Text of Button 1",
          url: 'https://google.com'
        },
      },
      {
        buttonText: {
          displayText: "Text of Button 2",
          url: 'https://google.com'
        },
      },
    ];
    try {
      await client.sendButtons(
        msg.from,
        "Title",
        buttons,
        "Description"
      );
    } catch (e) {console.log(e)}
  });
};

inicializar();
