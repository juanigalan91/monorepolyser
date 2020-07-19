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
    from: number;
    to: number;
}

export interface Graph {
    nodes: Node[];
    edges: Edge[];
    totalNodes: number;
    nodesIdsByLabel: Record<string, number>;
}

export type Workspace = string;

export type Data = Record<string, { dependencies: Record<string, string>, devDependencies: Record<string, string>}>; 
