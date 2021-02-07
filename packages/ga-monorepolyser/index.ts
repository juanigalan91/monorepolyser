import * as core from '@actions/core';
import { main as checkDependencies } from '@monorepolyser/ga-check-dependencies';
import { main as impactAnalysis } from '@monorepolyser/ga-impact-analysis';
import { getProjectMetadata } from '@monorepolyser/dependencies';
import { VERBOSE } from '@monorepolyser/dependencies/types';

const main = async () => {
  const shouldCheckDependencies: boolean = core.getInput('check-dependencies') === 'true';
  const includeMainPackageJson: boolean = core.getInput('include-main-package-json') === 'true';
  const shouldAnalyseImpact: boolean = core.getInput('impact-analysis') === 'true';
  const workspacesToIgnore: string = core.getInput('ignore-workspaces');
  const onHighImpact: string[] = core.getInput('on-high-impact').split(',');
  const highImpactLabels: string[] = core.getInput('high-impact-labels').split(',');
  const highImpactThreshold: number = parseInt(core.getInput('high-impact-threshold'), 10);
  const onlyWarn: boolean = core.getInput('only-warn') === 'true';
  const verbose: VERBOSE = core.getInput('verbose') as VERBOSE;
  const highImpactPackagesRegexp: string | null = core.getInput('high-impact-packages-regexp');

  const projectMetadataOptions = {
    workspacesToIgnore: workspacesToIgnore.length > 0 ? workspacesToIgnore.split(',') : [],
    includeMainPackageJson,
    onlyWarn,
  };

  const project = getProjectMetadata(projectMetadataOptions);

  if (shouldCheckDependencies) {
    await checkDependencies({
      project,
      onlyWarn,
      verbose,
    });
  }

  if (shouldAnalyseImpact) {
    await impactAnalysis({
      project,
      onlyWarn,
      highImpactThreshold,
      onHighImpact,
      highImpactLabels,
      verbose,
      highImpactPackagesRegexp,
    });
  }
};

main();
