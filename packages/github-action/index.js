const core = require('@actions/core');
const glob = require('@actions/glob');
const packageJson = require('../../package.json');
const fs = require('fs');
const { getWorkspaces } = require('@monorepolyser/generator');

const main = async () => {
    console.log(getWorkspaces(__dirname));
    const patterns = packageJson.workspaces.map((workspace) => `${workspace}/package.json`);
    const globber = await glob.create(patterns.join('\n'));
    const packages = await globber.glob();

    /**packages.map((pkg) => {
        const pkgJsonFile = require(pkg);
        console.log(pkgJsonFile.dependencies);
    });*/

    fs.writeFileSync('dependencies.json', JSON.stringify(packages), { encoding: 'UTF-8'});
}

main().catch(err => core.setFailed(err.message));
