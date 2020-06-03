.PHONY: fmt test doc fetch_latest examples

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

examples:
	@deno run --unstable --allow-run --allow-read --allow-write examples/callback.ts
	@deno run --unstable --allow-run --allow-read --allow-write examples/callback.ts
	@deno run --unstable --allow-run --allow-read --allow-write examples/classes.ts
	@deno run --unstable --allow-run --allow-read --allow-write examples/custom_classes.ts
	@deno run --unstable --allow-run --allow-read --allow-write examples/script.ts
