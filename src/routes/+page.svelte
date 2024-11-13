<script lang="ts">
    import { browser } from '$app/environment'
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
    let name: string = browser && window.localStorage.getItem('name') || "";
    let inputname: string;
    onMount(() => {
        let isLoggedIn = browser != null && window.localStorage.getItem('name') != ""
        if (isLoggedIn) {
            goto('/homepage')
        }
    });
    function login() {
        if (inputname === "") {
            alert("Enter your name")
        } else {
            browser && window.localStorage.setItem('name', inputname);
            name = inputname;
            goto('/homepage')
        }
    }
</script>

<div class="flex flex-col items-center justify-evenly h-dvh">
        <h1 class="text-center text-text_red text-5xl font-bold">
            hiiii :3 
        </h1>
        <div>
            <input class="rounded bg-btn_grey border-solid border-2 border-text_red px-4 py-2 text-text_yellow" type="text" placeholder="Enter your name here" bind:value={inputname}>
            <button class="text-center text-text_yellow text-l rounded bg-btn_grey px-4 py-2 border-solid border-2 border-text_red" on:click={login}>
                Login
            </button>
        </div>
</div>