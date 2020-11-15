import { getWorkspaces, getPackagesFromWorkspaces } from '@monorepolyser/dependencies';

import { RepeatedDependency } from './types';

export interface GetIncoherentDependencies {
  incoherentDependencies: Record<string, RepeatedDependency[]>;
  deps: Record<string, string>;
}

const getIncoherentDependencies = (): GetIncoherentDependencies => {
  const incoherentDependencies: Record<string, RepeatedDependency[]> = {};
  const deps: Record<string, string> = {};
  const workspaces = getWorkspaces();
  const { packages } = getPackagesFromWorkspaces(workspaces);

  Object.keys(packages).forEach((pkgName) => {
    const pkg = packages[pkgName];
    const { dependencies } = pkg;

    if (dependencies) {
      Object.keys(dependencies).forEach((dep) => {
        const version = dependencies[dep];

        if (deps[dep]) {
          const detectedVersion = deps[dep];

          if (version !== detectedVersion) {
            if (!incoherentDependencies[dep]) {
              incoherentDependencies[dep] = [];
            }

            incoherentDependencies[dep].push({
              addedBy: pkgName,
              version,
            });
          }
        } else {
          deps[dep] = version;
        }
      });
    }
  });

  return {
    incoherentDependencies,
    deps,
  };
};

export { getIncoherentDependencies };
