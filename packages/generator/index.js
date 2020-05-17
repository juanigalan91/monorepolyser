const core = require('@actions/core');
const glob = require('@actions/glob');
const packageJson = require('../../package.json');

const main = async () => {
    const patterns = packageJson.workspaces;
    const globber = await glob.create(patterns.join('\n'));
    const files = await globber.glob();
    console.log(files);
}

main().catch(err => core.setFailed(err.message));
