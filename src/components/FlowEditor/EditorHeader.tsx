"use client";

import { Save, Undo2, Redo2, Play, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditorHeaderProps {
    isJsonEditorOpen: boolean;
    toggleJsonEditor: () => void;
    onSave: () => void;
}

export default function EditorHeader({
    isJsonEditorOpen,
    toggleJsonEditor,
    onSave,
}: EditorHeaderProps) {
    return (
        <div className="flex items-center justify-between px-4 py-2 border-b bg-white shadow-sm">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" title="Salvar" onClick={onSave}>
                    <Save className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" title="Desfazer">
                    <Undo2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" title="Refazer">
                    <Redo2 className="w-4 h-4" />
                </Button>
            </div>

            <div className="text-sm text-muted-foreground">
                Última atualização: 02/05/2025 às 11:01
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    title="Ver JSON"
                    onClick={toggleJsonEditor}
                >
                    <Code
                        className="w-4 h-4"
                        color={isJsonEditorOpen ? "#3b82f6" : "currentColor"}
                    />
                </Button>
                <Button variant="default" size="icon" title="Executar fluxo">
                    <Play className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
