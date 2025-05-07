"use client";

import { X, Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface JsonEditorPanelProps {
    initialData: string;
    onApply: (json: string) => void;
    onClose: () => void;
}

export default function JsonEditorPanel({
    initialData,
    onApply,
    onClose,
}: JsonEditorPanelProps) {
    const [json, setJson] = useState(initialData);

    const handleCopy = () => {
        navigator.clipboard.writeText(json);
    };

    return (
        <div className="fixed top-0 right-0 w-[400px] h-full bg-white border-l z-50 shadow-xl p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">JSON do Fluxo</h2>
                <div className="flex gap-1 ml-auto">
                    <Button size="sm" onClick={() => onApply(json)}>
                        <Check className="w-4 h-4 mr-1" /> Aplicar
                    </Button>
                    <Button size="sm" variant="secondary" onClick={handleCopy}>
                        <Copy className="w-4 h-4 mr-1" /> Copiar
                    </Button>
                    <Button size="icon" variant="ghost" onClick={onClose}>
                        <X />
                    </Button>
                </div>
            </div>

            <ScrollArea className="flex-1">
                <div className="h-full">
                    <textarea
                        className="w-full h-[calc(100vh-130px)] border rounded p-2 text-sm font-mono resize-none"
                        value={json}
                        onChange={(e) => setJson(e.target.value)}
                    />
                </div>
            </ScrollArea>
        </div>
    );
}
