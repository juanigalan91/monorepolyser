import React from 'react';
// @ts-ignore
import cytoscape from 'cytoscape';
// @ts-ignore
import euler from 'cytoscape-euler';
import { Graph } from '../types';

declare global {
    /**
     * Global constants used to refresh the connected user token.
     */
    interface Window {
        cytoscape: any;
    }
}

const Vis = ({ graph }: { graph: Graph }) => {
    console.log(graph);

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

        // cytoscape.use(euler);

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
              name: 'cose',
            
              // Called on `layoutready`
              ready: function(){},
            
              // Called on `layoutstop`
              stop: function(){},
            
              // Whether to animate while running the layout
              // true : Animate continuously as the layout is running
              // false : Just show the end result
              // 'end' : Animate with the end result, from the initial positions to the end positions
              animate: false,
            
              // Easing of the animation for animate:'end'
              animationEasing: undefined,
            
              // The duration of the animation for animate:'end'
              animationDuration: undefined,
            
              // Number of iterations between consecutive screen positions update
              refresh: 20,
            
              // Whether to fit the network view after when done
              fit: false,
            
              // Padding on fit
              padding: 30,
            
              // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
              boundingBox: undefined,
            
              // Excludes the label when calculating node bounding boxes for the layout algorithm
              nodeDimensionsIncludeLabels: true,
            
              // Randomize the initial positions of the nodes (true) or use existing positions (false)
              randomize: false,
            
              // Extra spacing between components in non-compound graphs
              componentSpacing: 100,
            
              // Node repulsion (non overlapping) multiplier
              nodeRepulsion: function( node ){ return 2048; },
            
              // Node repulsion (overlapping) multiplier
              nodeOverlap: 6,
            
              // Ideal edge (non nested) length
              idealEdgeLength: function( edge ){ return 64; },
            
              // Divisor to compute edge forces
              edgeElasticity: function( edge ){ return 32; },
            
              // Nesting factor (multiplier) to compute ideal edge length for nested edges
              nestingFactor: 1.2,
            
              // Gravity force (constant)
              gravity: 1,
            
              // Maximum number of iterations to perform
              numIter: 1000,
            
              // Initial temperature (maximum node displacement)
              initialTemp: 1000,
            
              // Cooling factor (how the temperature is reduced between consecutive iterations
              coolingFactor: 0.99,
            
              // Lower temperature threshold (below this point the layout will end)
              minTemp: 1.0
            }
          });
    });

    return <div id="dependency-graph" />;
};

export { Vis };