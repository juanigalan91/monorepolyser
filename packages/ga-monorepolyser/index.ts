import * as core from '@actions/core';
import { main as checkDependencies } from '@monorepolyser/ga-check-dependencies';

const main = async () => {
  const shouldCheckDependencies = core.getInput('check-dependencies');

  if (shouldCheckDependencies) {
    await checkDependencies();
  }
};

main();
