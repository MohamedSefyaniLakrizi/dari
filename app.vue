<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url("https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css");
@import url("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css");
@import url("primeicons/primeicons.css");
@import url("~/assets/css/base.css");
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap");

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

html {
  font-family: "Outfit", sans-serif;
  color: #1d221f;
}
</style>
