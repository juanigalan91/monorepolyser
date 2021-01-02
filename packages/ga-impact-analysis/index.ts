import * as core from '@actions/core';
import * as github from '@actions/github';

const main = async (options?: any) => {
  const githubToken = process.env.GITHUB_TOKEN;
  const client = new github.GitHub(githubToken);

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

  console.log(response.data);
};

export { main };
