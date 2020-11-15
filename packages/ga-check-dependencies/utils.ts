import { getPackagesFromWorkspaces } from '@monorepolyser/dependencies';

import { IncoherentDependency } from './types';

export interface GetIncoherentDependencies {
  /** Key/value where key is the dependency name and the value is a list of the found incoherent dependencies */
  incoherentDependencies: Record<string, IncoherentDependency[]>;
  /** Key value of all the dependencies with their corresponding versions */
  deps: Record<string, string>;
}

/**
 * Calculates if there are any incoherent dependencies on the current project
 */
const getIncoherentDependencies = (): GetIncoherentDependencies => {
  const incoherentDependencies: Record<string, IncoherentDependency[]> = {};
  const deps: Record<string, string> = {};
  const { packages } = getPackagesFromWorkspaces();

  /**
   * For each of the found packages in each workspace, we iterate through their dependencies
   * and we try to find if there are packages using different versions
   */
  Object.keys(packages).forEach((pkgName) => {
    const pkg = packages[pkgName];
    const { dependencies } = pkg;

    if (dependencies) {
      Object.keys(dependencies).forEach((dep) => {
        const version = dependencies[dep];

        /**
         * If the dependency was found, it means that another package is using it and we need to
         * check that we are using the same dependency version.
         */
        if (deps[dep]) {
          const detectedVersion = deps[dep];

          if (version !== detectedVersion) {
            /**
             * If the version is different, we need to add it to the list of incoherent dependencies.
             * Since multiple versions for the same package could be coherent, for each dependency
             * we have a list of possible incoherent dependencies.
             */
            if (!incoherentDependencies[dep]) {
              incoherentDependencies[dep] = [];
            }

            incoherentDependencies[dep].push({
              name: dep,
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
