const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
  try {
      const token = core.getInput('token');
      const octokit = github.getOctokit(token);

      const owner = github.context.repo.owner;
      const repo = github.context.repo.repo;

      const eventName = github.context.eventName;


      console.log(token, owner, repo, eventName)
      if (eventName !== 'release') {
          core.setFailed(`Should be run by a release event but event name = ${eventName}`);
      }
      const releaseId = github.context.payload.release.id;

      const release = await octokit.rest.repos.getRelease({
          owner: owner,
          repo: repo,
          release_id: releaseId
      });

      let desc = release.data.body;
      if (desc == null || typeof(desc) === 'undefined') {
          desc = "";
      }
      console.log(JSON.stringify(desc))
  } catch (error) {
      core.setFailed(error.message);
  }
})();
