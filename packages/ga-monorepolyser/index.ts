import * as core from '@actions/core';
import { main as checkDependencies } from '@monorepolyser/ga-check-dependencies';

const main = async () => {
  const shouldCheckDependencies: boolean = core.getInput('check-dependencies') === 'true';
  const includeMainPackageJson: boolean = core.getInput('include-main-package-json') === 'true';
  const workspacesToIgnore: string = core.getInput('ignore-workspaces');
  const onlyWarn: boolean = core.getInput('only-warn') === 'true';

  if (shouldCheckDependencies) {
    await checkDependencies({
      workspacesToIgnore: workspacesToIgnore.length > 0 ? workspacesToIgnore.split(',') : [],
      includeMainPackageJson,
      onlyWarn,
    });
  }
};

main();
