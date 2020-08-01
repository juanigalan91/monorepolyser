import { DEPENDENCIES, GRAPH_TYPE, Workspace, ALL_WORKSPACES } from '../types';

export enum STATUS {
    CONFIGURING = 'CONFIGURING',
    BROWSING = 'BROWSING'
}

export interface State {
    workspace: Workspace;
    dependencies: DEPENDENCIES;
    graphType: GRAPH_TYPE;
    status: STATUS;
}

export const initialState: State = {
    workspace: ALL_WORKSPACES,
    dependencies: DEPENDENCIES.DEPENDENCIES,
    graphType: GRAPH_TYPE.FIRST_LEVEL_GRAPH,
    status: STATUS.CONFIGURING,
};

export enum ACTIONS {
    SET_WORKSPACE = 'SET_WORKSPACE',
    SET_DEPENDENCIES = 'SET_DEPENDENCIES',
    SET_GRAPH_TYPE = 'SET_GRAPH_TYPE',
    SET_STATUS = 'SET_STATUS',
}

export interface Action {
    type: ACTIONS;
    payload: any;
}

export const reducer = (state: State, action: Action): State => {
    const { type, payload } = action;

    switch(type) {
        case ACTIONS.SET_DEPENDENCIES:
            return { ...state, dependencies: payload };
        case ACTIONS.SET_GRAPH_TYPE:
            return { ...state, graphType: payload };
        case ACTIONS.SET_WORKSPACE:
            return { ...state, workspace: payload };
        case ACTIONS.SET_STATUS:
            return { ...state, status: payload };
        default:
            return state;
    }
}

export const initState = (state: State) => state;