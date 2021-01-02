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

const filterWorkspaces = ({ workspacesToIgnore = [], workspaces = [] }): Body['workspaces'] => {
  return workspaces.filter((workspace) => {
    for (let i = 0; i < workspacesToIgnore.length; i += 1) {
      const workspaceToIgnore = workspacesToIgnore[i];

      if (workspace.indexOf(workspaceToIgnore) === 0) {
        // eslint-disable-next-line no-console
        console.log(`ignoring workspace ${workspaceToIgnore} since it was specified in the action config`);
        return false;
      }
    }

    return true;
  });
};

/** Returns the workspaces property located on the root of the target repo */
const getWorkspaces = ({ workspacesToIgnore = [] }): Body['workspaces'] => {
  const workspaces = getWorkspacesFromPackageJson(getRootPackageJson());

  return filterWorkspaces({ workspaces, workspacesToIgnore });
};

const isFileInAWorkspace = (filename: string, workspaces: string[]) => {
  const tokens = filename.split('/');
  let isInWorkspace = false;

  if (tokens.length > 1) {
    const [firstFolder] = tokens;

    for (let i = 0; i < workspaces.length && !isInWorkspace; i += 1) {
      const workspace = workspaces[i];
      isInWorkspace = isInWorkspace || workspace.indexOf(firstFolder) === 0;
    }
  }

  return isInWorkspace;
};

export {
  getWorkspacesFromPackageJson,
  getRootPackageJson,
  getWorkingDirectory,
  getWorkspaces,
  filterWorkspaces,
  isFileInAWorkspace,
};
