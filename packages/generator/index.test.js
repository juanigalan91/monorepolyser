const { getWorkspaces, getPackagesFromWorkspaces } = require('./index');

const workspaces = getWorkspaces()

console.log(workspaces);

console.log(getPackagesFromWorkspaces(workspaces));
