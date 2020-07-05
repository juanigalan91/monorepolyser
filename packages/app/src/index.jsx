import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import data from './App/data.simple.json';
import { convert } from './utils/converter';
import './styles/index.scss';

const graph = convert(data);

ReactDOM.render(
  <React.StrictMode>
    <App graph={graph} />
  </React.StrictMode>,
  document.getElementById('root')
);
