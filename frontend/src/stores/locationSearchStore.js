// locationSearchStore.js
import {defineStore} from 'pinia';
import axios from "axios";
import {useLocationStore} from "./locationStore";
import {useRouter} from "vue-router";

export const useSearchAutoComplete = defineStore('locationSearch', {
    state: () => ({
        searchQuery: '',
        suggestions: []
    }),
    actions: {
        searchAddress() {
            if (this.searchQuery.length < 3) {
                this.suggestions = [];
                return;
            }

            // Use Mapbox Geocoding API for suggestions
            axios
                .get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + this.searchQuery + '.json', {
                    params: {
                        access_token: 'pk.eyJ1IjoiYm9sb21pbiIsImEiOiJjbG00cmE5MGMyaWI1M2tzNm5sb2ZmanZsIn0.FlIUx7MQNY671gFff5MzwQ', // Replace with your Mapbox access token
                        autocomplete: true,
                        limit: 5,
                    },
                })
                .then((response) => {
                    this.suggestions = response.data.features;
                })
                .catch((error) => {
                    console.error('Error fetching suggestions: ', error);
                });
        },
        selectSuggestion(suggestion) {
            const location = useLocationStore();
            console.log(suggestion);
            this.searchQuery = suggestion.place_name;
            this.suggestions = [];
            location.$patch({
                destination: {
                    name: suggestion.text.trim(),
                    address:suggestion.place_name,
                    geometry: {
                        lat: parseFloat(suggestion.center[1]),
                        lng: parseFloat(suggestion.center[0])
                    }
                }
            })
        },
        locationSelected() {
            const location = useLocationStore();
            const router = useRouter();
            if (location.destination.name !== '') {
                this.router.push({
                    name: 'map'
                });
            }
        }
    }
});
export default useSearchAutoComplete;