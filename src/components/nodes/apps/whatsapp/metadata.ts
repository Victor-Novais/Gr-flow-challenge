export default {
    name: "WhatsApp",
    icon: "/icons/whatsapp.png",
    triggers: [
        {
            name: "Nova mensagem",
            description: "Dispara quando uma nova mensagem é recebida",
            type: "trigger",
            actionKey: "onMessageReceived",
        },
    ],
    actions: [
        {
            name: "Enviar mensagem",
            description: "Envia uma mensagem de texto no WhatsApp",
            type: "action",
            actionKey: "sendMessage",
        },
    ],
};
