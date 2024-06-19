<script setup lang="ts">
const selectedCity = ref();
const longitude = ref();
const latitude = ref();
const emit = defineEmits(["updateLocalization", "moveToFillInfo"]);
watch(selectedCity, async (newVal) => {
  const response = await $fetch("/api/findCity", {
    method: "post",
    body: {
      city: newVal,
    },
  });
  if (response) {
    longitude.value = parseFloat(response.longitude);
    latitude.value = parseFloat(response.latitude);
    console.log("position", longitude.value, latitude.value);
  }
});
const bigCities = ref([
  { name: "Casablanca", code: "CA" },
  { name: "Rabat", code: "RA" },
  { name: "Marrakesh", code: "MA" },
  { name: "Tangier" },
  { name: "Agadir" },
  { name: "Fez" },
]);
const cities = ref([
  { name: "Agadir", code: "" },
  { name: "Al Hoceima", code: "" },
  { name: "Asilah", code: "" },
  { name: "Ben ahmed", code: "" },
  { name: "Ben Guerir", code: "" },
  { name: "Beni Mellal", code: "" },
  { name: "Berkane", code: "" },
  { name: "Berrechid", code: "" },
  { name: "Bouarfa", code: "" },
  { name: "Boujdour", code: "" },
  { name: "Casablanca", code: "" },
  { name: "Ceuta", code: "" },
  { name: "Chichaoua", code: "" },
  { name: "Dakhla", code: "" },
  { name: "El Jadida", code: "" },
  { name: "Errachidia", code: "" },
  { name: "Essaouira", code: "" },
  { name: "Fez", code: "" },
  { name: "Figuig", code: "" },
  { name: "Guelmim", code: "" },
  { name: "Kenitra", code: "" },
  { name: "Khemisset", code: "" },
  { name: "Khenifra", code: "" },
  { name: "Khouribga", code: "" },
  { name: "Ksar el-Kebir", code: "" },
  { name: "Laayoune", code: "" },
  { name: "Larache", code: "" },
  { name: "Marrakesh", code: "" },
  { name: "Meknes", code: "" },
  { name: "Melilla", code: "" },
  { name: "Mohammedia", code: "" },
  { name: "Nador", code: "" },
  { name: "Ouarzazate", code: "" },
  { name: "Oued Zem", code: "" },
  { name: "Oujda", code: "" },
  { name: "Rabat", code: "" },
  { name: "Safi", code: "" },
  { name: "Salé", code: "" },
  { name: "Sebt Gzoula", code: "" },
  { name: "Settat", code: "" },
  { name: "Sidi Ifni", code: "" },
  { name: "Sidi Kacem", code: "" },
  { name: "Sidi Slimane", code: "" },
  { name: "Smara", code: "" },
  { name: "Tangier", code: "" },
  { name: "Tan-Tan", code: "" },
  { name: "Taourirt", code: "" },
  { name: "Taroudant", code: "" },
  { name: "Taza", code: "" },
  { name: "Temara", code: "" },
  { name: "Tétouan", code: "" },
  { name: "Tinghir", code: "" },
  { name: "Tiznit", code: "" },
  { name: "Zagora", code: "" },
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
    draggable: false,
  })
    .setLngLat([-7.605, 33.5])
    .addTo(map);

  function onDragEnd() {
    const lngLat = marker.getLngLat();
    console.log(`Longitude: ${lngLat.lng} Latitude: ${lngLat.lat}`);
  }

  marker.on("dragend", onDragEnd);
  watch(longitude, () => {
    map.flyTo({
      center: [longitude.value, latitude.value],
      zoom: 9,
    });
    emit("updateLocalization", [longitude.value, latitude.value]);
  });

  map.on("move", function (e) {
    marker.setLngLat(map.getCenter());
  });

  map.on("dragend" || "moveend", function (e) {
    console.log(map.getCenter());
    emit("updateLocalization", [map.getCenter().lng, map.getCenter().lat]);
  });
});
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <div class="w-full md:w-1/2 mb-10 md:mb-0 md:h-screen">
      <div class="w-full h-full mt-16 px-16">
        <h1 class="text-4xl">Choisissez votre ville</h1>
        <select
          name="cities"
          placeholder="Casablanca"
          class="rounded-md px-4 py-2 w-80 bg-transparent border border-gray-300 mt-4"
          v-model="selectedCity"
        >
          <optgroup class="h-0">
            <option
              v-for="city in bigCities"
              :value="city.name"
              :key="city.name"
            >
              {{ city.name }}
            </option>
          </optgroup>
          <optgroup label="Toutes les villes">
            <option v-for="city in cities" :value="city.name" :key="city.name">
              {{ city.name }}
            </option>
          </optgroup>
        </select>
        <div class="flex flex-col items-center 2xl:items-start">
          <div class="w-full 2xl:w-max">
            <h4 class="mt-20 text-sm opacity-70">
              Après avoir choisie votre localisation exacte, veuillez clicker
              sur continuer
            </h4>
            <Button
              class="mt-5 w-full"
              label="Continuer"
              raised
              :disabled="!(longitude && latitude)"
              @click="$emit('moveToFillInfo')"
            />
          </div>
        </div>
      </div>
    </div>
    <transition
      enter-active-class="transition-opacity ease-linear duration-100 delay-300"
      enter-class="opacity-0"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-100"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="!longitude"
        class="absolute w-1/2 h-full right-0 bg-white z-20"
      />
    </transition>
    <div id="map" class="w-full md:w-1/2 h-[80vh] md:h-screen"></div>
  </div>
</template>
