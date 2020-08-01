import React, { Dispatch } from 'react';
import { useTranslate } from '../../Context';
import { Select } from '../Select';
import { Workspace, ALL_WORKSPACES } from '../../types';
import { Action, ACTIONS } from '../../App/state';

export interface WorkspacesProps {
    workspaces: Workspace[];
    onChange: Dispatch<Action>;
    value: Workspace;
}

const Workspaces: React.FC<WorkspacesProps> = ({ workspaces, onChange, value }) => {
    const { translate } = useTranslate();
    const label = translate('CHOOSE_THE_WORKSPACE_YOU_WANT_TO_ANALYZE');
    const options = React.useMemo(() => {
        return [
            translate(ALL_WORKSPACES),
            ...workspaces,
        ];
    }, [workspaces, translate])

    const helpers = [
        translate('CHOOSE_THE_WORKSPACE_YOU_WANT_TO_ANALYZE_HELP'),
        translate('TAKE_INTO_CONSIDERATION_THAT_SELECTING_ALL_WORKSPACES'),
    ];

    const onWorkspaceChange = (workspace: string) => {
        onChange({
            type: ACTIONS.SET_WORKSPACE,
            payload: workspace,
        });
    }

    return (
        <Select
            label={label}
            helpers={helpers}
            options={options}
            onChange={onWorkspaceChange}
            value={value}
        />
    )
};

export { Workspaces };
