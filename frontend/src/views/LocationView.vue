<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">Let Us Know Where You're Planning to Go?</h1>
    <form action="#" @submit.prevent="SearchAutoComplete.locationSelected">
      <div class="overflow-hidden shadow sm:rounded-md max-w-md mx-auto text-left">
        <div class="bg-white px-4 py-5 sm:p-6">
          <div>
            <input
                type="text"
                v-model="SearchAutoComplete.searchQuery"
                @input="SearchAutoComplete.searchAddress"
                placeholder="Enter your address"
                class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm"
            />
            <div v-if="SearchAutoComplete.suggestions.length" class="search-suggestion h-12 overflow-y-auto border border-gray-300">
              <ul class="cursor-pointer">
                <li v-for="suggestion in SearchAutoComplete.suggestions" :key="suggestion.id" @click="SearchAutoComplete.selectSuggestion(suggestion)"
                    class="px-4 py-2 hover:bg-gray-100">
                  {{ suggestion.place_name }}
                </li>
              </ul>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                  type="submit"
                  class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-2 text-white
                  hover:bg-green-700 cursor-pointer"
              >
                Find A Ride
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import {useSearchAutoComplete} from "../stores/locationSearchStore"
const SearchAutoComplete = useSearchAutoComplete();
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0.5rem;
}

::-webkit-scrollbar-thumb {
  background-color: #f59696;
}

::-webkit-scrollbar-track {
  background-color: #544f4f;
}
</style>
