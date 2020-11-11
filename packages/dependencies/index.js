const path = require('path');
const glob = require('glob');

function getPackages(packageJson) {
    console.log('packageJson', packageJson);
    const { workspaces } = packageJson;
    console.log('workspaces', workspaces);

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

function getWorkspaces() {
    const root = getWorkingDirectory();

    console.log('root', root);
    console.log('package.json route', path.join(root, 'package.json'));

    const packages = getPackages(require(path.join(root, 'package.json')));

    return packages;
}

function getPackagesFromWorkspaces(workspaces) {
    const root = getWorkingDirectory();
    const packages = {};
    const promises = [];

    console.log('workspaces', workspaces);

    workspaces.forEach((workspace) => {
        promises.push(new Promise((resolve) => {
            console.log('workspace', workspace);
            glob(`${workspace}/package.json`, { cwd: root }, (err, matches) => {
                console.log('matches', matches);
                matches.forEach((match) => {
                    console.log('match', match);
                    const pkg = require(`${root}/${match}`);
    
                    const { name, dependencies, devDependencies } = pkg;
                    packages[name] = {
                        dependencies,
                        devDependencies,
                    };

                    console.log('packages[name]', packages[name]);
                });

                resolve();
            });
        }))
    });

    return Promise.all(promises).then((results) => {
        console.log('finish all', packages);
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
