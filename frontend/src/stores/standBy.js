import {defineStore} from "pinia";
import {useTripStore} from "./trip";
import {useLocationStore} from "./locationStore";
import {useRouter} from "vue-router";
import {ref} from "vue";
import http from "../Helpers/http";

export const standByStore = defineStore('StandBy', {
    state: () => ({
        title: ref('Waiting for ride request...'),
    }),
    actions: {
        handleDeclineTrip() {
            const trip = useTripStore();
            trip.reset()
            title.value = 'Waiting for ride request...'
        },
        handleAcceptTrip() {
            const location = useLocationStore();
            const trip = useTripStore();
            const router = useRouter();
            http().post(`/api/trip/${trip.id}/accept`, {
                driver_location: location.current.geometry
            })
                .then((response) => {
                    location.$patch({
                        destination: {
                            name: 'Passenger',
                            geometry: response.data.origin
                        }
                    });

                    this.router.push({
                        name: 'driving'
                    });
                }).catch((error) => {
                console.error(error)
            })
        },

        initMapDirections() {
            mapboxgl.accessToken = "pk.eyJ1IjoiYm9sb21pbiIsImEiOiJjbG00cmE5MGMyaWI1M2tzNm5sb2ZmanZsIn0.FlIUx7MQNY671gFff5MzwQ"; // Replace with your Mapbox access token
            const trip = useTripStore();
            const map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v11", // Choose a style
                center: [
                    trip.destination.lng,
                    trip.destination.lat
                ],
                zoom: 11
            });

            new mapboxgl.Marker()
                .setLngLat([
                    trip.destination.lng,
                    trip.destination.lat
                ])
                .addTo(map);

            map.on('load', () => {
                const directions = new MapboxDirections({
                    accessToken: mapboxgl.accessToken,
                    unit: 'metric',
                    instructions: false,
                    profile: 'mapbox/driving-traffic',
                });
                map.addControl(new MapboxDirections({
                    accessToken: mapboxgl.accessToken,
                    controls: {instructions: false, directions: true}
                }), 'top-left');

                let origin = [trip.origin.lng, trip.origin.lat];
                let destinationOfUser = [trip.destination.lng, trip.destination.lat];
                directions.setOrigin(origin);
                directions.setDestination(destinationOfUser);
            })
        }
    }
})
export default standByStore;