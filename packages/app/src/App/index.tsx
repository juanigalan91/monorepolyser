import React from 'react';
import { Vis } from '../Graph/Vis';
import { AppContext, defaults } from '../components/Context';
import './index.scss';

const App = ({ graph }: { graph: any }) => {
    return (
        <AppContext.Provider value={defaults}>
            <h1>Monorepolyser</h1>
            <Vis graph={graph} />
        </AppContext.Provider>
    );
};

export { App };