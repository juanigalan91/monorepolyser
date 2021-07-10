import * as github from '@actions/github';
import { Comment } from './Comment';

const getCurrentPR = () => {
  const { context } = github;

  return context.payload.pull_request || null;
};

const addCommentToCurrentPR = (comment: Comment) => {
  const currentPR = getCurrentPR();

  if (currentPR) {
    const githubToken = process.env.GITHUB_TOKEN;
    const client = new github.GitHub(githubToken);

    const { context } = github;

    client.issues.createComment({
      ...context.repo,
      // eslint-disable-next-line @typescript-eslint/camelcase
      issue_number: currentPR.number,
      body: comment.getBody(),
    });

    const comments = client.issues.listComments({
      ...context.repo,
      // eslint-disable-next-line @typescript-eslint/camelcase
      issue_number: currentPR.number,
    });

    console.log(comments);
  }
};

const addLabelsToCurrentPR = (labels: string[]) => {
  const currentPR = getCurrentPR();

  if (currentPR) {
    const githubToken = process.env.GITHUB_TOKEN;
    const client = new github.GitHub(githubToken);

    const { context } = github;

    client.issues.addLabels({
      labels,
      ...context.repo,
      // eslint-disable-next-line @typescript-eslint/camelcase
      issue_number: currentPR.number,
    });
  }
};

export { addCommentToCurrentPR, Comment, addLabelsToCurrentPR };
