import {defineStore} from "pinia";
import {useTripStore} from "./trip";
import {useLocationStore} from "./locationStore";
import http from "../Helpers/http";
import {ref} from "vue";
import {useRouter} from "vue-router";

export const drivingStore = defineStore('driving',{
    state: () => ({
        title: 'Driving to passenger...',
    }),
    actions:{
        broadcastDriverLocation(){
            const trip = useTripStore();
            const location = useLocationStore();
            if(trip.id){
                http()
                    .post(`/api/trip/${trip.id}/location`, {
                        driver_location: location.current.geometry,
                    })
                    .then((response) => {
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        },
        handlePassengerPickedUp(){
            const trip = useTripStore();
            const location = useLocationStore();
            if(!trip.id){
                return;
            }
            http()
                .post(`/api/trip/${trip.id}/start`)
                .then((response) => {
                    this.title = 'Travelling to destination...';
                    location.$patch({
                        destination: {
                            name: response.data.destination_name,
                            geometry: response.data.destination,
                        },
                    });
                    trip.$patch(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

      handleCompleteTrip (){
          const trip = useTripStore();
          const location = useLocationStore();
          const router = useRouter();
            if(!trip.id){
                return;
            }
            http()
                .post(`/api/trip/${trip.id}/end`)
                .then((response) => {
                    this.title = 'Trip completed!';

                    trip.$patch(response.data);

                    setTimeout(() => {
                        trip.reset();
                        location.reset();

                        this.router.push({
                            name: 'standby',
                        });
                    }, 3000);
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }
})
export default drivingStore