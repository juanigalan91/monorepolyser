const core = require('@actions/core');
const github = require('@actions/github');
const { getWorkspaces, getPackagesFromWorkspaces } = require('@monorepolyser/dependencies');

const repeatedDependencies = {};
const deps = {};

const main = async () => {
    try {
        const workspaces = getWorkspaces();
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

        const repeatedDeps = Object.keys(repeatedDependencies);

        console.log(repeatedDependencies);

        if (repeatedDeps.length > 0) {
            const githubToken = process.env.GITHUB_TOKEN;
            const client = new github.GitHub(githubToken);

            const context = github.context;
            if (context.payload.pull_request == null) {
                core.setFailed('No pull request found.');
                return;
            }

            const pull_request_number = context.payload.pull_request.number;
            let body = '## Dependencies check \n\n';

            body = `${body}Some of the packages in your monorepo use different dependencies, which can lead to multiple versions ending up in your production bundle\n`;
            body = `${body}| Dependency | Added by | Version |\n| :-----------: |:-------------:| :----------:|\n`;

            repeatedDeps.forEach((repeatedDep) => {
                console.log(repeatedDep);
                const metadata = repeatedDependencies[repeatedDep];
                const row = `| ${repeatedDep} | ${metadata.addedBy} | ${metadata.version} |\n`
                body = `${body}|${row}`;
            });


            client.issues.createComment({
                ...context.repo,
                issue_number: pull_request_number,
                body,
            });

            throw new Error('There are deps with different versions');
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();

module.exports = {
    main,
};
