import * as dependencies from '.';

jest.mock('./utils', () => {
  return {
    getWorkingDirectory: () => 'root',
    getWorkspaces: () => ['packages/**'],
    getRootPackageJson: () => {
      return {
        name: '@module/root',
        version: '1.0.0',
        dependencies: {
          jest: '26.8.3',
        },
      };
    },
  };
});

jest.mock('glob', () => {
  return {
    sync: () => ['@module/search', '@module/home', '@module/admin'],
  };
});

jest.mock(
  'root/@module/search',
  () => {
    return {
      name: '@module/search',
      version: '1.0.0',
      dependencies: {
        react: '16.8.3',
      },
    };
  },
  { virtual: true }
);

jest.mock(
  'root/@module/home',
  () => {
    return {
      name: '@module/home',
      version: '1.0.0',
      dependencies: {
        react: '16.8.3',
        lodash: '0.19.0',
      },
    };
  },
  { virtual: true }
);

jest.mock(
  'root/@module/admin',
  () => {
    return {
      name: '@module/admin',
      version: '1.0.0',
      dependencies: {
        react: '16.8.3',
      },
    };
  },
  { virtual: true }
);

describe('Dependencies', () => {
  it('returns the workspace packages grouped by package name', () => {
    const project = dependencies.getPackagesFromWorkspaces();

    expect(project).toMatchSnapshot();
    expect(project.packages).toBeDefined();
    expect(project.workspaces).toBeDefined();

    expect(Object.keys(project.packages)).toHaveLength(4);
    expect(project.packages['@module/ljkslkdflkdfslkljdfglhjdgf']).toBeDefined();
    expect(project.packages['@module/home']).toBeDefined();
    expect(project.packages['@module/root']).toBeDefined();
    expect(project.packages['@module/search']).toBeDefined();
  });
});
