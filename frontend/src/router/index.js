import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue';
import axios from "axios";
import http from "../Helpers/http";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component:LoginView,
      name:'login'
    },
    {
      path:'/landing',
      name:'landing',
      component:()=>import ('../views/Landingview.vue')
    },
    {
      path:'/location',
      name:'location',
      component: () => import('../views/LocationView.vue')
    },
    {
      path:'/map',
      name:'map',
      component: () => import('../views/MapView.vue')
    },
    {
      path:'/trip',
      name:'trip',
      component: () => import('../views/TripView.vue')
    },
    {
      path:'/standby',
      name:'standby',
      component: () => import('../views/StandByView.vue')
    },
    {
      path:'/driver',
      name:'driver',
      component:() => import('../views/DriverView.vue')
    },
    {
      path:'/driving',
      name:'driving',
      component: () => import('../views/DrivingView.vue')
    }
  ],
})

router.beforeEach((to, from)=>{
  if(to.name==='login'){
    return true
  }
        if(!localStorage.getItem('token')){
          return {
            name:'login'
          }
        }
        checkTokenAuthenticity();
})

const checkTokenAuthenticity = () =>{
  http().get('api/user',{
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
      .then()
      .catch(Error=>{
        localStorage.removeItem('token')
        router.push({
          name:'login'
        })
      });
}

export default router
