<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">Here's your trip</h1>
    <div>
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-white px-4 py-5 sm:p-6">
          <div id="map" style="height: 400px;"></div>
          <div class="mt-2">
            <p class="text-xl">Going to <strong>{{ location.destination.name }}</strong></p>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
              class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-2 text-white"
              @click.prevent="mapStore1.handleTrip"
          >
            Let's Go!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useLocationStore} from "../stores/locationStore";
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {useTripStore} from "../stores/trip";
import {mapStore} from "../stores/mapStore";

const mapStore1 = mapStore();
const location = useLocationStore();
const router = useRouter();
const trip = useTripStore();

onMounted(async () => {
  if (location.destination.name === "") {
    await router.push({
      name: "location"
    });
  } else {
    mapboxgl.accessToken = "pk.eyJ1IjoiYm9sb21pbiIsImEiOiJjbG00cmE5MGMyaWI1M2tzNm5sb2ZmanZsIn0.FlIUx7MQNY671gFff5MzwQ";

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center:[mapStore1.centerLng, mapStore1.centerLat],
      zoom: 10
    });

    new mapboxgl.Marker()
        .setLngLat([
          location.destination.geometry.lng,
          location.destination.geometry.lat
        ])
        .addTo(map);

    await location.updateCurrentLocation();


    map.on('load', () => {
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        instructions: false,
        profile: 'mapbox/driving-traffic',
      });

      map.addControl(new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        controls: {instructions: false,directions:true}
      }), 'top-left');


      let origin = [location.current.geometry.lng,location.current.geometry.lat];
      let destinationOfUser = [location.destination.geometry.lng,location.destination.geometry.lat];
      directions.setOrigin(origin);
      directions.setDestination(destinationOfUser);
    });
  }
});
</script>
