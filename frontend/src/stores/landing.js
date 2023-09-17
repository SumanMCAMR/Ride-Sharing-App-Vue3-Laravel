import {useRouter} from "vue-router";
import http from "../Helpers/http";
import {defineStore} from "pinia";

export const landingStore = defineStore('landingStore',{
    state: () =>{
        return {};
    },
    actions:{
        handleStartDriving(){
            const router = useRouter();
            http().get('/api/driver').then((response)=>{
                if(response.data.driver){
                    this.router.push({
                        name: 'standby'
                    })
                }else{
                    this.router.push({
                        name:'driver'
                    })
                }
            }).catch((error)=>{
                console.error(error);
            });
        },
        handleFindARide () {
            const router = useRouter();
            this.router.push({
                name:'location'
            });
        }
    }
})
export default landingStore;