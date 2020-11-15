import * as github from '@actions/github';

const getCurrentPR = () => {
  const { context } = github;

  return context.payload.pull_request || null;
};

const addCommentToCurrentPR = (comment: string) => {
  const currentPR = getCurrentPR();

  if (currentPR) {
    const githubToken = process.env.GITHUB_TOKEN;
    const client = new github.GitHub(githubToken);

    const { context } = github;

    client.issues.createComment({
      ...context.repo,
      // eslint-disable-next-line @typescript-eslint/camelcase
      issue_number: currentPR.number,
      body: comment,
    });
  }
};

export { addCommentToCurrentPR };
