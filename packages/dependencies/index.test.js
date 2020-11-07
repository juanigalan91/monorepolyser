const { getWorkspaces, getPackagesFromWorkspaces } = require('./index');

const workspaces = getWorkspaces()

getPackagesFromWorkspaces(workspaces).then(result => console.log(result));
