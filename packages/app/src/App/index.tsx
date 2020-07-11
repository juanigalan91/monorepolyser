import React, { useState } from 'react';
import { Vis } from '../Graph/Vis';
import { Configurator } from '../Configurator';
import { AppContext, defaults } from '../Context';
import { Graph } from '../types';

export interface AppProps {
    graph: Graph;
}

const App: React.FC<AppProps> = ({ graph }) => {
    const [configurations, setConfigurations] = useState(undefined);

    return (
        <AppContext.Provider value={defaults}>
            {configurations ? <Vis graph={graph} /> : <Configurator graph={graph} />}
        </AppContext.Provider>
    );
};

export { App };