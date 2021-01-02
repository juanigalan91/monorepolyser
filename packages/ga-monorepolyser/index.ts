import * as core from '@actions/core';
import { main as checkDependencies } from '@monorepolyser/ga-check-dependencies';
import { main as impactAnalysis } from '@monorepolyser/ga-impact-analysis';

const main = async () => {
  const shouldCheckDependencies: boolean = core.getInput('check-dependencies') === 'true';
  const includeMainPackageJson: boolean = core.getInput('include-main-package-json') === 'true';
  const shouldAnalyseImpact: boolean = core.getInput('impact-analysis') === 'true';
  const workspacesToIgnore: string = core.getInput('ignore-workspaces');
  const onlyWarn: boolean = core.getInput('only-warn') === 'true';

  if (shouldCheckDependencies) {
    await checkDependencies({
      workspacesToIgnore: workspacesToIgnore.length > 0 ? workspacesToIgnore.split(',') : [],
      includeMainPackageJson,
      onlyWarn,
    });
  }

  if (shouldAnalyseImpact) {
    await impactAnalysis();
  }
};

main();
