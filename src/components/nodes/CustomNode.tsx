"use client";

import { Handle, Position } from "react-flow-renderer";
import { MessageSquare, Clock, Zap, Share2, HelpCircle, Pencil, Trash } from "lucide-react";

interface CustomNodeProps {
    data: {
        label: string;
        type: string;
        onEdit?: () => void;
        onDelete?: () => void;
    };
}

const iconsMap = {
    trigger: <Zap size={16} />,
    action: <MessageSquare size={16} />,
    condition: <HelpCircle size={16} />,
    delay: <Clock size={16} />,
    webhook: <Share2 size={16} />,
};

export default function CustomNode({ data }: CustomNodeProps) {
    const icon = iconsMap[data.type as keyof typeof iconsMap] || <Zap size={16} />;

    return (
        <div className="relative bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm w-[130px] group">

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
                <div className="flex-shrink-0">{icon}</div>
                <span className="block text-sm font-medium break-words overflow-hidden line-clamp-5">
                    {data.label}
                </span>
            </div>


            <div className="absolute top-1 right-1 hidden group-hover:flex gap-1">
                <button onClick={data.onEdit} className="p-1 bg-white rounded hover:bg-gray-100">
                    <Pencil size={12} />
                </button>
                <button onClick={data.onDelete} className="p-1 bg-white rounded hover:bg-gray-100 text-red-600">
                    <Trash size={12} />
                </button>
            </div>
        </div>
    );
}
