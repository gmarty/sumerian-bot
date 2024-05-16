# Sumerian bot

> An educational Mastodon bot that posts one Sumerian cuneiform a day.

## How to use it?

To post a status, run this command:

```sh
npm run post
```

## How to install and configure?

Clone, and install the dependencies:

```sh
npm install
```

You will need an access token to post. Go to your Mastodon instance, log in and edit your profile. Go to `Development` and click on the `New application` button. Fill in the `Application name` field (e.g. `Mastodon bot`). At the very least, `write` should be checked under `Scopes`. Click on the `Submit` button at the bottom of the page.

Open the newly created application, the access token is available for you to copy.

### Running the bot locally

To run the script locally, you need to create a `.env` file with your Mastodon instance and access token:

```
MASTODON_SERVER='https://example.com'
MASTODON_TOKEN='MASTODONK3Y'
```

Then call the command `npm run post` whenever you want to post something.

### Running automatically with Github Actions

If you host your fork on Github, you can use Github Actions to post something on a schedule.

First, you need to configure Github Secrets with the Mastodon instance and access token. In Github, go to `Settings` > `Security` > `Secrets and variables` > `Actions`. Create `New repository secret`.

For the Mastodon instance your account will post to, type `MASTODON_SERVER` in `Name` and the URL in the `Secret` field. Click `Add secret`.

Create another secret for you access token. The name must be `MASTODON_TOKEN`. Paste your token in `Secret`. Add.

By default, the cron will run everyday at 10.10am UTC. It's good to avoid peak cron times such as the beginning of hours. To change the time, edit [line 6 of `.github/workflows/post.yml`](https://github.com/gmarty/sumerian-bot/blob/main/.github/workflows/post.yml#L6).

Note that you can also execute the command from the `Actions` tab on Github.

> [!WARNING]
>
> - The schedule event can be delayed during periods of high loads of GitHub Actions workflow runs. If the load is sufficiently high enough, some queued jobs may be dropped.
> - In a public repository, scheduled workflows are automatically disabled when no repository activity has occurred in 60 days. To enable a disabled workflow, see [Disabling and enabling a workflow](https://docs.github.com/en/enterprise-server@3.12/actions/using-workflows/disabling-and-enabling-a-workflow#enabling-a-workflow).

## Technical notes

The image attached is generated from a SVG rasterised to avif. I found this method easier to control the size of the image and the position of the glyph than with `node-canvas`.

Because the rasterisation is done with `sharp`, the image is never written to disc, but stays in memory. It is passed as a blob directly to `masto.js` for posting.

The status and image are predictably (i.e. not randomly) created based on the day.
