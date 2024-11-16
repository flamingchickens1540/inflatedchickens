<script lang="ts">
	import { derived } from "svelte/store";

    let driverquickness: number
    let driverfieldawareness: number
    let broken: boolean
    let functional: boolean
    let notes: string
    function submit() {

    }
</script>
<div class="flex flex-col items-start align-top h-dvh p-3 accent-text_yellow">
    <div class="flex w-full rounded border-solid border-2 border-text_red bg-btn_grey p-2 mb-3">
        <h1 class="text-text_red text-3xl">Post Match</h1>
    </div>
    <div class="flex w-full rounded border-solid border-2 border-text_red bg-btn_grey p-2 mb-3 content-start">
        <label class="text-text_red text-3xl w-full">Driver Skill
            <div class="w-full flex justify-items-stretch text-base">
                <div class="p-2 w-1/2 text-center text-text_yellow">
                    Quickness: {driverquickness}
                    <input type="range" min="0" max="5" step="1" bind:value={driverquickness}>
                </div>
                <div class="p-2 w-1/2 text-center text-text_yellow">
                    Field awareness: {driverfieldawareness}
                    <input type="range" min="0" max="5" step="1" bind:value={driverfieldawareness}>
                </div>
            </div>
        </label>
    </div>
    <div class="flex w-full rounded border-solid border-2 border-text_red bg-btn_grey p-2 mb-3 content-start">
        <label class="text-text_red text-3xl w-full">Robot
            <div class="w-full flex justify-items-stretch text-base border-solid border-2 border-text_red rounded mb-2">
                <label class="text-text_yellow w-1/2 p-2 text-left"><input type="radio" name="robotbroken" class="mr-2" value={true} bind:group={broken}>Broken</label>
                <label class="text-text_yellow w-1/2 p-2 text-left"><input type="radio" name="robotbroken" class="mr-2" value={false} bind:group={broken}>Undamaged</label>
            </div>
            <div class="w-full flex justify-items-stretch text-base border-solid border-2 border-text_red rounded">
                <label class="text-text_yellow w-1/2 p-2 text-left"><input type="radio" name="robotfunctional" class="mr-2" value={true} bind:group={functional}>Functional</label>
                <label class="text-text_yellow w-1/2 p-2 text-left"><input type="radio" name="robotfunctional" class="mr-2" value={false} bind:group={functional}>Died on field</label>
            </div>
        </label>
    </div>
    <div class="flex w-full rounded border-solid border-2 border-text_red bg-btn_grey p-2 mb-3 content-start">
        <label class="text-text_red text-3xl w-full">Notes
            <textarea class="border-solid border-2 border-text_red bg-btn_grey text-text_yellow text-base w-full p-2 rounded" bind:value={notes}></textarea>
        </label>
    </div>
    <div class="flex w-full">
        <button class="m-0 rounded border-solid border-2 border-text_red bg-btn_grey p-2 text-text_red text-3xl w-1/2 mr-2">←</button>
        <button on:click={submit} class="m-0 rounded border-solid border-2 border-text_red bg-btn_grey p-2 text-text_red text-3xl w-1/2">Submit</button>
    </div>
</div>
