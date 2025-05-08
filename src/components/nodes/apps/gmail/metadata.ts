export default {
    name: "Gmail",
    icon: "/icons/gmail.png",
    triggers: [
        {
            name: "Novo email",
            description: "Dispara quando um novo email é recebido",
            type: "trigger",
            actionKey: "onEmailReceived",
        },
    ],
    actions: [
        {
            name: "Enviar email",
            description: "Envia uma mensagem para destinatários",
            type: "action",
            actionKey: "sendEmail",
        },
        {
            name: "Marcar como lido",
            description: "Marca uma mensagem como lida",
            type: "action",
            actionKey: "markAsRead",
        },
    ],
};