import {defineStore} from "pinia";
import {useLocationStore} from "./locationStore";
import {useTripStore} from "./trip";
import http from "../Helpers/http";
import {computed, ref} from "vue";

export const mapStore = defineStore('map', {
    state: () => ({
        centerLng: ref(0),
        centerLat: ref(0)
    }),
    actions: {
        handleTrip() {
            const location = useLocationStore();
            const trip = useTripStore();
            http().post('/api/trip', {
                origin: location.current.geometry,
                destination: location.destination.geometry,
                destination_name: location.destination.name
            })
                .then((response) => {
                    trip.$patch(response.data);
                    this.router.push({
                        name: 'trip'
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        mapCenter() {
            const location = useLocationStore();
            const destination = location.destination.geometry;
            const current = location.current.geometry;

            this.centerLng = (destination.lng + current.lng) / 2;
            this.centerLat = (destination.lat + current.lat) / 2;
        }
    }
});
