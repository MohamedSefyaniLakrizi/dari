<script setup lang="ts">
  import { ref } from "vue";
  import { useRoute } from "vue-router";
  const showMobileMenu = ref(false);
  const toggle_drawer = () => {
    showMobileMenu.value = !showMobileMenu.value;
  };
  const route = useRoute();
  watch(route, () => {
    showMobileMenu.value = false;
  });
</script>

<template>
  <header class="z-50">
    <div class="grid grid-cols-3 h-28 z-20">
      <div class=""></div>
      <div class="flex justify-center items-center text-3xl">Dari</div>
      <ul
        class="hidden md:flex md:justify-end md:gap-2 md:m-5 md:items-center lg:text-lg lg:gap-5"
      >
        <li>
          <NuxtLink to="/about"><p>about</p></NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact"><p>contact</p></NuxtLink>
        </li>
        <li>
          <NuxtLink to="/search"><p>search</p></NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
            <p>home</p>
          </NuxtLink>
        </li>
      </ul>
      <div class="flex md:hidden justify-end mr-10 items-center">
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
</template>
