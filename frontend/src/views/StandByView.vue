<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">{{ standBy.title}}</h1>
    <div v-if="!trip.id" class="mt-8 flex justify-center">
      <Loader />
    </div>
    <div v-else>
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-white px-4 py-5 sm:p-6">
          <div>
            <div id="map" style="height:400px;"></div>
          </div>
          <div class="mt-2">
            <p class="text-xl">Going to <strong>{{ trip.destination_name }}</strong></p>
          </div>
        </div>
        <div class="flex justify-between bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
              @click="standBy.handleDeclineTrip"
              class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">Decline</button>
          <button
              @click="standBy.handleAcceptTrip"
              class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">Accept</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Loader from '../components/Loader.vue'
import {standByStore} from "../stores/standBy";
import {useTripStore} from "../stores/trip";
import {onMounted} from "vue";
import {useLocationStore} from "../stores/locationStore";
import Echo from "laravel-echo";
import pusher from "pusher-js";

const trip = useTripStore();
const standBy = standByStore();
const location = useLocationStore();


onMounted(async () => {
  await location.updateCurrentLocation();

  let echo = new Echo({
    broadcaster: 'pusher',
    key: '0ee073c78321094bc41d',
    cluster: 'ap2',
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true, // Deprecated option
    enabledTransports: ['ws', 'wss']
  });

  const driversChannel = echo.channel('drivers');

  driversChannel
      .listen('TripCreated', (e) => {
        standBy.title = 'Ride requested:';
        trip.$patch(e.trip);
        console.log('TripCreated', e);
        setTimeout(standBy.initMapDirections, 2000);
      })
      .listenForWhisper('subscription_succeeded', (e) => {
        console.log('Channel subscribed successfully:', e);
      });
  driversChannel.subscribe();
});


</script>