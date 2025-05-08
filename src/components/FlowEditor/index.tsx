"use client";
import '../../styles/global.css';
import React, { useCallback, useState, useMemo, useEffect } from "react";
import Sidebar from "./Sidebar";
import CustomNode from "../nodes/CustomNode";
import NodeDetailsPanel from "../nodes/NodeDetailsPanel";
import EditorHeader from "./EditorHeader";
import JsonEditorPanel from "../nodes/JsonEditorPanel";
import AddNodePanel from "./AddNodePanel";

import { getFlows, getFlowById, updateFlow } from "@/lib/flows";
import { Plus } from "lucide-react";
import { appsMetadata } from "@/lib/apps";
import ReactFlow, {
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
} from "react-flow-renderer";

type NodeType = "trigger" | "action" | "condition" | "delay" | "webhook";

type Flow = {
    id: number;
    attributes: {
        name: string;
        data: {
            nodes: any[];
            edges: any[];
        };
    };
};

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
    const [isJsonEditorOpen, setJsonEditorOpen] = useState(false);
    const [isAddNodePanelOpen, setAddNodePanelOpen] = useState(false);

    const [flows, setFlows] = useState<Flow[]>([]);
    const [selectedFlowId, setSelectedFlowId] = useState<number | null>(null);

    useEffect(() => {
        getFlows()
            .then(setFlows)
            .catch((err) => console.error("Erro ao carregar flows:", err));
    }, []);

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

    const handleAddNodeByType = (type: string) => {
        const [appKey, value] = type.split(":");
        const app = appsMetadata[appKey];
        const icon = app?.icon;

        const position = { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 };

        const newNode = {
            id: `${type}-${Date.now()}`,
            type: "default",
            position,
            data: {
                label: value || type,
                type: value || type,
                icon, // <-- aqui você passa o ícone para o node
            },
        };

        setNodes((nds) => [...nds, newNode]);
    };

    const updateNodeLabel = (newLabel: string) => {
        setNodes((nds) =>
            nds.map((n) =>
                n.id === selectedNode?.id
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

    const handleSelectFlow = async (id: number) => {
        try {
            const res = await getFlowById(id);
            const flowData = res.attributes.data;

            if (flowData?.nodes && flowData?.edges) {
                setSelectedFlowId(id);
                setNodes(flowData.nodes);
                setEdges(flowData.edges);
            } else {
                alert("Fluxo inválido");
            }
        } catch (err) {
            console.error("Erro ao carregar fluxo:", err);
            alert("Erro ao carregar fluxo");
        }
    };

    const handleSave = async () => {
        if (!selectedFlowId) {
            alert("Nenhum fluxo selecionado");
            return;
        }

        try {
            await updateFlow(selectedFlowId, {
                name: flows.find((f) => f.id === selectedFlowId)?.attributes.name || "Sem nome",
                data: { nodes, edges },
            });
            alert("Fluxo salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar fluxo:", error);
            alert("Erro ao salvar fluxo");
        }
    };

    return (
        <div className="flex w-full h-screen overflow-hidden">
            <Sidebar onAddNode={addNode} onSelectFlow={handleSelectFlow} />

            <div className="flex flex-col flex-1 overflow-hidden">
                <EditorHeader
                    isJsonEditorOpen={isJsonEditorOpen}
                    toggleJsonEditor={() => setJsonEditorOpen((prev) => !prev)}
                    onSave={handleSave}
                />

                <div className="flex-1 relative">
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
                    <button
                        onClick={() => setAddNodePanelOpen(true)}
                        className="absolute bottom-14 right-2 w-10 h-10 rounded-md bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg z-50"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                    {isJsonEditorOpen && (
                        <JsonEditorPanel
                            initialData={JSON.stringify({ nodes, edges }, null, 2)}
                            onApply={handleApplyJson}
                            onClose={() => setJsonEditorOpen(false)}
                        />
                    )}


                    {isAddNodePanelOpen && (
                        <AddNodePanel
                            onClose={() => setAddNodePanelOpen(false)}
                            onSelectNode={handleAddNodeByType}
                        />
                    )}



                </div>

                <NodeDetailsPanel
                    node={selectedNode}
                    onClose={() => setSelectedNode(null)}
                    onChangeLabel={updateNodeLabel}
                /></div>
        </div>
    );
}
