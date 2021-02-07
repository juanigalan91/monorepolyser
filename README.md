# Monorepolyser

Awesome Github Action to analyse your yarn monorepo!

## Requirements
This Github Action assumes that you are using yarn workspaces in order to manage your monorepo. If your `package.json` has a key called `workspaces` where you configure where your packages are, then you are good to go!

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

### Impact Analysis

This feature determines whether the PR changes have a high or low impact on the entire project. If the PR has a high impact, this action also allows to either comment which packages that were modified caused the current PR to be flagged as high impact, or add labels to the PR.

**How does it work?**
Monorepolyser will go through all the packages declared in your workspaces and calculate how many packages depend on each of them. Once that number is obtained, Monorepolyser will then retrieve the high impact threshold defined on the `worflow.yml` (or 60 by default) and if there the percentage of packages that depend on a specific module is higher than the threshold, then the PR will be flagged as high impact.

## Usage

Inside your `.github/workflows/workflow.yml` file:

### Check dependencies 
```yaml
steps:
  - name: Checkout	
    uses: actions/checkout@v2	
  - name: Check dependencies
    uses: juanigalan91/monorepolyser@0.2.6
    with:
      # Whether you want to execute the check dependencies action or not
      check-dependencies: true
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

If there is a workspace that you want to ignore, you can set the `ignore-workspaces` flag like this:

```yaml
steps:
  - name: Checkout	
    uses: actions/checkout@v2	
  - name: Check dependencies
    uses: juanigalan91/monorepolyser@0.2.6
    with:
      check-dependencies: true
      ignore-workspaces: 'dev-packages,third-parties' # lists of workspaces to ignore from the check, list of strings separated by a comma
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

If you want to ignore the main package json from this check, you can set the `include-main-package-json` flag like this:

```yaml
steps:
  - name: Checkout	
    uses: actions/checkout@v2	
  - name: Check dependencies
    uses: juanigalan91/monorepolyser@0.2.6
    with:
      check-dependencies: true
      include-main-package-json: true
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

If you want this action to just warn by adding a comment on the PR rather than breaking the CI, you can set the `only-warn` flag like this:

```yaml
steps:
  - name: Checkout	
    uses: actions/checkout@v2	
  - name: Check dependencies
    uses: juanigalan91/monorepolyser@0.2.6
    with:
      check-dependencies: true
      only-warn: true
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Impact analysis

```yaml
steps:		
  - name: Checkout	
    uses: actions/checkout@v2	
  - name: Check impact
    uses: juanigalan91/monorepolyser@0.2.6
    with:
      impact-analysis: true
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

If you want to override the impact analysis base configuration:

```yaml
steps:		
  - name: Checkout	
    uses: actions/checkout@v2	
  - name: Check impact
    uses: juanigalan91/monorepolyser@0.2.6
    with:
      impact-analysis: true
      high-impact-threshold: 50 # percentage (0-100) of the packages that will be impacted by this PR in order for it to be of high impact
      on-high-impact: 'comment,add-labels' # action to be executed on high impact PR. it can be 'comment', 'add-labels' or multiple, separated by a comma
      high-impact-labels: 'high-impact' # Labels to be added (separated by a comma) if the PR has a high impact
      high-impact-packages-regexp: '@monorepolyser\/(ga-utils|ga-impact-analysis)' # Regular expression to manually flag packages as high impact
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

If you want to have the analysis printed, you can choose to print this on the logs or on the PR as a comment. To do so, you can use the `verbose` parameter


```yaml
steps:		
  - name: Checkout	
    uses: actions/checkout@v2	
  - name: Check impact
    uses: juanigalan91/monorepolyser@0.2.6
    with:
      impact-analysis: true
      verbose: 'logs' # where to print the analysis. This can be 'logs' and you would need to search this actions logs to see it, or 'comment' and this will add a comment to the PR
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```