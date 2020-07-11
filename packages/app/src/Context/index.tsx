import React, { useContext } from 'react';
import { DEFAULT_LANG, translate } from '../translations';

const defaults = {
    lang: DEFAULT_LANG
};

const AppContext = React.createContext(defaults);

const useTranslate = () => {
    const context = useContext(AppContext);

    return {
        translate: (key: string) => translate(key, context.lang),
    }
};


export { AppContext, defaults, useTranslate };