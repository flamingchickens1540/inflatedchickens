<script lang='ts'>
    import { browser } from '$app/environment'
    import { onMount } from 'svelte';
    let name: string = browser && window.localStorage.getItem('name') || ""
</script>
<div class="flex flex-col items-center justify-evenly h-dvh">
    <h1 class="text-center text-text_white text-5xl font-bold">
        Welcome <br><span class="text-text_white">{name}</span>
    </h1>
    <a class="text-center text-text_white text-l rounded bg-btn_grey px-4 py-2 border-solid border-2 border-text_white" href="/scout">
        Scout
    </a>
</div>