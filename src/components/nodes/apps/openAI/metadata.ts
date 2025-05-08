export default {
    name: "OpenAI",
    icon: "/icons/openai.png",
    triggers: [
        {
            name: "Novo prompt",
            description: "Dispara quando um novo prompt é enviado",
            type: "trigger",
            actionKey: "onNewPrompt",
        },
    ],
    actions: [
        {
            name: "Gerar texto",
            description: "Gera uma resposta com base em um prompt de texto",
            type: "action",
            actionKey: "generateText",
        },
        {
            name: "Analisar sentimento",
            description: "Classifica o sentimento contido em um texto",
            type: "action",
            actionKey: "analyzeSentiment",
        },
    ],
};
