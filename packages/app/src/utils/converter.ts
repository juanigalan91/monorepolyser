const convert = (rawData: any) => {
    const keys = Object.keys(rawData);
    const nodesId: Record<string, number> = {};
    let currentNodeId: number;
    let id = 1;
    const nodes: any[] = [];
    const edges: any[] = [];

    keys.forEach((key) => {
        if (!nodesId[key]) {
            id = id + 1;
            nodesId[key] = id;

            nodes.push({
                id: id,
                label: key,
                shape: 'box',
            });

            currentNodeId = id;
        } else {
            currentNodeId = nodesId[key];
        }

        const { dependencies, devDependencies } = rawData[key];

        if (dependencies) {
            const dependenciesKeys = Object.keys(dependencies);

            dependenciesKeys.forEach((depKey: string) => {
                if (!nodesId[depKey]) {
                    id = id + 1;
                    nodesId[depKey] = id;

                    nodes.push({
                        id: id,
                        label: depKey,
                        shape: 'box',
                    });

                    edges.push({
                        from: currentNodeId,
                        to: id,
                    });
                }
            });
        }

        if (devDependencies) {
            const devDependenciesKeys = Object.keys(devDependencies);

            devDependenciesKeys.forEach((devDepKey: string) => {
                if (!nodesId[devDepKey]) {
                    id = id + 1;
                    nodesId[devDepKey] = id;

                    nodes.push({
                        id: id,
                        label: devDepKey,
                        shape: 'box',
                        color: 'red',
                    });

                    edges.push({
                        from: currentNodeId,
                        to: id,
                    });
                }
            });
        }
    });

    return { nodes, edges };
};

export { convert };
