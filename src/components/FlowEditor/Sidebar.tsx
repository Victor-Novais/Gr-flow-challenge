"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    GripVertical,
    PlusCircle,
    Play,
    Zap,
    MessageSquare,
    HelpCircle,
    Clock,
    Share2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getFlows } from "@/lib/flows";
import { CreateFlowButton } from "@/components/ui/CreateFlowButton";

type NodeType = "trigger" | "action" | "condition" | "delay" | "webhook";

interface SidebarProps {
    onAddNode: (type: NodeType) => void;
    onSelectFlow: (id: number) => void;
}

type Flow = {
    id: number;
    attributes: {
        name: string;
        data?: any;
    };
};

const NODE_OPTIONS: { label: string; type: NodeType; icon: JSX.Element }[] = [
    { label: "Gatilho", type: "trigger", icon: <Zap className="w-4 h-4 mr-2" /> },
    { label: "Ação", type: "action", icon: <MessageSquare className="w-4 h-4 mr-2" /> },
    { label: "Condição", type: "condition", icon: <HelpCircle className="w-4 h-4 mr-2" /> },
    { label: "Atraso", type: "delay", icon: <Clock className="w-4 h-4 mr-2" /> },
    { label: "Webhook", type: "webhook", icon: <Share2 className="w-4 h-4 mr-2" /> },
];

export default function Sidebar({ onAddNode, onSelectFlow }: SidebarProps) {
    const [flows, setFlows] = useState<Flow[]>([]);
    const [selectedFlowId, setSelectedFlowId] = useState<number | null>(null);

    useEffect(() => {
        refreshFlows();
    }, []);

    const refreshFlows = () => {
        getFlows()
            .then(setFlows)
            .catch((err) => console.error("Erro ao buscar fluxos:", err));
    };

    const handleFlowSelect = (id: number) => {
        setSelectedFlowId(id);
        onSelectFlow(id);
    };

    return (
        <aside className="w-64 h-full bg-white border-r shadow-sm p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Flows</h2>
                <CreateFlowButton onFlowCreated={refreshFlows} />
            </div>

            <div className="mb-6">
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Selecione um fluxo
                </label>
                <select
                    value={selectedFlowId ?? ""}
                    onChange={(e) => handleFlowSelect(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                    <option disabled value="">
                        Selecione um fluxo
                    </option>
                    {flows.map((flow) => (
                        <option key={flow.id} value={flow.id}>
                            {flow.attributes.name}
                        </option>
                    ))}
                </select>
            </div>

            <h3 className="text-sm font-semibold text-gray-700 mb-2">Componentes</h3>
            <ScrollArea className="flex-1 pr-1">
                <div className="flex flex-col gap-2">
                    {NODE_OPTIONS.map((node) => (
                        <Button
                            key={node.type}
                            variant="outline"
                            size="sm"
                            className="justify-start text-sm text-gray-700"
                            draggable
                            onDragStart={(e) =>
                                e.dataTransfer.setData("application/reactflow", node.type)
                            }
                            onClick={() => onAddNode(node.type)}
                        >
                            {node.icon}
                            {node.label}
                        </Button>
                    ))}
                </div>
            </ScrollArea>
        </aside>
    );
}
