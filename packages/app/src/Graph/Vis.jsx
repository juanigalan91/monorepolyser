import React from 'react';
// @ts-ignore
import cytoscape from 'cytoscape';
// @ts-ignore
import spread from 'cytoscape-spread';

cytoscape.use(spread);

const Vis = ({ graph }) => {
    React.useEffect(() => {
        const nodes = graph.nodes.map((node) => {
            return {
                data: node
            };
        });

        const edges = graph.edges.map((node) => {
            return {
                data: node
            };
        });

        var cy = cytoscape({

            container: document.getElementById('dependency-graph'), // container to render in
          // @ts-ignore
            elements: [ // list of graph elements to start with
              ...nodes,
              ...edges,
            ],
          
            style: [ // the stylesheet for the graph
              {
                selector: 'node',
                style: {
                  'background-color': '#666',
                  'label': 'data(label)'
                }
              },
          
              {
                selector: 'edge',
                style: {
                  'width': 3,
                  'line-color': '#ccc',
                  'target-arrow-color': '#ccc',
                  'target-arrow-shape': 'triangle',
                  'curve-style': 'bezier'
                }
              }
            ],
            layout: {
              name: 'spread',
              animate: false,
              minDist: 100
            }
          });
    });

    return <div id="dependency-graph" />;
};

export { Vis };