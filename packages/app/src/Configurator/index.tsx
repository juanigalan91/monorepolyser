import React from 'react';
import { Graph, Workspace } from '../types';
import { Dependencies } from './Dependencies';
import { GraphType } from './GraphType';
import { Workspaces } from './Workspaces';
import { useTranslate } from '../Context';

export interface ConfiguratorProps {
    graph: Graph;
    workspaces: Workspace[];
}

const NAMESPACE = 'configurator';
const Configurator: React.FC<ConfiguratorProps> = ({ graph, workspaces }) => {
    const { translate } = useTranslate();

    return (
        <div className={NAMESPACE}>
            <h1 className={`${NAMESPACE}__title`}>{translate('MONOREPOLYSER')}</h1>
            <div className={`${NAMESPACE}__configurations`}>
                <Dependencies />
                <GraphType />
                <Workspaces workspaces={workspaces} />
            </div>
        </div>
    );
};

export { Configurator };
