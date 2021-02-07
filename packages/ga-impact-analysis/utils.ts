import { ProjectMetadata } from '@monorepolyser/dependencies/types';

const calculatePackagesDependencies = (project: ProjectMetadata) => {
  const dependedOnPackages: Record<string, number> = {};
  const { packages } = project;

  Object.keys(packages).forEach((pkgName) => {
    const pkg = packages[pkgName];
    const { dependencies } = pkg;

    if (dependencies) {
      Object.keys(dependencies).forEach((dep) => {
        if (dependedOnPackages[dep]) {
          dependedOnPackages[dep] += 1;
        } else {
          dependedOnPackages[dep] = 1;
        }
      });
    }
  });

  return { dependedOnPackages };
};

const getPackagesFlaggedManuallyAsHighImpact = (project: ProjectMetadata, highImpactPackagesRegexp: string | null) => {
  const { packages } = project;
  const flaggedPackages: string[] = [];

  if (highImpactPackagesRegexp) {
    const regexp = new RegExp(highImpactPackagesRegexp);

    Object.keys(packages).forEach((pkgName) => {
      const { name } = packages[pkgName];

      if (regexp.test(name)) {
        flaggedPackages.push(name);
      }
    });
  }

  return flaggedPackages;
};

export { calculatePackagesDependencies, getPackagesFlaggedManuallyAsHighImpact };
