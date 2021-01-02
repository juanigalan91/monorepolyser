import * as utils from './utils';

describe('Check Dependencies - Utils', () => {
  it('returns no incoherent dependencies when all packages use the same versions', () => {
    const project = {
      packages: {
        '@module/admin': {
          dependencies: {
            react: '16.8.3',
          },
          name: '@module/admin',
          version: '1.0.0',
        },
        '@module/home': {
          dependencies: {
            lodash: '0.19.0',
            react: '16.8.3',
          },
          name: '@module/home',
          version: '1.0.0',
        },
        '@module/root': {
          dependencies: {
            jest: '26.8.3',
          },
          name: '@module/root',
          version: '1.0.0',
        },
        '@module/search': {
          name: '@module/search',
          version: '1.0.0',
        },
      },
      packagesByPath: {},
      workspaces: ['packages/**'],
    };

    const deps = utils.getIncoherentDependencies(project);

    expect(deps).toMatchSnapshot();
    expect(Object.keys(deps.incoherentDependencies)).toHaveLength(0);
    expect(Object.keys(deps.deps)).toHaveLength(3);
  });

  it('returns incoherent dependencies when a package is using a different version', () => {
    const project = {
      packages: {
        '@module/admin': {
          dependencies: {
            react: '16.8.3',
          },
          name: '@module/admin',
          version: '1.0.0',
        },
        '@module/home': {
          dependencies: {
            lodash: '0.19.0',
            react: '16.8.4',
          },
          name: '@module/home',
          version: '1.0.0',
        },
        '@module/root': {
          dependencies: {
            jest: '26.8.3',
          },
          name: '@module/root',
          version: '1.0.0',
        },
        '@module/search': {
          name: '@module/search',
          version: '1.0.0',
        },
      },
      packagesByPath: {},
      workspaces: ['packages/**'],
    };

    const deps = utils.getIncoherentDependencies(project);
    const incohorentDeps = Object.keys(deps.incoherentDependencies);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const reactDep = deps.incoherentDependencies.react;

    expect(deps).toMatchSnapshot();
    expect(incohorentDeps).toHaveLength(1);
    expect(reactDep).toHaveLength(1);
    expect(reactDep[0].addedBy).toEqual('@module/home');
    expect(Object.keys(deps.deps)).toHaveLength(3);
  });

  it('returns incoherent dependencies when a package is using several different versions', () => {
    const project = {
      packages: {
        '@module/admin': {
          dependencies: {
            react: '16.8.3',
          },
          name: '@module/admin',
          version: '1.0.0',
        },
        '@module/home': {
          dependencies: {
            lodash: '0.19.0',
            react: '16.8.4',
          },
          name: '@module/home',
          version: '1.0.0',
        },
        '@module/root': {
          dependencies: {
            jest: '26.8.3',
          },
          name: '@module/root',
          version: '1.0.0',
        },
        '@module/search': {
          name: '@module/search',
          version: '1.0.0',
          dependencies: {
            react: '16.8.5',
          },
        },
      },
      packagesByPath: {},
      workspaces: ['packages/**'],
    };

    const deps = utils.getIncoherentDependencies(project);
    const incohorentDeps = Object.keys(deps.incoherentDependencies);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const reactDep = deps.incoherentDependencies.react;

    expect(deps).toMatchSnapshot();
    expect(incohorentDeps).toHaveLength(1);
    expect(reactDep).toHaveLength(2);
    expect(reactDep[0].addedBy).toEqual('@module/home');
    expect(Object.keys(deps.deps)).toHaveLength(3);
  });
});
