const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest")

async function run() {
  try {
    // Required inputs
    const token = process.env.GITHUB_TOKEN;
    // Optional inputs, with defaults
    const ref = process.env.REF;
    const [owner, repo] = [github.context.repo.owner, github.context.repo.repo];

    const octokit = new Octokit({
        auth: token,
    });

    await octokit.request('POST /repos/{owner}/{repo}/dispatches', {
      owner,
      repo,
      event_type: 'trigger_ci',
      client_payload: {
        ref,
      }
    });
  } catch (error) {
    core.setFailed(error.message)
  }
}

//
// Call the main task run function
//
run();
