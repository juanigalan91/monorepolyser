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

const App = ({ graph }: { graph: any }) => {
    React.useEffect(() => {
        const { vis } = window;
        // create an array with nodes
        var nodes = new vis.DataSet(graph.nodes);

        // create an array with edges
        // @ts-ignore
        var edges = new vis.DataSet(graph.edges);

        // create a network
        var container = document.getElementById('dependency-graph');
        var data = {
            nodes: nodes,
            edges: edges
        };
         var options = {
             layout: {
                improvedLayout: false,
             }
         };

        // @ts-ignore
        new vis.Network(container, data, options);
    });

    return (
        <AppContext.Provider value={defaults}>
            <h1>Monorepolyser</h1>
            <div id="dependency-graph" />
        </AppContext.Provider>
    );
};

export { App };