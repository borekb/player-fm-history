import * as cheerio from 'https://esm.sh/cheerio@1.0.0-rc.12';
import { writeAllSync } from 'https://deno.land/std@0.165.0/streams/conversion.ts';

// --------------------
// Functions
function write(line: string) {
  console.log(line);
  writeAllSync(file, new TextEncoder().encode(line + '\n'));
}

// --------------------
// Main script

const htmlFile = 'player-fm-history.html';
//const htmlFile = 'player-fm-history (single episode).html'; // ← use this for easier development

const $ = cheerio.load(await Deno.readTextFile(htmlFile));

const file = await Deno.create('out.md');

write('# Player.FM history');
write('');

$('article').map((_, article) => {
  const showName = $('div.headline div.title', article).text();
  const showUrl = 'https://player.fm/series/' + $(article).attr('data-series-slug');
  const showImageSrcset = $('div.headline a img', article).attr('data-srcset');
  const showImageUrl = showImageSrcset?.substring(0, showImageSrcset.indexOf(' '));

  const episodeName = $(article).attr('data-title');
  const episodeUrl = showUrl + '/' + $(article).attr('data-slug');

  const episodeDuration = $('.info-top span.duration', article).text();

  const episodeTimestamp = Number($(article).attr('data-played-at'));
  const time = new Date(episodeTimestamp * 1000);
  const episodeListenTimeFormatted = `${time.getDate()}\\. ${time.getMonth() + 1}. ${time.getFullYear()}`;

  write(
    `- ${episodeListenTimeFormatted}: <img width="16" height="16" src="${showImageUrl}"> [${showName}](${showUrl}) — [${episodeName}](${episodeUrl}) (${episodeDuration})`
  );
});

file.close();
