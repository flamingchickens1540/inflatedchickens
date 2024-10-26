<script>
	let { children } = $props();
    import "../app.css";
</script>

<style lang="postcss">
	:global(body) {
        @apply bg-bg_gray;
	}
</style>

{@render children()}
