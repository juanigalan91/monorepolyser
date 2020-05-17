const core = require('@actions/core');
const packageJson = require('../../package.json');

const main = async () => {
  console.log(packageJson.workspaces);
}

main().catch(err => core.setFailed(err.message));
