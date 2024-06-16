<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";

const value = ref("");
const router = useRouter();

const handleSubmit = () => {
  router.push(`/search?search=${value.value}`);
};
</script>
<template>
  <div
    class="flex items-center justify-center fixed w-screen top-0 bg-white shadow-lg border-b border-opacity-25 border-[#1d221f]"
  >
    <div
      class="grid grid-flow-col items-center w-full gap-10 max-w-7xl my-3 mx-6"
    >
      <div class="w-max hidden md:block">
        <NuxtLink to="/">
          <img src="../assets/logo.svg" />
        </NuxtLink>
      </div>
      <form @submit.prevent="handleSubmit">
        <IconField>
          <InputIcon class="pi pi-search"> </InputIcon>
          <InputText
            class="rounded-xl py-3"
            v-model="value"
            placeholder="rechercher..."
          />
        </IconField>
      </form>
    </div>
  </div>
</template>
