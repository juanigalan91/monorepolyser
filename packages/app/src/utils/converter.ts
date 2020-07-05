import { NODE_TYPES, Node, Graph } from '../types';

const graph: Graph = {
    nodes: [],
    edges: [],
    nodesIdsByLabel: {},
    totalNodes: 0,
}

const createNode = (id: number, label: string, type: NODE_TYPES): Node => {
    const node: Node = {
        id: id,
        label: label,
        shape: 'box',
    };

    switch(type) {
        case NODE_TYPES.TOP_DEPENDENCY:
            Object.assign(node, {
                color: {
                    background: '#28336d',
                },
                font: {
                    color: '#FFF',
                },
                scaling: {
                    label: {
                        enabled: true,
                    }
                },
            });
        break;
        case NODE_TYPES.DEV_DEPENDENCY:
            Object.assign(node, {
                color: '#5ac085',
            });
        break;
        case NODE_TYPES.DEPENDENCY:
            Object.assign(node, {
                color: '#eaf4ff',
            });
        break;
    }

    return node;
}

const addNode = (label: string, type: NODE_TYPES) => {
    let addedNodeId;

    if (!graph.nodesIdsByLabel[label]) {
        graph.totalNodes = graph.totalNodes + 1;
        graph.nodesIdsByLabel[label] = graph.totalNodes;

        graph.nodes.push(createNode(graph.totalNodes, label, type));

        addedNodeId = graph.totalNodes;
    } else {
        addedNodeId = graph.nodesIdsByLabel[label];
    }

    return addedNodeId;
}

const addNodes = (currentNodeId: number, rawNodes: Record<string, string>, type: NODE_TYPES) => {
    if (rawNodes) {
        const nodesKeys = Object.keys(rawNodes);

        nodesKeys.forEach((node: string) => {
            const depNodeId = addNode(node, type);

            graph.edges.push({
                from: currentNodeId,
                to: depNodeId,
            });
        });
    }
}

const convert = (rawData: any) => {
    const keys = Object.keys(rawData);
    let currentNodeId: number;

    keys.forEach((key) => {
        currentNodeId = addNode(key, NODE_TYPES.TOP_DEPENDENCY);

        const { dependencies, devDependencies } = rawData[key];

        addNodes(currentNodeId, dependencies, NODE_TYPES.DEPENDENCY);
        addNodes(currentNodeId, devDependencies, NODE_TYPES.DEV_DEPENDENCY)
    });

    return graph;
};

export { convert };
