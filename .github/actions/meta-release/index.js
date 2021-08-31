const core = require('@actions/core');
const github = require('@actions/github');
const { Extractor } = require('markdown-tables-to-json');

(async () => {
  try {
    const token = core.getInput('token');
    const octokit = github.getOctokit(token);
    //   const owner = 'pink1i'
    //   const repo = 'js-0-action'

    // const release = await octokit.rest.repos.getRelease({
    //       owner: owner,
    //       repo: repo,
    //       release_id: 48711789
    //   });

    // console.log(release.data)

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

      const desc = release.data.body;
      if (desc == null || typeof(desc) === 'undefined') {
        console.log('Cannot extract metadata when description null or undefined')
      } else {
        const extractedObject = Extractor.extractObject(desc, 'columns', true)
        if (extractedObject) {
            for (const [root_key, root_value] of Object.entries(extractedObject)) {
                for (const [key, value] of Object.entries(root_value)) {
                    core.setOutput(`${root_key}_${key}`, value);
                }
            }
        } else {
            console.log('Cannot extract metadata when description null or undefined')
        }
      }
  } catch (error) {
      core.setFailed(error.message);
  }
})();
