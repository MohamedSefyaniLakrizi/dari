<script setup lang="ts">
  import { defineProps, defineEmits } from "vue";

  const emit = defineEmits(["toggle"]);
</script>

<template>
  <div
    ref="mobile_menu"
    class="w-screen h-screen top-0 left-0 fixed z-[9999] bg-indigo-100"
  >
    <div class="flex justify-end mt-[46px] mr-10 items-center">
      <i
        @click="emit('toggle')"
        class="pi pi-times flex text-xl cursor-pointer"
      />
    </div>
    <ul>
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
  </div>
</template>
