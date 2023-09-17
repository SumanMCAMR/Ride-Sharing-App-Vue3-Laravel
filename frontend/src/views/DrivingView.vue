<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">{{ useDriving.title }}</h1>
    <div>
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left" v-if="!trip.is_complete">
        <div class="bg-white px-4 py-5 sm:p-6">
          <div>
            <div ref="map" id="map" class="map" style="width: 100%; height: 256px;"></div>
          </div>
          <div class="mt-2">
            <p class="text-xl">Going to <strong>pick up a passenger</strong></p>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
              v-if="trip.is_started"
              @click="useDriving.handleCompleteTrip"
              class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none"
          >
            Complete Trip
          </button>
          <button
              v-else
              @click="useDriving.handlePassengerPickedUp"
              class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none"
          >
            Passenger Picked Up
          </button>
        </div>
      </div>
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left" v-else>
        <div class="bg-white px-4 py-5 sm:p-6">
          <Tada />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useLocationStore} from "../stores/locationStore";
import { useTripStore } from '../stores/trip'
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import Tada from '../components/Tada.vue'
import {drivingStore} from "../stores/drivingStore";

const useDriving = drivingStore();
const location = useLocationStore()
const trip = useTripStore()
const router = useRouter()


const intervalRef = ref('');
const map = ref(null)
const mapboxAccessToken = 'pk.eyJ1IjoiYm9sb21pbiIsImEiOiJjbG00cmE5MGMyaWI1M2tzNm5sb2ZmanZsIn0.FlIUx7MQNY671gFff5MzwQ'; // Replace with your Mapbox access token

const originMarker = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [location.current.geometry.lng, location.current.geometry.lat],
  },
};

const destinationMarker = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [location.destination.geometry.lng, location.destination.geometry.lat],
  },
};

const mapboxStyle = 'mapbox://styles/mapbox/streets-v11';

onMounted(() => {
  mapboxgl.accessToken = mapboxAccessToken;

  map.value = new mapboxgl.Map({
    container: 'map',
    style: mapboxStyle,
    center: [location.current.geometry.lng, location.current.geometry.lat],
    zoom: 14,
  });
  new mapboxgl.Marker()
      .setLngLat(originMarker.geometry.coordinates)
      .addTo(map.value);

  new mapboxgl.Marker()
      .setLngLat(destinationMarker.geometry.coordinates)
      .addTo(map.value);

  intervalRef.value = setInterval(async () => {
    await location.updateCurrentLocation();
    useDriving.broadcastDriverLocation();
  }, 5000);
});
onUnmounted(() => {
  clearInterval(intervalRef.value);
  intervalRef.value = null;
});
</script>

<style scoped>
.map {
  width: 100%;
  height: 256px;
}
</style>
