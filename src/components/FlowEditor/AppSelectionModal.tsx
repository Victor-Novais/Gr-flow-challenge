"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AppNode, loadAllAppNodes } from "@/lib/apps";
import { useEffect, useState } from "react";

interface AppSelectionModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (nodeType: string) => void;
}

export default function AppSelectionModal({ open, onClose, onSelect }: AppSelectionModalProps) {
    const [apps, setApps] = useState<AppNode[]>([]);

    useEffect(() => {
        const data = loadAllAppNodes();
        setApps(data);
    }, []);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Selecione um App</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                    {apps.map((node) => (
                        <Button
                            key={node.nodeType}
                            onClick={() => {
                                onSelect(node.nodeType);
                                onClose();
                            }}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            {node.icon && <img src={node.icon} alt="" className="w-4 h-4" />}
                            {node.name}
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}