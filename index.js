const core = require("@actions/core");
const github = require("@actions/github");

try {
  const labelsToFailString = core.getInput("labels-to-fail");
  const labelsToFail = labelsToFailString.split(",");
  if (!Array.isArray(labelsToFail) && labelsToFail.length) {
    throw new Error("Input labels-to-fail should be a comma separated string");
  }

  let {
    pull_request: { labels: prLabels }
  } = github.context.payload;

  
// ockokit.checks.listForRef({
//   owner,
//   repo,
//   ref
// });
  // merge_commit_sha;
  prLabels = prLabels.map(({ name }) => name);
  const failedLabelsFound = prLabels.filter(labelName =>
    labelsToFail.includes(labelName)
  );
  if (failedLabelsFound.length) {
    const labels = failedLabelsFound.join(", ");
    console.log(`Labels to Fail found: ${labels}`);
    throw new Error(`
    Labels to Fail found:
    ${labels}
     ${github.context.payload.merge_commit_sha}
    ${github.context.ref}
    ${github.context.sha}
    ${JSON.stringify(github.context.repo)}
    `);
  } else {
    throw new Error(`
    Success
    ${github.context.payload.merge_commit_sha}
    ${github.context.ref}
    ${github.context.sha}
    ${JSON.stringify(github.context.repo)}`)
  }
} catch (error) {
  core.setFailed(error.message);
}
