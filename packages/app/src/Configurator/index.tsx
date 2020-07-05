import React from 'react';
import './index.scss';

const NAMESPACE = 'configurator';
const Configurator: React.FC<any> = () => {
    return (
        <div className={NAMESPACE}>
            <h1>Monorepolyser</h1>
        </div>
    );
};

export { Configurator };
