<script>
	let { children } = $props();
	import '../app.css';
</script>

{@render children()}

<style lang="postcss">
	:global(body) {
		@apply bg-bg_gray;
	}
</style>
