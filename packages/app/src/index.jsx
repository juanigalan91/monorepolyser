import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { packages, workspaces } from './App/data.json';
import { convert } from './utils/converter';
import './styles/index.scss';

const graph = convert(packages);

ReactDOM.render(
  <React.StrictMode>
    <App graph={graph} workspaces={workspaces} />
  </React.StrictMode>,
  document.getElementById('root')
);
