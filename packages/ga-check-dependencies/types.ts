/** Represents a dependency that has different version in multiple packages */
export interface IncoherentDependency {
  /** package that added the incoherent dependency */
  addedBy: string;
  /** incoherent version */
  version: string;
  /** name of the incoherent dependency */
  name: string;
}
