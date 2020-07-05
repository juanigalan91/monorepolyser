import React, { useState } from 'react';
import { Vis } from '../Graph/Vis';
import { Configurator } from '../Configurator';
import { AppContext, defaults } from '../Context';
import './index.scss';

const App = ({ graph }: { graph: any }) => {
    const [configurations, setConfigurations] = useState(null);

    return (
        <AppContext.Provider value={defaults}>
            {configurations ? <Vis graph={graph} /> : <Configurator />}
        </AppContext.Provider>
    );
};

export { App };