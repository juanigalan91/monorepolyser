import React from 'react';
import { DEFAULT_LANG } from '../translations';

const defaults = {
    lang: DEFAULT_LANG
};

const AppContext = React.createContext(defaults);

export { AppContext, defaults };