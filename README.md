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

## Usage

Inside your `.github/workflows/workflow.yml` file:

```yaml
steps:
  - name: Checkout	
    uses: actions/checkout@v2	
  - name: Check dependencies
    uses: juanigalan91/monorepolyser@0.1.14
    with:
      check-dependencies: true
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
