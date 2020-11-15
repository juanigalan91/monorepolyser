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
});
