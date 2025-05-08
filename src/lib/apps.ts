import whatsapp from "@/components/nodes/apps/whatsapp/metadata";
import gmail from "@/components/nodes/apps/gmail/metadata";
import openai from "@/components/nodes/apps/openAI/metadata";
import googleSheets from "@/components/nodes/apps/google-sheets/metadata";
import instagram from "@/components/nodes/apps/instagram/metadata";

export const appsMetadata = {
    whatsapp,
    gmail,
    openai,
    "google-sheets": googleSheets,
    instagram,
};

export type AppNode = {
    name: string;
    app: string;
    type: "trigger" | "action";
    nodeType: string;
    icon?: string;
    description?: string;
};

export function loadAllAppNodes(): AppNode[] {
    return Object.entries(appsMetadata).flatMap(([app, mod]) => {
        const triggers = mod.triggers?.map((t: any) => ({
            name: t.name,
            description: t.description,
            type: "trigger",
            app,
            nodeType: `${app}:${t.description}`,
            icon: mod.icon,
        })) || [];

        const actions = mod.actions?.map((a: any) => ({
            name: a.name,
            description: a.description,
            type: "action",
            app,
            nodeType: `${app}:${a.description}`,
            icon: mod.icon,
        })) || [];

        return [...triggers, ...actions];
    });
}