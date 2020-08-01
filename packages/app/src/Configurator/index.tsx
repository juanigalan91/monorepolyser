import React, { Dispatch } from 'react';
import { Graph, Workspace } from '../types';
import { Dependencies } from './Dependencies';
import { GraphType } from './GraphType';
import { Workspaces } from './Workspaces';
import { useTranslate } from '../Context';
import { Action, State } from '../App/state';

export interface ConfiguratorProps {
    graph: Graph;
    workspaces: Workspace[];
    onConfigUpdate: Dispatch<Action>;
    state: State;
}

const NAMESPACE = 'configurator';
const Configurator: React.FC<ConfiguratorProps> = ({ graph, workspaces, onConfigUpdate, state }) => {
    const { translate } = useTranslate();

    return (
        <div className={NAMESPACE}>
            <h1 className={`${NAMESPACE}__title`}>{translate('MONOREPOLYSER')}</h1>
            <div className={`${NAMESPACE}__configurations`}>
                <Dependencies onChange={onConfigUpdate} value={state.dependencies} />
                <GraphType onChange={onConfigUpdate} value={state.graphType} />
                <Workspaces workspaces={workspaces} onChange={onConfigUpdate} value={state.workspace} />
            </div>
        </div>
    );
};

export { Configurator };
