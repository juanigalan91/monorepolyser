import * as core from '@actions/core';
import * as github from '@actions/github';
import { getWorkspaces, getPackagesFromWorkspaces } from '@monorepolyser/dependencies';

import { RepeatedDependency } from './types';

const repeatedDependencies: Record<string, RepeatedDependency[]> = {};
const deps: Record<string, string> = {};

const main = async () => {
  try {
    const workspaces = getWorkspaces();
    const { packages } = getPackagesFromWorkspaces(workspaces);

    Object.keys(packages).forEach((pkgName) => {
      const pkg = packages[pkgName];
      const { dependencies } = pkg;

      if (dependencies) {
        Object.keys(dependencies).forEach((dep) => {
          const version = dependencies[dep];

          if (deps[dep]) {
            const detectedVersion = deps[dep];

            if (version !== detectedVersion) {
              if (!repeatedDependencies[dep]) {
                repeatedDependencies[dep] = [];
              }

              repeatedDependencies[dep].push({
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

    const repeatedDeps = Object.keys(repeatedDependencies);

    if (repeatedDeps.length > 0) {
      const githubToken = process.env.GITHUB_TOKEN;
      const client = new github.GitHub(githubToken);

      const { context } = github;
      if (context.payload.pull_request == null) {
        core.setFailed('No pull request found.');
        return;
      }

      const pullRequestNumber = context.payload.pull_request.number;
      let body = '## Dependencies check \n\n';

      body = `${body}Some of the packages in your monorepo use different dependencies, which can lead to multiple versions ending up in your production bundle\n`;
      body = `${body}| Dependency | Added by | Added Version | Base version\n| :-----------: |:-------------:| :----------:| :----------:|\n`;

      repeatedDeps.forEach((repeatedDep) => {
        const versions = repeatedDependencies[repeatedDep];
        versions.forEach((v) => {
          const row = `| ${repeatedDep} | ${v.addedBy} | ${v.version} | ${deps[repeatedDep]} |\n`;
          body = `${body}${row}`;
        });
      });

      client.issues.createComment({
        ...context.repo,
        // eslint-disable-next-line @typescript-eslint/camelcase
        issue_number: pullRequestNumber,
        body,
      });

      throw new Error('There are deps with different versions');
    } else {
      // eslint-disable-next-line no-console
      console.log('All packages are using the same versions of their dependencies!');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};

export { main };
