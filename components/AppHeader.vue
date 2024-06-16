<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import Popup from "./authPopup/Popup.vue";
const showMobileMenu = ref(false);
const toggle_drawer = () => {
  showMobileMenu.value = !showMobileMenu.value;
};
const route = useRoute();
watch(route, () => {
  showMobileMenu.value = false;
});

const scrolled = ref(false);

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  if (route.path === "/") {
    scrolled.value = window.scrollY > 200;
  } else {
    scrolled.value = false;
  }
};
</script>

<template>
  <header
    class="bg-transparent md:bg-white md:border-b md:border-black md:border-opacity-10"
  >
    <div class="grid grid-cols-3 items-center h-28 md:h-20 z-20 mx-5 md:mx-16">
      <div class="flex items-center">
        <NuxtLink class="hidden md:block" to="/">
          <img src="../assets/logo.svg" />
        </NuxtLink>
      </div>
      <div class="flex items-center justify-center">
        <NuxtLink class="md:hidden" to="/">
          <img src="../assets/logo.svg" />
        </NuxtLink>
      </div>
      <ul
        class="hidden md:flex md:justify-end md:gap-2 md:items-center lg:text-lg lg:gap-5"
      >
        <li>
          <NuxtLink to="/about"
            ><p class="font-semibold text-base">about</p></NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/contact"
            ><p class="font-semibold text-base">contact</p></NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/search"
            ><p class="font-semibold text-base">search</p></NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/login">
            <p class="font-semibold text-base">se connecter</p>
          </NuxtLink>
        </li>
      </ul>
      <div class="flex md:hidden justify-end items-center">
        <i
          @click="toggle_drawer"
          class="pi pi-bars flex text-xl cursor-pointer"
        />
      </div>
      <transition
        enter-active-class="transition-opacity ease-linear duration-300"
        enter-class="opacity-0"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-300"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <MobileNav v-if="showMobileMenu" @toggle="toggle_drawer" />
      </transition>
    </div>
  </header>
  <transition
    enter-active-class="transition-transform ease-in-out duration-100"
    enter-class="transform -translate-y-full"
    enter-from-class="transform -translate-y-full"
    enter-to-class="transform translate-y-0"
    leave-active-class="transition-transform ease-in-out duration-100"
    leave-class="transform translate-y-0"
    leave-to-class="transform -translate-y-full"
  >
    <SearchBar v-if="scrolled" />
  </transition>
  <Popup />
</template>
