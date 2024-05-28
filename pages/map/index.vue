<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import mapboxgl from "mapbox-gl";

  const map = ref<mapboxgl.Map | null>(null);

  onMounted(() => {
    mapboxgl.setRTLTextPlugin(
      "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
      (error: any) => {
        if (error) {
          console.error(error);
        }
      },
      true // Lazy load the plugin
    );

    const onMapLoad = (mapInstance: mapboxgl.Map) => {
      map.value = mapInstance as mapboxgl.Map;
      const sources =
        map.value && map.value.getStyle ? map.value.getStyle().sources : null;
      console.log("Sources:", sources);
      mapInstance.on("click", "dari", function (e: mapboxgl.MapMouseEvent) {
        new mapboxgl.Popup().setLngLat(e.lngLat).setHTML("POPUP!").addTo(map);
      });
      mapboxgl.on(
        "click",
        "mohamedsefyani.clwkne9wv04pr1up8jy0s7qrk-956x9",
        (e: mapboxgl.MapMouseEvent) => {
          // Copy coordinates array.
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.description;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
        }
      );
      // Change the cursor to a pointer when the mouse is over the places layer.
      mapboxgl.on("mouseenter", "places", () => {
        mapboxgl.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      mapboxgl.on("mouseleave", "places", () => {
        mapboxgl.getCanvas().style.cursor = "";
      });
    };
    console.log(mapboxgl.Map);
    map.on("load", () => {
      onMapLoad(mapboxgl);
    });
  });
</script>

<template>
  <div class="relative">
    <MapboxMap
      map-id="map"
      style="height: 90vh; width: 100vw"
      :options="{
        style: 'mapbox://styles/mohamedsefyani/clwkns27c00ww01qrf635bfvy', // style URL
        center: [-7.6, 33.5], // starting position
        zoom: 9, // starting zoom
        worldview: 'MA',
        language: 'fr',
        interactive: true,
        minZoom: 5,
        maxBounds: [
          [-22.5, 20.3], // Southwest coordinates
          [-1, 35.0], // Northeast coordinates
        ],
      }"
    >
      <MapboxPopup :lng-lat="[-7.6, 33.5]" class="z-30">
        <p>Hello World</p>
      </MapboxPopup>
    </MapboxMap>
  </div>
</template>

<style>
  #map {
    height: 90vh;
    width: 100vw;
  }
</style>
