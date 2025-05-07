"use client";

import React, { useCallback, useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import CustomNode from "../nodes/CustomNode";
import NodeDetailsPanel from "../nodes/NodeDetailsPanel";
import JsonEditorPanel from "../nodes/JsonEditorPanel"
import ReactFlow, {
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
} from "react-flow-renderer";

type NodeType = "trigger" | "action" | "condition" | "delay" | "webhook";

const initialNodes = [
    {
        id: "start",
        type: "default",
        position: { x: 250, y: 0 },
        data: { label: "Início", type: "trigger" },
    },
];

const initialEdges: any[] = [];

const nodeTypes = {
    default: CustomNode,
};

export default function FlowEditor() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState<any | null>(null);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const addNode = (type: NodeType) => {
        const position = {
            x: 100 + Math.random() * 200,
            y: 100 + Math.random() * 200,
        };

        const newNode = {
            id: `${type}-${Date.now()}`,
            type: "default",
            position,
            data: {
                label: type.charAt(0).toUpperCase() + type.slice(1),
                type,
            },
        };

        setNodes((nds) => [...nds, newNode]);
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const type = event.dataTransfer.getData("application/reactflow") as NodeType;
        if (!type) return;

        const bounds = event.currentTarget.getBoundingClientRect();
        const position = {
            x: event.clientX - bounds.left,
            y: event.clientY - bounds.top,
        };

        const newNode = {
            id: `${type}-${Date.now()}`,
            type: "default",
            position,
            data: {
                label: type.charAt(0).toUpperCase() + type.slice(1),
                type,
            },
        };

        setNodes((nds) => [...nds, newNode]);
    };

    const updateNodeLabel = (newLabel: string) => {
        setNodes((nds) =>
            nds.map((n) =>
                n.id === selectedNode.id
                    ? { ...n, data: { ...n.data, label: newLabel } }
                    : n
            )
        );

        setSelectedNode((prev: any) => ({
            ...prev,
            data: {
                ...prev.data,
                label: newLabel,
            },
        }));
    };

    const handleDeleteNode = (id: string) => {
        setNodes((nds) => nds.filter((n) => n.id !== id));
        setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    };

    const enhancedNodes = useMemo(() => {
        return nodes.map((node) => ({
            ...node,
            data: {
                ...node.data,
                onEdit: () => setSelectedNode(node),
                onDelete: () => handleDeleteNode(node.id),
            },
        }));
    }, [nodes]);


    const [isJsonEditorOpen, setJsonEditorOpen] = useState(false);

    const handleApplyJson = (json: string) => {
        try {
            const parsed = JSON.parse(json);
            if (parsed.nodes && parsed.edges) {
                setNodes(parsed.nodes);
                setEdges(parsed.edges);
                setJsonEditorOpen(false);
            } else {
                alert("Formato inválido");
            }
        } catch (err) {
            alert("JSON inválido");
        }
    };


    {
        isJsonEditorOpen && (
            <JsonEditorPanel
                initialData={JSON.stringify({ nodes, edges }, null, 2)}
                onApply={handleApplyJson}
                onClose={() => setJsonEditorOpen(false)}
            />
        )
    }
    return (
        <div className="flex w-full h-screen overflow-hidden relative">
            <Sidebar onAddNode={addNode} />
            <div className="flex-1 h-full">
                <ReactFlow
                    nodes={enhancedNodes}
                    nodeTypes={nodeTypes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={handleDrop}
                    onDragOver={(event) => {
                        event.preventDefault();
                        event.dataTransfer.dropEffect = "move";
                    }}
                    fitView
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>

            <NodeDetailsPanel
                node={selectedNode}
                onClose={() => setSelectedNode(null)}
                onChangeLabel={updateNodeLabel}
            />



            {isJsonEditorOpen && (
                <JsonEditorPanel
                    initialData={JSON.stringify({ nodes, edges }, null, 2)}
                    onApply={handleApplyJson}
                    onClose={() => setJsonEditorOpen(false)}
                />
            )}

            {!isJsonEditorOpen && (
                <button
                    onClick={() => setJsonEditorOpen(true)}
                    className="fixed top-4 right-4 bg-gray-800 text-white rounded-md p-2 shadow-md hover:bg-gray-700 z-50"
                    title="Ver JSON do Fluxo"
                >
                    {"<>"}
                </button>
            )}
        </div>
    );
}