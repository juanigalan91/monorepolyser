const fs = require('fs');
const path = require('path');
const findRoot = require('find-root');
const flatten = require('flatten');
const glob = require('glob');

function getPackages(packageJson) {
    if (!('workspaces' in packageJson)) {
        return null;
    }
    const { workspaces } = packageJson;
    if (Array.isArray(workspaces)) {
        return workspaces;
    }
    return workspaces.packages || null;
}

/**
 * Retrieves the different workspaces that are configured for this repo
 */
function getWorkspaces(from) {
    const root = findRoot(from, (dir) => {
        const pkg = path.join(dir, 'package.json');
        return fs.existsSync(pkg) && getPackages(require(pkg)) !== null;
    });

    const packages = getPackages(require(path.join(root, 'package.json')));
    return flatten(packages.map((name) => glob.sync(path.join(root, `${name}/`))));
}

module.exports = {
    getWorkspaces,
};
