<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">Enter your
      <span v-if="!useLogin.waitingForVerification"> phone number </span>
      <span v-else>Super Secret Code</span>
    </h1>
    <form action="#" @submit.prevent="useLogin.handleLogin" v-if="!useLogin.waitingForVerification">
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-white px-4 py-5 sm:p-6">
          <div>
            <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Only enter your mobile number.."
                class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm"
                v-maska data-maska="+91 ##### #####" v-model="useLogin.credentials.phone"
            />
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <loading-button :status="useLogin.isLoading" :buttonName="'Continue'"/>
        </div>
      </div>
    </form>
    <!--  Login code verification&#45;&#45;-->
    <form action="#" @submit.prevent="useLogin.handleVerification" v-else>
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-white px-4 py-5 sm:p-6">
          <div>
            <input
                type="text"
                name="login_code"
                id="login_code"
                placeholder="######"
                class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm"
                v-maska data-maska="######" v-model="useLogin.credentials.login_code"
            />
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <loading-button :status="isLoading" :buttonName="'Verify'"/>

        </div>
      </div>
    </form>
  </div>
</template>


<script setup>
import {vMaska} from "maska"
import {onMounted} from "vue";
import LoadingButton from "../components/buttons/loading.vue";
import {useRouter} from "vue-router";
import {loginStore} from "../stores/loginStore";
const useLogin = loginStore();

const router = useRouter();
onMounted(()=>{
  if(localStorage.getItem('token')){
    router.push({
      name:'landing'
    })
  }
})
</script>
