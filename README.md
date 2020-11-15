# Monorepolyser

Awesome Github Action to analyse your yarn monorepo!

## Requirements
This Github Action assumes that you are using yarn workspaces in order to manage your monorepo. If your `package.json` has a key called `workspaces` where you confgire where your packages are, then you are good to go!

## Functionalities
### Dependencies check

Checks the integrity of your package's dependencies and validates that all of your packages are using the same dependencies on every single package. This allows a quick validation that you are not using 2 different versions of the same package, which they could possibly end up in your final bundle. This check will validate that you only use one version of a certain dependency!

If you have any errors, the Github Action will show a comment on your PR, like this:

Some of the packages in your monorepo use different dependencies, which can lead to multiple versions ending up in your production bundle
| Dependency | Added by | Added Version | Base version
| :-----------: |:-------------:| :----------:| :----------:|
| react-dom | module-1 | ^16.8.5 | ^16.13.0 |
| react-dom | module-2 | ^16.8.5 | ^16.13.0 |
| axios | module-3 | 0.19.2 | ^0.18.0 |
| axios | module-4 | 0.19.2 | ^0.18.0 |

**How does it work?**
Monorepolyser will go through the main package.json of your application as well as each package.json on your workspaces and validate that you are using the exact same version for each dependency on every package. If there is even a slightest difference between versions, Monorepolyser will save that difference and print it on the PR so it can be fixed.

As for now, this module only validates the exact same version used on every package, but it is true that there are different scenarios where versions could be different but valid. For now this module does not implement that functionality just yet.

**How does monorepolyser get the "base version"?**
As for now, the action takes into consideration the base version as the first version detected by the script when it went through each of your package.json. An argument could be made that the base version should be the most used version, which is completely valid, we just do not support it right now since this is still in beta.

## Usage

Inside your `.github/workflows/workflow.yml` file:

```yaml
steps:
  - name: Checkout	
    uses: actions/checkout@v2	
  - name: Check dependencies
    uses: juanigalan91/monorepolyser@0.2.0
    with:
      check-dependencies: true
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
