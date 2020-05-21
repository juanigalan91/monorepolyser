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

function getWorkspaces(from) {
    console.log(from);
    const root = findRoot(from, (dir) => {
        const pkg = path.join(dir, 'package.json');
        return fs.existsSync(pkg) && getPackages(require(pkg)) !== null;
    });
    console.log(root);

    const packages = getPackages(require(path.join(root, 'package.json')));
    return packages;
}

module.exports = {
    getWorkspaces,
};
