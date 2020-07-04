import React from 'react';
import { AppContext, defaults } from '../components/Context';
import './index.scss';

declare global {
    /**
     * Global constants used to refresh the connected user token.
     */
    interface Window {
        vis: any;
    }
}

const App = () => {
    React.useEffect(() => {
        const { vis } = window;
        // create an array with nodes
        var nodes = new vis.DataSet([
            {id: 1, label: 'Node 1'},
            {id: 2, label: 'Node 2'},
            {id: 3, label: 'Node 3'},
            {id: 4, label: 'Node 4'},
            {id: 5, label: 'Node 5'}
        ]);

        // create an array with edges
        // @ts-ignore
        var edges = new vis.DataSet([
            {from: 1, to: 3},
            {from: 1, to: 2},
            {from: 2, to: 4},
            {from: 2, to: 5},
            {from: 3, to: 3}
        ]);

        // create a network
        var container = document.getElementById('dependency-graph');
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {};

        // @ts-ignore
        var network = new vis.Network(container, data, options);
    });

    return (
        <AppContext.Provider value={defaults}>
            <h1>Monorepolyser</h1>
            <div id="dependency-graph" />
        </AppContext.Provider>
    );
};

export { App };