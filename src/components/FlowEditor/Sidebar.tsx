"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GripVertical } from "lucide-react";
import { useState } from "react";


type NodeType = "trigger" | "action" | "condition" | "delay" | "webhook";

interface SidebarProps {
    onAddNode: (type: NodeType) => void;
}


const NODE_OPTIONS: { label: string; type: NodeType }[] = [
    { label: "Gatilho", type: "trigger" },
    { label: "Ação", type: "action" },
    { label: "Condição", type: "condition" },
    { label: "Atraso", type: "delay" },
    { label: "Webhook", type: "webhook" },
];

// TODO: Substituir por chamada à API (GET /flows) quando integrar backend
const AVAILABLE_FLOWS = [
    "21 dias de abundância de ...",
    "Fluxo de vendas",
    "Fluxo de feedback",
    "Fluxo de onboarding",
];

export default function Sidebar({ onAddNode }: SidebarProps) {
    const [selectedFlow, setSelectedFlow] = useState(AVAILABLE_FLOWS[0]);

    return (
        <aside className="w-60 h-full bg-white border-r shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Blocos</h2>


            <div className="mb-6">
                <h3 className="font-semibold text-sm">Fluxos</h3>
                <select
                    value={selectedFlow}
                    onChange={(e) => setSelectedFlow(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    {AVAILABLE_FLOWS.map((flow) => (
                        <option key={flow} value={flow}>
                            {flow}
                        </option>
                    ))}
                </select>
            </div>


            <ScrollArea className="h-full pr-2">
                <div className="flex flex-col gap-2">
                    {NODE_OPTIONS.map((node) => (
                        <Button
                            key={node.type}
                            variant="outline"
                            size="sm"
                            className="justify-start"
                            draggable
                            onDragStart={(e) =>
                                e.dataTransfer.setData("application/reactflow", node.type)
                            }
                            onClick={() => onAddNode(node.type)}
                        >
                            <GripVertical className="w-4 h-4 mr-2" />
                            {node.label}
                        </Button>
                    ))}
                </div>
            </ScrollArea>
        </aside>
    );
}
