<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">{{ title }}</h1>
    <div>
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-white px-4 py-5 sm:p-6">
          <div>
            <div id="map" ref="map" class="map" style="width: 100%; height: 256px;"></div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <span>{{ message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useLocationStore} from "../stores/locationStore";
import {useTripStore} from '../stores/trip'
import {useRouter} from 'vue-router'
import {onMounted, ref} from 'vue'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
Pusher.logToConsole=true;

const location = useLocationStore()
const trip = useTripStore()
const router = useRouter()

const title = ref('Waiting on a driver...')
const message = ref('When a driver accepts the trip, their info will appear here.')

const mapboxAccessToken = 'pk.eyJ1IjoiYm9sb21pbiIsImEiOiJjbG00cmE5MGMyaWI1M2tzNm5sb2ZmanZsIn0.FlIUx7MQNY671gFff5MzwQ';
const map = ref(null);
onMounted(async () => {
  await location.updateCurrentLocation();
  mapboxgl.accessToken = mapboxAccessToken;

  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [location.current.geometry.lng, location.current.geometry.lat],
    zoom: 14,
  });

  let echo = new Echo({
    broadcaster: 'pusher',
    key: '0ee073c78321094bc41d',
    cluster: 'ap2',
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss']
  })
  const passengerChannel = echo.channel(`passenger_${trip.user_id}`);
  passengerChannel.listen('TripAccepted', (e) => {
    trip.$patch(e.trip);
    title.value = "A driver is on the way!";
    message.value = `${e.trip.driver.user.name} is coming in a ${e.trip.driver.year} ${e.trip.driver.color} ${e.trip.driver.make} ${e.trip.driver.model} with a license plate #${e.trip.driver.license_plate}`;
  })
      .listen('TripLocationUpdated', (e) => {
        trip.$patch(e.trip);
      })
      .listen('TripStarted', (e) => {
        trip.$patch(e.trip);
        location.$patch({
          current: {
            geometry: e.trip.destination
          }
        });

        title.value = "You're on your way!";
        message.value = `You are headed to ${e.trip.destination_name}`;
      })
      .listen('TripEnded', (e) => {
        trip.$patch(e.trip);

        title.value = "You've arrived!";
        message.value = `Hope you enjoyed your ride with ${e.trip.driver.user.name}`;

        setTimeout(() => {
          trip.reset();
          location.reset();

          router.push({
            name: 'landing'
          });
        }, 10000);
      })
})
</script>

<style scoped>
.map {
  width: 100%;
  height: 256px;
}
</style>
