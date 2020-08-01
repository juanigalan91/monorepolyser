import React, { Dispatch } from 'react';
import { useTranslate } from '../../Context';
import { Select } from '../Select';
import { GRAPH_TYPE } from '../../types';
import { Action, ACTIONS } from '../../App/state';

const OPTIONS = [GRAPH_TYPE.COMPLETE_GRAPH, GRAPH_TYPE.FIRST_LEVEL_GRAPH];

export interface GraphTypeProps {
    onChange: Dispatch<Action>;
    value: GRAPH_TYPE;
}

const GraphType: React.FC<GraphTypeProps> = ({ onChange, value }) => {
    const { translate } = useTranslate();
    const label = translate('CHOOSE_THE_TYPE_OF_GRAPH_YOU_WANT_TO_ANALYZE');

    const helpers = [
        translate('CHOOSE_THE_TYPE_OF_GRAPH_YOU_WANT_TO_ANALYZE_HELP'),
        translate('IF_YOU_SELECT_TO_ONLY_SEE_FIRST_LEVEL'),
        translate('IF_YOU_SELECT_TO_ONLY_SEE_COMPLETE_GRAPH'),
        translate('TAKE_INTO_CONSIDERATION_THAT_SELECTING_COMPLETE_GRAPH'),
    ];

    const onGraphTypeChange = (graphType: string) => {
        onChange({
            type: ACTIONS.SET_GRAPH_TYPE,
            payload: graphType,
        });
    }

    return (
        <Select
            label={label}
            helpers={helpers}
            options={OPTIONS}
            onChange={onGraphTypeChange}
            value={value}
        />
    )
};

export { GraphType };
