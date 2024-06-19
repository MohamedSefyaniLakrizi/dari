<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, watchEffect } from "vue";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import InputText from "primevue/inputtext";

const route = useRoute();
const searchQuery = ref(route.query.search ?? "");
const inputValue = ref("");
const router = useRouter();
const handleSubmit = () => {
  router.push({ path: "/search", query: { search: inputValue.value } });
};

mapboxgl.accessToken =
  "pk.eyJ1IjoibW9oYW1lZHNlZnlhbmkiLCJhIjoiY2x3ZmM1dzhoMW51MDJwcHBzam9mczczMSJ9.Yjg5c94YIQoA1Z25hxGwvg";

onMounted(() => {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mohamedsefyani/clwkns27c00ww01qrf635bfvy",
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
  /*mapboxgl.setRTLTextPlugin(
      "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
      (error: any) => {
        if (error) {
          console.error(error);
        }
      },
      true // Lazy load the plugin
    );*/
  map.on("load", () => {
    map.resize();
    map.on("click", "dari", (e) => {
      // Copy coordinates array.
      console.log(e);
      console.log(map.queryRenderedFeatures(e.point));

      const features = map.queryRenderedFeatures(e.point);
      const coordinates = features[0].geometry.coordinates.slice();
      const name =
        features.length > 0
          ? features[0]?.properties?.name || "no name"
          : "no name";

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup().setLngLat(coordinates).setHTML(name).addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on("mouseenter", "places", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseenter", "dari", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("moveend", (e) => {
      console.log(map.queryRenderedFeatures(e.point));
    });
    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "places", () => {
      map.getCanvas().style.cursor = "";
    });
    map.on("mouseleave", "dari", () => {
      map.getCanvas().style.cursor = "";
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      countries: "ma",
      language: "fr",
      flyTo: false,
      marker: false,
    });
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(geocoder);
    const geocoderElement = document.getElementById("geocoder");
    if (geocoderElement) {
      geocoderElement.appendChild(geocoder.onAdd(map));
    }
    watchEffect(() => {
      searchQuery.value = route.query.search ?? "";
      inputValue.value = searchQuery.value.toString();
      geocoder.query(searchQuery.value.toString());
    });

    geocoder.on("result", ({ result }) => {
      map.flyTo({
        center: result.center,
        zoom: 9,
      });
    });
  });
});
</script>

<template>
  <div class="flex">
    <div><div id="map" class="map"></div></div>
    <div id="search-container" class="flex justify-center h-max w-full mt-5">
      <form @submit.prevent="handleSubmit">
        <InputGroup class="!w-96">
          <InputText v-model="inputValue" placeholder="Chercher" />
          <Button icon="pi pi-search" />
        </InputGroup>
      </form>
    </div>
  </div>
</template>

<style scoped>
#map {
  height: 90vh;
  width: 50vw !important;
}
.mapboxgl-ctrl-top-right > .mapboxgl-ctrl-geocoder,
.mapbox-gl-geocoder--no-results,
#search-container > .mapboxgl-ctrl-geocoder {
  display: none !important;
  height: 0;
}
</style>
