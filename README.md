To install locally, use `npm install`, then build the action locally using `ncc build index.js`.  This will create a bundled version in `dist` which is referenced in the `action.yml` file.

To add this action to a workflow, add the following to `.github/workflows/labels-to-fail.yml`

```
name: Verify if any failure labels appear on PR
on:
  pull_request:
    types: [opened, reopened, labeled, unlabeled]

jobs:
  labelChecker:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Check for failure labels
      uses: RandellDawson/fail-with-these-labels-action@master
      with:
        repo-token: ${{ secrets.GITHUB_TOKEN }}
        labels-to-fail: "status: blocked,status: i18n review required"
```

