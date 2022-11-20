import { writeAllSync } from 'https://deno.land/std@0.165.0/streams/conversion.ts';
import { config as loadDotEnv } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts';
import { parse } from 'https://deno.land/std@0.165.0/flags/mod.ts';

const flags = parse(Deno.args, {
  boolean: ['refetch-json'],
});

const jsonFile = 'api-response.json';

// --------------------
// Functions

function write(line: string) {
  console.log(line);
  writeAllSync(file, new TextEncoder().encode(line + '\n'));
}

async function refetchJson() {
  const response = await fetch(
    'https://player.fm/borekb/play-history/all.json?episode_detail=full&episode_limit=2&episode_order=rank&episode_active=any',
    { headers: { cookie: `${Deno.env.get('PLAYERFM_AUTH_COOKIE')};` } }
  );
  const json = await response.json();

  await Deno.writeTextFile(jsonFile, JSON.stringify(json, null, 2));
}

// --------------------
// Main script

loadDotEnv({ safe: true, export: true });

const file = await Deno.create('out.md');

write('# Player.FM history');
write('');

if (flags['refetch-json']) await refetchJson();

const json = JSON.parse(await Deno.readTextFile(jsonFile));

for (const episode of json.episodes) {
  // 👇 this is the HTML-based implementation and unfortunately, the JSON doesn't contain enough data
  // to reconstruct it, for example, played date/time is missing.

  // const showName = $('div.headline div.title', article).text();
  // const showUrl = 'https://player.fm/series/' + $(article).attr('data-series-slug');
  // const showImageSrcset = $('div.headline a img', article).attr('data-srcset');
  // const showImageUrl = showImageSrcset?.substring(0, showImageSrcset.indexOf(' '));
  // const episodeName = $(article).attr('data-title');
  // const episodeUrl = showUrl + '/' + $(article).attr('data-slug');
  // const episodeDuration = $('.info-top span.duration', article).text();
  // const episodeTimestamp = Number($(article).attr('data-played-at'));
  // const time = new Date(episodeTimestamp * 1000);
  // const episodeListenTimeFormatted = `${time.getDate()}\\. ${time.getMonth() + 1}. ${time.getFullYear()}`;
  // write(
  //   `- ${episodeListenTimeFormatted}: <img width="16" height="16" src="${showImageUrl}"> [${showName}](${showUrl}) — [${episodeName}](${episodeUrl}) (${episodeDuration})`
  // );
}

file.close();
