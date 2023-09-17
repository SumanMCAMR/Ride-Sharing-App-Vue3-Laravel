import {defineStore} from "pinia";
import {ref} from "vue";
import http from "../Helpers/http";
import {useRouter} from "vue-router";

export const driverStore = defineStore('Driver', {
    state: () => ({
        driverDetails:{
            name: '',
            year: null,
            make: '',
            model: '',
            color: '',
            license_plate: ''
        }
    }),
    actions:{
 handleSaveDriver () {
     const router = useRouter();
            if (this.driverDetails.name && this.driverDetails.year && this.driverDetails.make && this.driverDetails.model && this.driverDetails.color && this.driverDetails.license_plate) {
                http().post('/api/driver', this.driverDetails)
                    .then((response) => {
                        this.router.push({
                            name: 'standby'
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                console.error('Please fill in all the required fields.');
            }
        }

    }
})