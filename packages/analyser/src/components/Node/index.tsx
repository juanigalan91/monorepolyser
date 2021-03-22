import React from 'react';

export interface NodeProps {
  x: React.SVGAttributes<SVGCircleElement>['cx'];
  y: React.SVGAttributes<SVGCircleElement>['cx'];
  radius: React.SVGAttributes<SVGCircleElement>['r'];
}

export const Node: React.FC<NodeProps> = ({ x, y, radius }) => {
  return <circle cx={x} cy={y} r={radius} stroke="blue" strokeWidth="3" fill="blue" />;
};
