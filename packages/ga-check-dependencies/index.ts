import * as core from '@actions/core';
import { addCommentToCurrentPR } from '@monorepolyser/ga-utils';

import { getIncoherentDependencies } from './utils';

const main = async () => {
  try {
    const { incoherentDependencies, deps } = getIncoherentDependencies();

    const repeatedDeps = Object.keys(incoherentDependencies);

    if (repeatedDeps.length > 0) {
      let body = '## Dependencies check \n\n';

      body = `${body}Some of the packages in your monorepo use different dependencies, which can lead to multiple versions ending up in your production bundle\n`;
      body = `${body}| Dependency | Added by | Added Version | Base version\n| :-----------: |:-------------:| :----------:| :----------:|\n`;

      repeatedDeps.forEach((repeatedDep) => {
        const versions = incoherentDependencies[repeatedDep];
        versions.forEach((v) => {
          const row = `| ${repeatedDep} | ${v.addedBy} | ${v.version} | ${deps[repeatedDep]} |\n`;
          body = `${body}${row}`;
        });
      });

      addCommentToCurrentPR(body);

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
