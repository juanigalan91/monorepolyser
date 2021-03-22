import React from 'react';

export const Edge: React.FC<any> = ({ fromX, fromY, toX, toY }) => {
  return <line x1={fromX} y1={fromY} x2={toX} y2={toY} style={{ stroke: 'blue', strokeWidth: 2 }} />;
};
