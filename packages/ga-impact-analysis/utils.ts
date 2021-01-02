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

export { calculatePackagesDependencies };
