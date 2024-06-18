<script setup lang="ts">
const selectedCity = ref();
const cities = ref([
  { name: "Casablanca", code: "CA" },
  { name: "Rabat", code: "RA" },
  { name: "Marrakech", code: "MA" },
  { name: "Egypt", code: "EG" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "India", code: "IN" },
  { name: "Japan", code: "JP" },
  { name: "Spain", code: "ES" },
  { name: "United States", code: "US" },
]);
import mapboxgl from "mapbox-gl";

onMounted(() => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibW9oYW1lZHNlZnlhbmkiLCJhIjoiY2x3ZmM1dzhoMW51MDJwcHBzam9mczczMSJ9.Yjg5c94YIQoA1Z25hxGwvg";
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mohamedsefyani/clxkppze000eg01qnaqzu3ozs",
    center: [-7.605, 33.5], // starting position
    zoom: 12, // starting zoom
    worldview: "MA",
    language: "fr",
    interactive: true,
    minZoom: 5,
    maxBounds: [
      [-22.5, 20.3], // Southwest coordinates
      [-1, 35.0], // Northeast coordinates
    ],
  });
  const marker = new mapboxgl.Marker({
    draggable: true,
  })
    .setLngLat([-7.605, 33.5])
    .addTo(map);

  function onDragEnd() {
    const lngLat = marker.getLngLat();
    console.log(`Longitude: ${lngLat.lng} Latitude: ${lngLat.lat}`);
  }

  marker.on("dragend", onDragEnd);
});
</script>

<template>
  <div class="flex">
    <div class="w-1/2 h-screen">
      <div class="w-full h-full mt-16 ml-16">
        <h1 class="text-4xl">Choisissez votre ville</h1>
        <select
          name="cities"
          placeholder="Casablanca"
          class="rounded-md px-4 py-2 w-80 bg-transparent border border-gray-300 mt-4"
        >
          <option v-for="city in cities" :value="city.code" :key="city.code">
            {{ city.name }}
          </option>
        </select>
      </div>
    </div>
    <div id="map" class="w-1/2 h-full hidden"></div>
  </div>
</template>
