import React, { useState } from 'react';
import { Vis } from '../Graph/Vis';
import { Configurator } from '../Configurator';
import { AppContext, defaults } from '../Context';
import { Graph, Workspace } from '../types';

export interface AppProps {
    graph: Graph;
    workspaces: Workspace[];
}

const App: React.FC<AppProps> = ({ graph, workspaces }) => {
    const [configurations, setConfigurations] = useState(undefined);

    return (
        <AppContext.Provider value={defaults}>
            {configurations ? <Vis graph={graph} /> : <Configurator graph={graph} workspaces={workspaces} />}
        </AppContext.Provider>
    );
};

export { App };