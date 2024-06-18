<script setup lang="ts">
import { inject, ref } from "vue";
import { useToast } from "primevue/usetoast";
const toast = useToast();
let authPopup = inject<boolean>("authPopup") || false;
const email = inject<string>("email") || "";
const password = inject<string>("password") || "";
const otpValue = ref("");
const supabase = useSupabaseClient();
const submitOtp = async () => {
  const { code, body } = await $fetch("/api/confirmAccount", {
    method: "post",
    body: {
      email: email,
      token: otpValue,
    },
  });
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (code == 500 || error) {
    console.error("Error signing up", body);
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: body,
      life: 3000,
    });
  } else {
    console.log("Sign up successful");

    toast.add({
      severity: "success",
      summary: "Succès",
      detail: "Un email de confirmation a été envoyé",
      life: 3000,
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
      detail: "Veuillez attendre 60 secondes avant de renvoyer le code",
      life: 3000,
    });
  } else if (code == 200) {
    toast.add({
      severity: "success",
      summary: "Succès",
      detail: "Un email de confirmation a été envoyé",
      life: 3000,
    });
    authPopup = !authPopup;
  }
};
</script>

<template>
  <div v-focustrap class="mx-8 my-10">
    <div class="flex justify-between items-center">
      <div class="mb-5 w-max cursor-pointer" @click="$emit('goBack')">
        <i class="pi pi-arrow-left"></i>
      </div>
      <div class="mb-5 w-max cursor-pointer" @click="authPopup = !authPopup">
        <i class="pi pi-times"></i>
      </div>
    </div>
    <Toast />
    <h3 class="text-lg font-bold">Vérifier votre compte</h3>
    <h6 class="text-sm opacity-50">
      Entrez le code envoyer à votre adresse email
    </h6>
    <div class="mt-16">
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
          @click="resendOtp"
        ></Button>
        <Button label="Submit Code" @click="submitOtp"></Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-otp-input {
  width: 45px;
  height: 45px;
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
