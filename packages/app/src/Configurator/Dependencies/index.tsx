import React, { Dispatch } from 'react';
import { useTranslate } from '../../Context';
import { Select } from '../Select';
import { DEPENDENCIES } from '../../types';
import { Action, ACTIONS } from '../../App/state';

const OPTIONS = [DEPENDENCIES.DEPENDENCIES, DEPENDENCIES.DEV_DEPENDENCIES, DEPENDENCIES.ALL_DEPENDENCIES];

export interface DependenciesProps {
    onChange: Dispatch<Action>;
    value: DEPENDENCIES;
}

const Dependencies: React.FC<DependenciesProps> = ({ value, onChange }) => {
    const { translate } = useTranslate();
    const label = translate('CHOOSE_THE_DEPENDENCIES_YOU_WANT_TO_ANALYZE');
    const helpers = [
        translate('CHOOSE_THE_DEPENDENCIES_YOU_WANT_TO_ANALYZE_HELP'),
        translate('TAKE_INTO_CONSIDERATION_THAT_SELECTING_ALL_DEPENDENCIES')
    ];

    const onDependencyChange = (dependency: string) => {
        onChange({
            type: ACTIONS.SET_DEPENDENCIES,
            payload: dependency,
        });
    }

    return (
        <Select
            label={label}
            helpers={helpers}
            options={OPTIONS}
            onChange={onDependencyChange}
            value={value}
        />
    )
};

export { Dependencies };
