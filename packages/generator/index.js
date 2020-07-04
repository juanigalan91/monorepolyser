const fs = require('fs');
const path = require('path');
const findRoot = require('find-root');
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

function getRoot() {
    const root = findRoot(__dirname, (dir) => {
        const pkg = path.join(dir, 'package.json');
        return fs.existsSync(pkg) && getPackages(require(pkg)) !== null;
    });

    return root;
}

function getWorkspaces() {
    const root = getRoot();

    const packages = getPackages(require(path.join(root, 'package.json')));
    return packages;
}

function getPackagesFromWorkspaces(workspaces) {
    const root = getRoot();
    const packages = {};

    workspaces.forEach((workspace, index) => {
        glob(`${workspace}/package.json`, { cwd: root }, (err, matches) => {
            console.log(matches);
            matches.forEach((match) => {
                const pkg = require(`${root}/${match}`);

                const { name, dependencies, devDependencies } = pkg;
                packages[name] = {
                    dependencies,
                    devDependencies,
                };
            });
        });
    });

    return packages;
}

module.exports = {
    getWorkspaces,
    getPackagesFromWorkspaces,
};
