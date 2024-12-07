<script>
	// The library provides a main wrapper component
	// and a bunch empty layout components...
	import { LayerCake, Svg, Html, Canvas } from 'layercake';

	// ...that you fill with your own chart components,
	// that live inside your project and which you
	// can copy and paste from here as starting points.
	import AxisX from '$lib/components/layercake/AxisX.svelte';
	import AxisY from '$lib/components/layercake/AxisY.svelte';
	import Line from '$lib/components/layercake/Line.svelte';
	import Scatter from '$lib/components/layercake/Scatter.svelte';
	import Labels from '$lib/components/layercake/Labels.svelte';

	const data = [
		{ x: 0, y: 1 },
		{ x: 1, y: 2 },
		{ x: 2, y: 3 }
	];
</script>

<div class="chart-container">
	<LayerCake x="x" y="y" {data}>
		<Svg>
			<AxisX />
			<AxisY />
			<Line color="#f0c" />
		</Svg>

		<Canvas>
			<Scatter color="#0fc" />
		</Canvas>

		<Html>
			<Labels />
		</Html>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 500px;
	}
</style>
