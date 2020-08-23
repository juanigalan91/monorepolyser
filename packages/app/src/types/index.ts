export enum NODE_TYPES {
    DEPENDENCY = 'dependency',
    DEV_DEPENDENCY = 'dev-dependency',
    TOP_DEPENDENCY = 'top-dependency'
}

export type Node = {
    id: number;
    label: string;
    shape: string;
}

export type Edge = {
    source: number;
    target: number;
}

export interface Graph {
    nodes: Node[];
    edges: Edge[];
    totalNodes: number;
    nodesIdsByLabel: Record<string, number>;
}

export type Workspace = string;

export type Data = Record<string, { dependencies: Record<string, string>, devDependencies: Record<string, string>}>; 

export enum DEPENDENCIES {
    DEPENDENCIES = 'DEPENDENCIES',
    DEV_DEPENDENCIES = 'DEV_DEPENDENCIES',
    ALL_DEPENDENCIES = 'ALL_DEPENDENCIES',
}

export enum GRAPH_TYPE {
    FIRST_LEVEL_GRAPH = 'FIRST_LEVEL_GRAPH',
    COMPLETE_GRAPH = 'COMPLETE_GRAPH',
}

export const ALL_WORKSPACES = 'ALL_WORKSPACES';
