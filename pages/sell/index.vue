<script setup lang="ts">
const sellOrLoanData = ref();
const localization = ref<number[]>();
provide("sellOrLoanData", sellOrLoanData);
const sellOrLoan = ref(true);
const chooseLocation = ref(false);
console.log(chooseLocation.value);
const moveToChooseLocation = () => {
  sellOrLoan.value = false;
  chooseLocation.value = true;
  console.log("sell or loan data ", sellOrLoanData.value);
};
const moveToFillInfo = () => {
  sellOrLoan.value = false;
  chooseLocation.value = false;
};

watch(sellOrLoanData, () => {
  console.log("sellOrLoanData", sellOrLoanData.value);
});

const updateLocalization = (newLocalization: number[]) => {
  localization.value = newLocalization;
  console.log("localization", localization.value);
};
</script>

<template>
  <div class="w-full h-full">
    <SellOrLoan
      v-if="sellOrLoan"
      @move-to-choose-location="moveToChooseLocation"
    />
    <ChooseLocation
      v-if="chooseLocation"
      @update-localization="updateLocalization"
      @move-to-fill-info="moveToFillInfo"
    />
    <FillInformation v-if="!sellOrLoan && !chooseLocation" />
  </div>
</template>
