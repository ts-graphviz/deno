.PHONY: fmt test doc fetch_latest

fmt:
	@deno fmt

test:
	@deno test --unstable

doc:
	@deno doc ./mod.ts

fetch_latest:
	@deno run  --unstable --allow-run --allow-read --allow-write scripts/fetch_latest.ts
	@deno fmt
	@deno fmt
