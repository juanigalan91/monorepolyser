const core = require('@actions/core');
const glob = require('@actions/glob');
const packageJson = require('../../package.json');

const main = async () => {
    const patterns = packageJson.workspaces.map((workspace) => `${workspace}/package.json`);
    const globber = await glob.create(patterns.join('\n'));
    const packages = await globber.glob();

    packages.map((pkg) => {
        const pkgJsonFile = require(pkg);
        console.log(pkgJsonFile.dependencies);
    });
}

main().catch(err => core.setFailed(err.message));
