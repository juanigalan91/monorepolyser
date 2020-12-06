import * as utils from './utils';

describe('Dependencies Utils', () => {
  it('returns workspaces from package json', () => {
    const workspaces = utils.getWorkspacesFromPackageJson({
      workspaces: ['packages/**'],
      name: 'test',
      version: '1.0.0',
    });

    expect(workspaces).toEqual(['packages/**']);
  });

  it('returns null since there are no workspaces defined', () => {
    const workspaces = utils.getWorkspacesFromPackageJson({
      name: 'test',
      version: '1.0.0',
    });

    expect(workspaces).toEqual(null);
  });

  it('returns null since workspaces is not an array', () => {
    const workspaces = utils.getWorkspacesFromPackageJson({
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      workspaces: {},
      name: 'test',
      version: '1.0.0',
    });

    expect(workspaces).toEqual(null);
  });

  it('returns an empty array since the only workspace was ignored', () => {
    const workspaces = utils.filterWorkspaces({
      workspaces: ['packages/**/**'],
      workspacesToIgnore: ['packages'],
    });

    expect(workspaces).toEqual([]);
  });

  it('returns list of workspaces since not all of them were ignored', () => {
    const workspaces = utils.filterWorkspaces({
      workspaces: ['packages/**/**', 'dev-packages/**/**'],
      workspacesToIgnore: ['packages'],
    });

    expect(workspaces).toEqual(['dev-packages/**/**']);
  });

  it('returns all workspaces since none of them were ignored', () => {
    const workspaces = utils.filterWorkspaces({
      workspaces: ['packages/**/**', 'dev-packages/**/**'],
      workspacesToIgnore: [],
    });

    expect(workspaces).toEqual(['packages/**/**', 'dev-packages/**/**']);
  });
});
