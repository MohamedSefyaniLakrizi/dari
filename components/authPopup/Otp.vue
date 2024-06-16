<script setup lang="ts">
import { inject, ref } from "vue";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const firstName = inject<string>("firstName") || "";
const lastName = inject<string>("lastName") || "";
const email = inject<string>("email") || "";
const selectedCountry = inject<any>("selectedCountry") || "";
const phoneNumber = inject<any>("phoneNumber") || "";
const otpValue = ref("");

const submitOtp = async () => {
  const { code, body } = await $fetch("/api/confirmAccount", {
    method: "post",
    body: {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      countryCode: selectedCountry,
    },
  });
  if (code == 500) {
    console.error("Error signing up", body);
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: body,
    });
  } else {
    console.log("Sign up successful");
    toast.add({
      severity: "success",
      summary: "Succès",
      detail: "Un email de confirmation a été envoyé",
    });
  }
  console.log("submitting otp");
};
const resendOtp = async () => {
  const { code } = await $fetch("/api/resendOtp", {
    method: "post",
    body: {
      email: email,
      otpValue: otpValue,
    },
  });
  if (code == 500) {
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "Erreur lors de l'envoi du code de confirmation",
    });
  } else if (code == 200) {
    toast.add({
      severity: "success",
      summary: "Succès",
      detail: "Un email de confirmation a été envoyé",
    });
  }
};
</script>

<template>
  <div v-focustrap class="mx-8 my-10">
    <Toast />
    <h3 class="text-lg font-bold">Vérifier votre compte</h3>
    <h6 class="text-sm opacity-50">
      Entrez le code envoyer à votre adresse email
    </h6>
    <div class="mt-20">
      <InputOtp v-model="otpValue" :length="6" style="gap: 0">
        <template #default="{ attrs, events, index }">
          <input
            type="text"
            v-bind="attrs"
            v-on="events"
            class="custom-otp-input outline-gray-100 border-gray-300 border focus:border-[#1d221f]"
          />
          <div v-if="index === 3" class="px-4">
            <i class="pi pi-minus" />
          </div>
        </template>
      </InputOtp>
      <div class="flex justify-between mt-8 self-stretch">
        <Button
          label="Resend Code"
          link
          class="p-0"
          @click="submitOtp"
        ></Button>
        <Button label="Submit Code" @click="resendOtp"></Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-otp-input {
  width: 48px;
  height: 48px;
  font-size: 24px;
  appearance: none;
  text-align: center;
  transition: all 0.2s;
  border-radius: 0;
  background: transparent;
  outline-offset: -2px;
  outline-color: transparent;
  transition: outline-color 0.3s;
}

.custom-otp-input:focus {
  outline: 2px solid;
}

.custom-otp-input:first-child,
.custom-otp-input:nth-child(5) {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.custom-otp-input:nth-child(3),
.custom-otp-input:last-child {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border-right-width: 1px;
  border-right-style: solid;
}
</style>
