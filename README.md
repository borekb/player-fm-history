# Player FM history export

1. Go to <https://player.fm/borekb/play-history/all>
2. Scroll down a couple of times to get the entire history
3. Run this:

```console
deno run --allow-read --allow-write parse-history.ts
```

It will produce `out.md`.

## Dev tips

- In `parse-history.ts`, use the `player-fm-history (single episode).html` file for quicker development.
- Add `--watch` to the command above to re-run the script after each change.
