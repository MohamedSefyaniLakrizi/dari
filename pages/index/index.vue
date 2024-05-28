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

    geocoder.addTo("#geocoder");
    // Get the geocoder results container.
    const results = document.getElementById("result");

    // Add geocoder result to container.
    geocoder.on("result", (e: mapboxgl.GeocoderResultEvent) => {
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
    <div class="w-4/5 aspect-video 2xl:w-3/4">
      <div
        class="background-image h-full w-full rounded-lg shadow-md flex items-end"
      >
        <div class="m-10">
          <h1 class="text-5xl text-white pl-5 w-96 font-bold">
            Trouver votre maison de rêve en toute simplicité
          </h1>
          <div id="geocoder" class="z-10 m-5"></div>
          <pre id="result"></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .background-image {
    background-image: url("https://ztrbtjigrrjjylmcaykj.supabase.co/storage/v1/object/public/assets/you-deal-3xtkv4deqhE-unsplash__1_.jpg?t=2024-05-27T11%3A58%3A59.558Z");
    background-size: cover;
    background-position: center;
  }
</style>
