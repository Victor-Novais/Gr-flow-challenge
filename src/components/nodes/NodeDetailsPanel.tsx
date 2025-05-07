"use client";

import { X } from "lucide-react";

interface NodeDetailsPanelProps {
    node: any;
    onClose: () => void;
    onChangeLabel: (label: string) => void;
}

export default function NodeDetailsPanel({
    node,
    onClose,
    onChangeLabel,
}: NodeDetailsPanelProps) {
    if (!node) return null;

    return (
        <div className="absolute top-0 right-0 w-80 h-full bg-white border-l p-4 shadow-lg z-50">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Editar Flow</h2>
                <button onClick={onClose}>
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Label</label>
                <input
                    type="text"
                    value={node.data.label}
                    onChange={(e) => onChangeLabel(e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                />
            </div>

            <p className="text-sm text-gray-600">
                Tipo: <strong>{node.data.type}</strong>
            </p>


        </div>
    );
}
