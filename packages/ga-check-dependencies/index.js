const core = require('@actions/core');
const { getWorkspaces, getPackagesFromWorkspaces } = require('@monorepolyser/dependencies');

const repeatedDependencies = {};
const deps = {};

const main = async () => {
    try {
        const workspaces = getWorkspaces()

        const { packages } = await getPackagesFromWorkspaces(workspaces);

        Object.keys(packages).forEach((pkgName) => {
            const pkg = packages[pkgName];
            const { dependencies } = pkg;

            Object.keys(dependencies).forEach((dep) => {
                const version = dependencies[dep];

                if (deps[dep]) {
                    const detectedVersion = deps[dep];

                    if (version !== detectedVersion) {
                        if (!repeatedDependencies[dep]) {
                            repeatedDependencies[dep] = [];
                        }

                        repeatedDependencies[dep].push({
                            addedBy: pkgName,
                            version, 
                        });
                    }
                } else {
                    deps[dep] = version;
                }
            });
        });

        if (Object.keys(repeatedDependencies).length > 0) {
            throw new Error({
                message: 'there are deps with different versions'
            });
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();

module.exports = {
    main,
};
