export default {
    name: "Instagram",
    icon: "/icons/instagram.png",
    triggers: [
        {
            name: "Novo seguidor",
            description: "Dispara quando um usuário começa a seguir você",
            type: "trigger",
            actionKey: "onNewFollower",
        },
        {
            name: "Nova mensagem",
            description: "Dispara quando uma mensagem direta é recebida",
            type: "trigger",
            actionKey: "onNewDirectMessage",
        },
    ],
    actions: [
        {
            name: "Publicar imagem",
            description: "Posta uma imagem com legenda no feed",
            type: "action",
            actionKey: "postImage",
        },
        {
            name: "Enviar direct",
            description: "Envia uma mensagem direta para um usuário",
            type: "action",
            actionKey: "sendDirect",
        },
    ],
};
