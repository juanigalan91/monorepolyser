import React from 'react';
import { AppContext, defaults } from '../components/Context';
import { Title } from '../components/Title';

const App = () => {
    return (
        <AppContext.Provider value={defaults}>
            <Title theme="dark">Monorepolyser</Title>
        </AppContext.Provider>
    );
};

export { App };