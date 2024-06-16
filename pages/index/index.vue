<script setup lang="ts">
import { onMounted } from "vue";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"; // Import the MapboxGeocoder class
onMounted(() => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibW9oYW1lZHNlZnlhbmkiLCJhIjoiY2x3ZmM1dzhoMW51MDJwcHBzam9mczczMSJ9.Yjg5c94YIQoA1Z25hxGwvg";
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: "country,region,place,postcode,locality,neighborhood",
    countries: "ma",
    language: "fr",
  });

  //geocoder.addTo("#geocoder");
  // Get the geocoder results container.
  const results = document.getElementById("result");

  // Add geocoder result to container.
  geocoder.on("result", (e: any) => {
    console.log(e.result);
  });

  // Clear results container when search is cleared.
  geocoder.on("clear", () => {
    if (results) {
      results.innerText = "";
    }
  });
});
</script>

<template>
  <div class="flex justify-center">
    <div
      class="flex justify-center relative -z-10 -mt-[112px] md:mt-10 w-screen lg:w-[90%] 2xl:w-[80%]"
    >
      <div
        class="background-image h-[600px] object-cover rounded-xl drop-shadow-2xl"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.background-image {
  background-image: url("https://ztrbtjigrrjjylmcaykj.supabase.co/storage/v1/object/public/assets/belle-vue-plus-grande-mosquee-casablanca-maroc-mosquee-hassan-ii.jpg?t=2024-06-07T17%3A15%3A48.972Z");
  background-size: cover;
  width: 100%;
  object-position: right;
  background-position: 50% 0%;
}
</style>
