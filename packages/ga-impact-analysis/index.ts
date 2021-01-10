import * as github from '@actions/github';
import { MainOptions, VERBOSE } from '@monorepolyser/dependencies/types';
import { isFileInAWorkspace } from '@monorepolyser/dependencies/utils';
import { addCommentToCurrentPR, Comment, addLabelsToCurrentPR } from '@monorepolyser/ga-utils';

import { calculatePackagesDependencies } from './utils';

export interface ImpactAnalysisOptions extends MainOptions {
  highImpactThreshold: number;
  highImpactLabels: string[];
  onHighImpact: string[];
}

const main = async (options: ImpactAnalysisOptions) => {
  const githubToken = process.env.GITHUB_TOKEN;
  const client = new github.GitHub(githubToken);
  const { project, highImpactThreshold, onHighImpact, highImpactLabels, verbose } = options;
  const { totalPackages } = project;
  const { dependedOnPackages } = calculatePackagesDependencies(project);
  const analysis: Record<string, string[]> = {
    high: [],
    low: [],
  };

  const { context } = github;

  const { eventName } = context;

  let base: string | undefined;
  let head: string | undefined;

  switch (eventName) {
    case 'pull_request':
      base = context.payload.pull_request?.base?.sha;
      head = context.payload.pull_request?.head?.sha;
      break;
    case 'push':
      base = context.payload.before;
      head = context.payload.after;
      break;
    default:
      break;
  }

  const response = await client.repos.compareCommits({
    base,
    head,
    owner: context.repo.owner,
    repo: context.repo.repo,
  });

  if (response && response.data && response.data.files) {
    response.data.files.forEach((file) => {
      const { filename } = file;

      if (isFileInAWorkspace(filename, project.workspaces)) {
        const [pkg, module] = filename.split('/');
        const packageInfo = project.packagesByPath[`${pkg}/${module}/package.json`];
        const { name } = packageInfo;
        const totalDependedOnPackages = dependedOnPackages[name];
        const impact = (totalDependedOnPackages / totalPackages) * 100;

        if (impact >= highImpactThreshold) {
          if (analysis.high.indexOf(name) < 0) {
            analysis.high.push(name);
          }
        } else if (analysis.low.indexOf(name) < 0) {
          analysis.low.push(name);
        }
      }
    });

    if (analysis.high.length > 0) {
      if (onHighImpact.indexOf('comment') >= 0) {
        const comment = new Comment();

        comment.addTitle({
          title: 'Impact Analysis',
          level: 2,
        });
        comment.addText({
          text:
            'One or several core packages have been modified, and this PR has been flagged as high impact. The modified packages are the following:',
        });

        const rows: string[][] = [];
        analysis.high.forEach((highImpactModule) => {
          rows.push([highImpactModule]);
        });

        comment.addTable({
          columns: ['Package'],
          rows,
        });

        addCommentToCurrentPR(comment);
      }

      if (onHighImpact.indexOf('add-labels') >= 0) {
        addLabelsToCurrentPR(highImpactLabels);
      }
    }
  }

  if (verbose) {
    let verboseComment;
    const verboseRows: any[][] = [];

    Object
      .keys(dependedOnPackages)
      .forEach((key: string) => {
        const dependedModules = dependedOnPackages[key];

        verboseRows.push([key, dependedModules]);
      });

    verboseRows.sort((a, b) => {
      const [, aDeps] = a;
      const [, bDeps] = b;

      return aDeps - bDeps;
    });

    switch (verbose) {
      case VERBOSE.COMMENT:
        verboseComment = new Comment();

        verboseComment.addTitle({
          title: 'Impact Analysis',
          level: 2,
        });

        verboseComment.addText({
          text:
            'Here is a report your packages dependencies, showing the packages order from most depended on to least depended on:',
        });

        verboseComment.addTable({
          columns: ['Package', 'Packages that depend on this package'],
          rows: verboseRows,
        });

        addCommentToCurrentPR(verboseComment);

        break;
      default:
        // eslint-disable-next-line no-console
        console.log(verboseRows);
        break;
    }
  }
};

export { main };
