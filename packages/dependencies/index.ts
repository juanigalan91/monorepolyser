import glob from 'glob';
import { Body } from 'package-json-types';
import { ProjectMetadata } from './types';
import { getWorkingDirectory, getRootPackageJson, getWorkspaces } from './utils';

/**
 * Retrieves the metadata for a specific list of workspaces, returning the packages in that workspaces
 * with their dependencies, name, version and development dependencies.
 * @param workspaces - list of workspaces to parse
 */
const getProjectMetadata = (): ProjectMetadata => {
  const workspaces = getWorkspaces();
  const root = getWorkingDirectory();
  const rootPackageJson = getRootPackageJson();
  const packages: Record<string, Body> = {};

  /**
   * For each workspace retrieve the different package jsons that could be in that workspace,
   * load up each package json and retrieve their metadata.
   */
  workspaces.forEach((workspace) => {
    const matches = glob.sync(`${workspace}/package.json`, { cwd: root });

    matches.forEach((match) => {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const pkg = require(`${root}/${match}`);

      const { name } = pkg;
      packages[name] = pkg;
    });
  });

  /**
   * We also want to include the root package json metadata because these will be also dependencies
   * that will be installed, so we want to check them as well
   */
  packages[rootPackageJson.name] = {
    name: rootPackageJson.name,
    version: rootPackageJson.version,
    dependencies: rootPackageJson.dependencies,
    devDependencies: rootPackageJson.devDependencies,
  };

  const projectMetadata: ProjectMetadata = {
    packages,
    workspaces,
  };

  return projectMetadata;
};

export { getProjectMetadata };
