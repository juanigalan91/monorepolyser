import * as core from '@actions/core';
import { main as checkDependencies } from '@monorepolyser/ga-check-dependencies';

const main = async () => {
  const shouldCheckDependencies = core.getInput('check-dependencies');
  const workspacesToIgnore: string = core.getInput('ignore-workspaces') || '';

  if (shouldCheckDependencies) {
    await checkDependencies({ workspacesToIgnore: workspacesToIgnore.split(',') });
  }
};

main();
