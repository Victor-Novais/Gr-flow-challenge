import api from "./api";

export async function getFlows() {
    const response = await api.get("/flows");
    return response.data.data;
}


export async function getFlowById(id: number | string) {
    const response = await api.get(`/flows/${id}`);
    return response.data.data;
}


export async function createFlow(data: any) {
    const response = await api.post("/flows", { data });
    return response.data.data;

}


export async function updateFlow(id: number | string, data: any) {
    const response = await api.put(`/flows/${id}`, { data });
    return response.data.data;
}

export async function deleteFlow(id: number | string) {
    const response = await api.delete(`/flows/${id}`);
    return response.data;
}