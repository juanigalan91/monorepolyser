import * as path from 'path';
import glob from 'glob';
import { Body } from 'package-json-types';
import { ProjectMetadata } from './types';

const getPackages = (packageJson: Body): Body['workspaces'] | null => {
  const { workspaces } = packageJson;

  if (!workspaces) {
    return null;
  }

  if (Array.isArray(workspaces)) {
    return workspaces;
  }

  return null;
};

const getWorkingDirectory = (): string => {
  return process.env.GITHUB_WORKSPACE ? process.env.GITHUB_WORKSPACE : process.cwd();
};

const getRootPackageJson = (): Body => {
  const root = getWorkingDirectory();

  // eslint-disable-next-line import/no-dynamic-require, global-require
  return require(path.join(root, 'package.json'));
};

const getWorkspaces = (): Body['workspaces'] => {
  const packages = getPackages(getRootPackageJson());

  return packages;
};

const getPackagesFromWorkspaces = (workspaces: Body['workspaces']): Promise<ProjectMetadata> => {
  const root = getWorkingDirectory();
  const rootPackageJson = getRootPackageJson();
  const packages: Record<string, Body> = {};
  const promises: Array<Promise<any>> = [];

  workspaces.forEach((workspace) => {
    promises.push(
      new Promise((resolve) => {
        glob(`${workspace}/package.json`, { cwd: root }, (err, matches) => {
          matches.forEach((match) => {
            // eslint-disable-next-line import/no-dynamic-require, global-require
            const pkg = require(`${root}/${match}`);

            const { name, dependencies, devDependencies, version } = pkg;
            packages[name] = {
              name,
              version,
              dependencies,
              devDependencies,
            };
          });

          resolve();
        });
      })
    );
  });

  packages[rootPackageJson.name] = {
    name: rootPackageJson.name,
    version: rootPackageJson.version,
    dependencies: rootPackageJson.dependencies,
    devDependencies: rootPackageJson.devDependencies,
  };

  return Promise.all(promises).then(() => {
    const projectMetadata: ProjectMetadata = {
      packages,
      workspaces,
    };

    return projectMetadata;
  });
};

export { getWorkspaces, getPackagesFromWorkspaces };
