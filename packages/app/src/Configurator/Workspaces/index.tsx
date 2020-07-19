import React from 'react';
import { useTranslate } from '../../Context';
import { Select } from '../Select';
import { Workspace } from '../../types';

export interface WorkspacesProps {
    workspaces: Workspace[];
}

const Workspaces: React.FC<WorkspacesProps> = ({ workspaces }) => {
    const { translate } = useTranslate();
    const label = translate('CHOOSE_THE_WORKSPACE_YOU_WANT_TO_ANALYZE');
    const options = React.useMemo(() => {
        return [
            translate('ALL_WORKSPACES'),
            ...workspaces,
        ];
    }, [workspaces, translate])

    const helpers = [
        translate('CHOOSE_THE_WORKSPACE_YOU_WANT_TO_ANALYZE_HELP'),
        translate('TAKE_INTO_CONSIDERATION_THAT_SELECTING_ALL_WORKSPACES'),
    ];

    return (
        <Select label={label} helpers={helpers} options={options} />
    )
};

export { Workspaces };
