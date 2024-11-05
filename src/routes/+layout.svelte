<script>
	let { children } = $props();
    import "../app.css";
</script>

<style lang="postcss">
	:global(body) {
        @apply bg-zinc-800;
	}
</style>

{@render children()}
