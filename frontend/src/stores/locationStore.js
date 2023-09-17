import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'


const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        (error) => {
          reject(error);
        }
    );
  });
};

export const useLocationStore = defineStore('location', () =>{
  const destination = reactive({
    name: '',
    address: '',
    geometry: {
      lat: 0,
      lng: 0
    }
  });

  const current = reactive({
    geometry: {
      lat: 0,
      lng: 0
    }
  });
  const updateCurrentLocation = async () => {
    try {
      const userLocation = await getUserLocation();
      current.geometry = {
        lat: userLocation.latitude,
        lng: userLocation.longitude
      };
    } catch (error) {
      console.error('Error getting user location:', error);
    }
  };
  const reset = () => {
    destination.name = ''
    destination.address = ''
    destination.geometry.lat = null
    destination.geometry.lng = null

    current.geometry.lat = null
    current.geometry.lng = null
  }

  return {destination,current, updateCurrentLocation, reset}
});