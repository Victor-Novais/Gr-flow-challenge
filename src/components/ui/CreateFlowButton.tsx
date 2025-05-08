"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { createFlow } from "@/lib/flows";

interface CreateFlowButtonProps {
    onFlowCreated: (id: number) => void;
}

export function CreateFlowButton({ onFlowCreated }: CreateFlowButtonProps) {
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);

    const handleCreate = async () => {
        if (!name.trim()) return;

        try {
            const newFlow = await createFlow({
                name,
                data: { nodes: [], edges: [] },
            });
            onFlowCreated(newFlow.id);
            setName("");
            setOpen(false);
        } catch (error) {
            alert("Erro ao criar fluxo.");
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="outline" title="Novo fluxo">
                    <Plus className="w-4 h-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Novo Fluxo</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <Input
                        placeholder="Nome do fluxo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full"
                    />
                    <div className="flex justify-end">
                        <Button onClick={handleCreate}>Criar</Button>
                    </div>
                </div>

                <DialogClose />
            </DialogContent>
        </Dialog>
    );
}
