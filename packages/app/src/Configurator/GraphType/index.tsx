import React from 'react';
import { useTranslate } from '../../Context';
import { Select } from '../Select';

const OPTIONS = ['FIRST_LEVEL_GRAPH', 'COMPLETE_GRAPH'];

const GraphType: React.FC<any> = () => {
    const { translate } = useTranslate();
    const label = translate('CHOOSE_THE_TYPE_OF_GRAPH_YOU_WANT_TO_ANALYZE');

    const helpers = [
        translate('CHOOSE_THE_TYPE_OF_GRAPH_YOU_WANT_TO_ANALYZE_HELP'),
        translate('IF_YOU_SELECT_TO_ONLY_SEE_FIRST_LEVEL'),
        translate('IF_YOU_SELECT_TO_ONLY_SEE_COMPLETE_GRAPH'),
        translate('TAKE_INTO_CONSIDERATION_THAT_SELECTING_COMPLETE_GRAPH'),
    ];

    return (
        <Select label={label} helpers={helpers} options={OPTIONS} />
    )
};

export { GraphType };
