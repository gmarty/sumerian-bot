#!/usr/bin/env node
import { config } from '@dotenvx/dotenvx';
import { createRestAPIClient } from 'masto';
import { getDay } from './lib/utils.js';
import getMediaBlob from './lib/getMediaBlob.js';
import getStatus from './lib/getStatus.js';
import getHashtags from './lib/getHashtags.js';

// Post a status on Mastodon with an image attached.

config(); // Configure dotenvx so we can read env variables locally.

if (!process.env.MASTODON_SERVER) {
  console.error(
    'No Mastodon instance defined. Configure a .env file or a Github secret.',
  );
  process.exit(1);
}
if (!process.env.MASTODON_TOKEN) {
  console.error(
    'No Mastodon access token defined. Configure a .env file or a Github secret.',
  );
  process.exit(1);
}

const day = getDay();

// Generate the content of the status.
let mediaBlob;
try {
  mediaBlob = await getMediaBlob(day);
} catch (err) {
  console.error('Could not generate the media blob.', err);
  process.exit(1);
}
const statusText = getStatus(day);
const hashtags = getHashtags(day);

console.log(statusText);
console.log(hashtags);

const masto = createRestAPIClient({
  url: process.env.MASTODON_SERVER,
  accessToken: process.env.MASTODON_TOKEN,
});

const media = await masto.v2.media.create({
  file: mediaBlob,
  description: statusText,
});

await masto.v1.statuses.create({
  status: statusText + '\n\n' + hashtags,
  visibility: 'public',
  mediaIds: [media.id],
});
