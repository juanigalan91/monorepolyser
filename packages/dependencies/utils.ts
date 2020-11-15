import * as path from 'path';
import { Body } from 'package-json-types';

/**
 * Retrieves the workspaces property from a package json
 * @param packageJson - package to retrieve the workspaces from
 */
const getWorkspacesFromPackageJson = (packageJson: Body): Body['workspaces'] | null => {
  const { workspaces } = packageJson;

  if (Array.isArray(workspaces)) {
    return workspaces;
  }

  return null;
};

/** Retrieves the current working directory for the target repo */
const getWorkingDirectory = (): string => {
  return process.env.GITHUB_WORKSPACE ? process.env.GITHUB_WORKSPACE : process.cwd();
};

/** Returns the package json located on the root of the target repo */
const getRootPackageJson = (): Body => {
  const root = getWorkingDirectory();

  // eslint-disable-next-line import/no-dynamic-require, global-require
  return require(path.join(root, 'package.json'));
};

/** Returns the workspaces property located on the root of the target repo */
const getWorkspaces = (): Body['workspaces'] => {
  const workspaces = getWorkspacesFromPackageJson(getRootPackageJson());

  return workspaces;
};

export { getWorkspacesFromPackageJson, getRootPackageJson, getWorkingDirectory, getWorkspaces };
