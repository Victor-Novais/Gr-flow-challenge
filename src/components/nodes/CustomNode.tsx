"use client";

import { Handle, Position } from "react-flow-renderer";
import {
    MessageSquare,
    Clock,
    Zap,
    Share2,
    HelpCircle,
    Pencil,
    Trash,
} from "lucide-react";

interface CustomNodeProps {
    data: {
        label: string;
        description?: string;
        type: string;
        onEdit?: () => void;
        onDelete?: () => void;
        icon?: string;
    };
    selected?: boolean;
}

const appColors: Record<string, string> = {
    whatsapp: "bg-green-100 border-green-500",
    gmail: "bg-red-100 border-red-500",
    "google-sheets": "bg-emerald-100 border-emerald-500",
    instagram: "bg-pink-100 border-pink-500",
    openai: "bg-slate-100 border-slate-500",
};

const typeFallbackColors: Record<string, string> = {
    trigger: "bg-green-100 border-green-500",
    action: "bg-blue-100 border-blue-500",
    condition: "bg-yellow-100 border-yellow-500",
    delay: "bg-purple-100 border-purple-500",
    webhook: "bg-pink-100 border-pink-500",
};

const typeIcons = {
    trigger: <Zap size={16} />,
    action: <MessageSquare size={16} />,
    condition: <HelpCircle size={16} />,
    delay: <Clock size={16} />,
    webhook: <Share2 size={16} />,
};

export default function CustomNode({ data, selected }: CustomNodeProps) {
    const typeIcon = typeIcons[data.type as keyof typeof typeIcons] || <Zap size={16} />;


    const appKey = data.icon?.split("/").pop()?.split(".")[0] || "";
    const nodeStyle =
        appColors[appKey] || typeFallbackColors[data.type] || "bg-white border-gray-300";

    return (
        <div className={`relative group ${selected ? "z-50" : ""}`}>

            <div className="absolute -top-6 -right-6 flex gap-1 z-50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
                <button
                    onClick={data.onEdit}
                    className="p-1 bg-white border border-gray-300 rounded shadow hover:bg-gray-100"
                >
                    <Pencil size={12} />
                </button>
                <button
                    onClick={data.onDelete}
                    className="p-1 bg-white border border-gray-300 rounded shadow hover:bg-gray-100 text-red-600"
                >
                    <Trash size={12} />
                </button>
            </div>


            <div
                className={`rounded-2xl border-2 shadow-sm px-4 py-3 min-w-[160px] max-w-[220px] ${nodeStyle}`}
            >

                <Handle
                    type="target"
                    position={Position.Top}
                    className="w-3 h-3 bg-blue-500 border-none absolute -top-1 left-1/2 -translate-x-1/2"
                />
                <Handle
                    type="source"
                    position={Position.Bottom}
                    className="w-3 h-3 bg-blue-500 border-none absolute -bottom-1 left-1/2 -translate-x-1/2"
                />

                <div className="flex items-start gap-2">
                    {data.icon ? (
                        <img src={data.icon} alt="icon" className="w-4 h-4 mt-0.5" />
                    ) : (
                        <div className="flex-shrink-0">{typeIcon}</div>
                    )}
                    <div className="flex flex-col leading-tight">
                        <span className="text-sm font-semibold text-gray-900">
                            {data.label}
                        </span>
                        {data.description && (
                            <span className="text-xs text-gray-500 break-words">
                                {data.description}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
