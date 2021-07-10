import * as github from '@actions/github';
import { Comment } from './Comment';

const getCurrentPR = () => {
  const { context } = github;

  return context.payload.pull_request || null;
};

const retriveCommentIdFromPr = async (comment: Comment): Promise<number> => {
  const currentPR = getCurrentPR();

  if (currentPR) {
    const githubToken = process.env.GITHUB_TOKEN;
    const client = new github.GitHub(githubToken);

    const { context } = github;

    const response = await client.issues.listComments({
      ...context.repo,
      // eslint-disable-next-line @typescript-eslint/camelcase
      issue_number: currentPR.number,
    });

    for (let i = 0; i < response.data.length; i++) {
      const comm = response.data[i];
      if (comm.body.indexOf(comment.getTitle()) === 0) {
        console.log('comment found!', comm.id);
        return comm.id;
      }
    }
  }

  return undefined;
};

const addCommentToCurrentPR = async (comment: Comment) => {
  const currentPR = getCurrentPR();

  if (currentPR) {
    const githubToken = process.env.GITHUB_TOKEN;
    const client = new github.GitHub(githubToken);

    const { context } = github;

    const commentId = await retriveCommentIdFromPr(comment);

    if (commentId) {
      client.issues.updateComment({
        ...context.repo,
        // eslint-disable-next-line @typescript-eslint/camelcase
        comment_id: commentId,
        body: comment.getBody(),
      });
    } else {
      client.issues.createComment({
        ...context.repo,
        // eslint-disable-next-line @typescript-eslint/camelcase
        issue_number: currentPR.number,
        body: comment.getBody(),
      });
    }
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
