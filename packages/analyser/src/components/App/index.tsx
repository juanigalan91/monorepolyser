import React from 'react';

import { Node } from '../Node';
import { Edge } from '../Edge';

export const App: React.FC<any> = () => {
  return (
    <main className="app">
      <svg height="100%" width="100%">
        <Edge fromX={50} fromY={50} toX={150} toY={150} />
        <Node x={50} y={50} radius={20} />
        <Node x={150} y={150} radius={20} />
      </svg>
    </main>
  );
};

