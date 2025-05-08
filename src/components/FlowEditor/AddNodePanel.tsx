"use client";

import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { loadAllAppNodes, AppNode } from "@/lib/apps";
import { useEffect, useState } from "react";

interface Props {
    onClose: () => void;
    onSelectNode: (nodeType: string) => void;
}

export default function AddNodePanel({ onClose, onSelectNode }: Props) {
    const [nodes, setNodes] = useState<AppNode[]>([]);

    useEffect(() => {
        const all = loadAllAppNodes();
        setNodes(all);
    }, []);

    const grouped = nodes.reduce((acc, node) => {
        if (!acc[node.app]) acc[node.app] = [];
        acc[node.app].push(node);
        return acc;
    }, {} as Record<string, AppNode[]>);

    return (
        <div className="fixed right-0 top-0 w-80 h-full bg-white border-l shadow-lg z-50 p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Adicionar nó</h2>
                <button onClick={onClose}>
                    <X className="w-5 h-5" />
                </button>
            </div>

            <ScrollArea className="flex-1 pr-2">
                {Object.entries(grouped).map(([app, list]) => (
                    <div key={app} className="mb-4">
                        <h3 className="font-bold text-sm mb-2 capitalize">{app}</h3>
                        <div className="flex flex-col gap-2">
                            {list.map((item) => (
                                <Button
                                    key={item.nodeType}
                                    variant="outline"
                                    className="justify-start"
                                    onClick={() => {
                                        onSelectNode(item.nodeType);
                                        onClose();
                                    }}
                                >
                                    {item.icon && (
                                        <img src={item.icon} alt="" className="w-4 h-4 mr-2" />
                                    )}
                                    {item.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
}
