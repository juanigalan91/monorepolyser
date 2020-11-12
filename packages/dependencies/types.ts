import { Body } from 'package-json-types';

export interface ProjectMetadata {
  workspaces: Body['workspaces'];
  packages: Record<string, Body>;
}
