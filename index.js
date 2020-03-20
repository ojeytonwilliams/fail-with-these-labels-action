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
  prLabels = prLabels.map(({ name }) => name);
  const failedLabelsFound = prLabels.filter(labelName =>
    labelsToFail.includes(labelName)
  );
  if (failedLabelsFound.length) {
    const labels = failedLabelsFound.join(", ");
    console.log(`Labels to Fail found: ${labels}`);
    throw new Error(`Labels to Fail found: ${labels}`);
  }
  process.exit(0);
} catch (error) {
  core.setFailed(error.message);
}
