<script setup lang="ts">
const sellClicked = ref(false);
const loanClicked = ref(false);
const emit = defineEmits(["moveToChooseLocation"]);
let sellOrLoanData = inject("sellOrLoanData");
</script>

<template>
  <div
    class="lg:ml-16 mt-16 h-screen flex flex-col items-center lg:items-start w-screen lg:w-max"
  >
    <h1 class="text-4xl">Vendre ou Louer</h1>
    <div
      class="mt-10 grid justify-center gap-10 w-max sm:grid-cols-1 lg:grid-flow-col"
    >
      <Card
        class="w-96 border hover:border-gray-300 hover:shadow-2xl transition-all duration-200"
        :class="{
          'border-primary-green hover:border-primary-green': sellClicked,
        }"
        @click="
          sellClicked = !sellClicked;
          if (loanClicked) loanClicked = false;
        "
      >
        <template #content>
          <img
            class="aspect-video object-cover"
            src="https://ztrbtjigrrjjylmcaykj.supabase.co/storage/v1/object/public/assets/sell-house.jpg"
          />
        </template>
        <template #footer>
          <div class="flex items-center gap-3">
            <h2 class="text-xl">Vendre</h2>
            <transition
              enter-active-class="transition-opacity ease-linear duration-100"
              enter-class="opacity-0"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
            >
              <i class="pi pi-check text-xl" v-if="sellClicked"></i>
              <i class="pi pi-chevron-right" v-else></i>
            </transition>
          </div>
        </template>
      </Card>
      <Card
        class="w-96 border hover:border-gray-300 hover:shadow-2xl transition-all duration-200"
        :class="{
          'border-primary-green hover:border-primary-green': loanClicked,
        }"
        @click="
          loanClicked = !loanClicked;
          if (sellClicked) sellClicked = false;
        "
      >
        <template #content>
          <img
            class="aspect-video object-cover"
            src="https://ztrbtjigrrjjylmcaykj.supabase.co/storage/v1/object/public/assets/rent-house.jpg"
          />
        </template>
        <template #footer>
          <div class="flex items-center gap-3">
            <h2 class="text-xl">Louer</h2>
            <transition
              enter-active-class="transition-opacity ease-linear duration-100"
              enter-class="opacity-0"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
            >
              <i class="pi pi-check text-xl" v-if="loanClicked"></i>
              <i class="pi pi-chevron-right" v-else></i>
            </transition>
          </div>
        </template>
      </Card>
    </div>
    <div class="w-full flex justify-center lg:justify-end">
      <Button
        label="Continuer"
        class="mt-10"
        size="large"
        @click="
          if (loanClicked) {
            sellOrLoanData = 'loan';
          } else {
            sellOrLoanData = 'sell';
          }
          $emit('moveToChooseLocation');
        "
        :disabled="!loanClicked && !sellClicked"
      />
    </div>
  </div>
</template>
