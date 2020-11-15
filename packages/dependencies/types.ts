import { Body } from 'package-json-types';

export interface ProjectMetadata {
  /** List of yarn workspaces defined for this package */
  workspaces: Body['workspaces'];
  /** Key/value object where each key is a package name and the value is the package.json information */
  packages: Record<string, Body>;
}
