# Player FM history export

Quick and dirty script to get a Markdown file of podcast episodes played in PlayerFM.

1. Go to <https://player.fm/borekb/play-history/all>
2. Scroll down as many times as needed to get the entire history
3. Run this:

```console
deno run -A parse-history.ts
```

It will produce `out.md` (gitignored). When happy with the results, copy it to `player-fm-history.md` and commit.

## Dev tips

- In `parse-history.ts`, use the `player-fm-history (single episode).html` file for quicker development.
- `--watch` is useful.
