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
    console.log('__dirname', __dirname);
    console.log(process.env['GITHUB_WORKSPACE']);
    console.log(process.cwd());

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
