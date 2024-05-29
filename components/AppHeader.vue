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
  <header>
    <div class="grid grid-cols-3 h-28">
      <div class=""></div>
      <div class="flex justify-center items-center text-3xl">Dari</div>
      <ul class="hidden lg:flex lg:justify-end lg:gap-2 lg:m-5 lg:items-center">
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
      <div class="flex lg:hidden justify-end mr-10 items-center">
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
