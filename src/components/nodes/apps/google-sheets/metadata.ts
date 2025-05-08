export default {
    name: "Google Sheets",
    icon: "/icons/googlesheets.png",
    triggers: [
        {
            name: "Nova linha",
            description: "Dispara quando uma nova linha é adicionada",
            type: "trigger",
            actionKey: "onNewRow",
        },
        {
            name: "Célula modificada",
            description: "Dispara quando uma célula específica é alterada",
            type: "trigger",
            actionKey: "onCellUpdated",
        },
    ],
    actions: [
        {
            name: "Adicionar linha",
            description: "Adiciona uma nova linha em uma planilha",
            type: "action",
            actionKey: "addRow",
        },
        {
            name: "Atualizar célula",
            description: "Modifica o valor de uma célula específica",
            type: "action",
            actionKey: "updateCell",
        },
    ],
};
