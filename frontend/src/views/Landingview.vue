<template>
  <div class="pt-5 font-bold text-3xl ">Connecting Commuters, Easing Traffic</div>
  <div class="flex justify-center items-center h-screen">
    <div class="bg-white shadow-md rounded-lg px-12 py-16 w-fit">
      <h2 class="text-3xl font-bold mb-8">Choose an option</h2>
      <div class="flex justify-center">
        <button @click.prevent="store.handleStartDriving"
            class="text-gray-500 border border-black hover:bg-black hover:text-white font-bold py-3 px-8 rounded-lg mr-4">
          Start Driving
        </button>
        <button @click.prevent="store.handleFindARide"
            class="text-gray-500 border border-black hover:bg-black hover:text-white font-bold py-3 px-8 rounded-lg">
          Find A Ride
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { landingStore } from "../stores/landing";
const store = landingStore();
</script>
