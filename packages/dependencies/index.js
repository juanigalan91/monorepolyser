const path = require('path');
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

function getWorkingDirectory() {
    return process.env['GITHUB_WORKSPACE'] ? process.env['GITHUB_WORKSPACE'] : process.cwd();
}

function getWorkspaces() {
    const root = getWorkingDirectory();

    const packages = getPackages(require(path.join(root, 'package.json')));
    return packages;
}

function getPackagesFromWorkspaces(workspaces) {
    const root = getWorkingDirectory();
    const packages = {};
    const promises = [];

    workspaces.forEach((workspace, index) => {
        promises.push(new Promise((resolve, reject) => {
            glob(`${workspace}/package.json`, { cwd: root }, (err, matches) => {
                matches.forEach((match) => {
                    const pkg = require(`${root}/${match}`);
    
                    const { name, dependencies, devDependencies } = pkg;
                    packages[name] = {
                        dependencies,
                        devDependencies,
                    };
                });

                resolve();
            });
        }))
    });

    return Promise.all(promises).then((results) => {
        return {
            packages,
            workspaces,
        };
    });
}

module.exports = {
    getWorkspaces,
    getPackagesFromWorkspaces,
};
