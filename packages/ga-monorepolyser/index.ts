import * as core from '@actions/core';
import { main as checkDependencies } from '@monorepolyser/ga-check-dependencies';

const main = async () => {
  const shouldCheckDependencies: boolean = core.getInput('check-dependencies') === 'true';
  const includeMainPackageJson: boolean = core.getInput('include-main-package-json') === 'true';
  const workspacesToIgnore: string = core.getInput('ignore-workspaces') || '';

  if (shouldCheckDependencies) {
    await checkDependencies({ workspacesToIgnore: workspacesToIgnore.split(','), includeMainPackageJson });
  }
};

main();
