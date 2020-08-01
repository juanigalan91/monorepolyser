import React, { useReducer } from 'react';
import { Vis } from '../Graph/Vis';
import { Configurator } from '../Configurator';
import { AppContext, defaults } from '../Context';
import { Graph, Workspace } from '../types';
import { initialState, reducer, STATUS } from './state';

export interface AppProps {
    graph: Graph;
    workspaces: Workspace[];
}

const App: React.FC<AppProps> = ({ graph, workspaces }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={defaults}>
            {state.status !== STATUS.CONFIGURING ?
                <Vis graph={graph} /> :
                <Configurator graph={graph} workspaces={workspaces} onConfigUpdate={dispatch} state={state} />
            }
        </AppContext.Provider>
    );
};

export { App };