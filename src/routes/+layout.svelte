<script>
	let { children } = $props();
    import "../app.css";
</script>

<style lang="postcss">
	:global(body) {
        @apply bg-bg_gray;
		@apply font-mono;
	}
</style>

{@render children()}
