const path = require('path');
const glob = require('glob');

function getPackages(packageJson) {
    const { workspaces } = packageJson;

    if (!workspaces) {
        return null;
    }

    if (Array.isArray(workspaces)) {
        return workspaces;
    }
    return workspaces.packages || null;
}

function getWorkingDirectory() {
    return process.env['GITHUB_WORKSPACE'] ? process.env['GITHUB_WORKSPACE'] : process.cwd();
}

function getRootPackageJson() {
    const root = getWorkingDirectory();

    return require(path.join(root, 'package.json'));
}

function getWorkspaces() {
    const packages = getPackages(getRootPackageJson());

    return packages;
}

function getPackagesFromWorkspaces(workspaces) {
    const root = getWorkingDirectory();
    const rootPackageJson = getRootPackageJson();
    const packages = {};
    const promises = [];

    workspaces.forEach((workspace) => {
        promises.push(new Promise((resolve) => {
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

    packages[rootPackageJson.name] = {
        dependencies: rootPackageJson.dependencies,
        devDependencies: rootPackageJson.devDependencies,
    };

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
