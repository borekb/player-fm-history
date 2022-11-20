# Player FM history export

1. Create `.env` from `.env.example`
2. Run:

```console
deno run -A parse-history.ts
```

This will produce `out.md`. When you're happy with the output, copy it to `player-fm-history.md` and commit it to the repo.

## Dev tips

- Add `--watch` to the command above to re-run the script after each change.
