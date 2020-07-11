import React from 'react';
import { Graph } from '../types';
import { Dependencies } from './Dependencies';
import { useTranslate } from '../Context';

export interface ConfiguratorProps {
    graph: Graph;
}

const NAMESPACE = 'configurator';
const Configurator: React.FC<ConfiguratorProps> = ({ graph }) => {
    const { translate } = useTranslate();
    return (
        <div className={NAMESPACE}>
            <h1 className={`${NAMESPACE}__title`}>{translate('MONOREPOLYSER')}</h1>
            <div className={`${NAMESPACE}__configurations`}>
                <Dependencies />
            </div>
        </div>
    );
};

export { Configurator };
