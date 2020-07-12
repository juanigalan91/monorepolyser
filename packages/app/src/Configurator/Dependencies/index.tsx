import React from 'react';
import { useTranslate } from '../../Context';
import { Select } from '../Select';

const OPTIONS = ['DEPENDENCIES', 'DEV_DEPENDENCIES', 'ALL_DEPENDENCIES'];

const Dependencies: React.FC<any> = () => {
    const { translate } = useTranslate();
    const label = translate('CHOOSE_THE_DEPENDENCIES_YOU_WANT_TO_ANALYZE');
    const helpers = [
        translate('CHOOSE_THE_DEPENDENCIES_YOU_WANT_TO_ANALYZE_HELP'),
        translate('TAKE_INTO_CONSIDERATION_THAT_SELECTING_ALL_DEPENDENCIES')
    ];

    return (
        <Select label={label} helpers={helpers} options={OPTIONS} />
    )
};

export { Dependencies };
