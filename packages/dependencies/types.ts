import { Body } from 'package-json-types';

export interface ProjectMetadata {
  /** List of yarn workspaces defined for this package */
  workspaces: Body['workspaces'];
  /** Key/value object where each key is a package name and the value is the package.json information */
  packages: Record<string, Body>;
  packagesByPath: Record<string, Body>;
  /** how many packages there are in all workspaces */
  totalPackages?: number;
}

export enum VERBOSE {
  LOGS = 'logs',
  COMMENT = 'comment',
}

export interface MainOptions {
  onlyWarn?: boolean;
  project: ProjectMetadata;
  verbose?: VERBOSE;
}
