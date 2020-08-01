import React, { Dispatch } from 'react';
import { Graph, Workspace } from '../types';
import { Dependencies } from './Dependencies';
import { GraphType } from './GraphType';
import { Workspaces } from './Workspaces';
import { useTranslate } from '../Context';
import { Action, State, ACTIONS, STATUS } from '../App/state';
import { Button } from '@lumx/react';

export interface ConfiguratorProps {
    graph: Graph;
    workspaces: Workspace[];
    onConfigUpdate: Dispatch<Action>;
    state: State;
}

const NAMESPACE = 'configurator';
const Configurator: React.FC<ConfiguratorProps> = ({ graph, workspaces, onConfigUpdate, state }) => {
    const { translate } = useTranslate();

    const onAnalyze = () => {
        onConfigUpdate({
            type: ACTIONS.SET_STATUS,
            payload: STATUS.BROWSING,
        });
    };

    return (
        <div className={NAMESPACE}>
            <h1 className={`${NAMESPACE}__title`}>{translate('MONOREPOLYSER')}</h1>
            <div className={`${NAMESPACE}__configurations`}>
                <Dependencies onChange={onConfigUpdate} value={state.dependencies} />
                <GraphType onChange={onConfigUpdate} value={state.graphType} />
                <Workspaces workspaces={workspaces} onChange={onConfigUpdate} value={state.workspace} />
                <Button className={`${NAMESPACE}__analyze`} onClick={onAnalyze}>{translate('ANALYZE')}</Button>
            </div>
        </div>
    );
};

export { Configurator };
