<script setup lang="ts">
const sellOrLoanData = ref();
provide("sellOrLoanData", sellOrLoanData);
const sellOrLoan = ref(true);
const chooseLocation = ref(false);
console.log(chooseLocation.value);
const moveToChooseLocation = () => {
  sellOrLoan.value = false;
  chooseLocation.value = true;
  console.log("sell or loan data ", sellOrLoanData.value);
};
</script>

<template>
  <div class="w-full h-full">
    <SellOrLoan
      v-if="sellOrLoan"
      @move-to-choose-location="moveToChooseLocation"
    />
    <ChooseLocation v-if="chooseLocation" />
  </div>
</template>
