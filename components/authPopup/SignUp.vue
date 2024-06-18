<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { usePrimeVue } from "primevue/config";
import { inject, ref } from "vue";

const toast = useToast();

const countries = [
  { name: "🇲🇦 Maroc", code: "🇲🇦 +212" },
  { name: "🇫🇷 France", code: "🇫🇷 +44" },
  { name: "🇺🇸 États-Unis", code: "🇺🇸 +1" },
  { name: "🇪🇸 Espagne", code: "🇪🇸 +34" },
];
let authPopup = inject<boolean>("authPopup") || false;
let firstName = inject<string>("firstName") || "";
let lastName = inject<string>("lastName") || "";
let email = inject<string>("email") || "";
let password = inject<string>("password") || "";
const confirm_password = ref("");
let selectedCountry = inject<any>("selectedCountry") || "";
let phoneNumber = inject<any>("phoneNumber") || "";
const emit = defineEmits(["openOtp", "goBack"]);
const primevue = usePrimeVue();
if (primevue.config.locale) {
  primevue.config.locale.weak = "faible";
  primevue.config.locale.medium = "moyen";
  primevue.config.locale.strong = "fort";
  primevue.config.locale.passwordPrompt = "entrer un mot de passe";
}

const signUp = async () => {
  console.log("password ", password.value);
  console.log("confirm_password ", confirm_password.value);
  if (password.value !== confirm_password.value) {
    console.log("Passwords do not match");
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "Les mots de passe ne correspondent pas",
      life: 3000,
    });
    return;
  }
  const response = await $fetch("/api/checkEmail", {
    method: "post",
    body: {
      email: email,
    },
  });
  const emailExists = response;
  console.log("response is");
  console.log(response);
  if (emailExists === "found") {
    console.log("Email exists.");
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "Cet email existe déjà",
      life: 3000,
    });
    return;
  }
  email = email.value;
  password = password.value;
  firstName = firstName.value;
  lastName = lastName.value;
  phoneNumber = phoneNumber.value.split("-").join("");
  console.log("email ", email);
  console.log("password ", password);
  console.log("firstName ", firstName);
  console.log("lastName ", lastName);
  console.log("phoneNumber ", phoneNumber);
  let selectedCountryValue = 0;
  if (selectedCountry._rawValue.code == "🇲🇦 +212") {
    selectedCountry = "212";
    console.log("selectedCountry ", 212);
  } else if (selectedCountry._rawValue.code == "🇫🇷 +44") {
    selectedCountry = "44";
    console.log("selectedCountry ", 44);
  } else if (selectedCountry._rawValue.code == "🇺🇸 +1") {
    selectedCountry = "1";
    console.log("selectedCountry ", 1);
  } else if (selectedCountry._rawValue.code == "🇪🇸 +34") {
    selectedCountry = "34";
    console.log("selectedCountry ", 34);
  }
  const { code, body } = await $fetch("/api/createAccount", {
    method: "post",
    body: {
      email: email,
      password: password,
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
    emit("openOtp");
  }
};
</script>

<template>
  <form @submit.prevent="signUp">
    <div v-focustrap class="overflow-hidden">
      <Toast />
      <div class="mx-8 my-10">
        <div class="flex justify-between items-center">
          <div class="mb-5 w-max cursor-pointer" @click="$emit('goBack')">
            <i class="pi pi-arrow-left"></i>
          </div>
          <div
            class="mb-5 w-max cursor-pointer"
            @click="authPopup = !authPopup"
          >
            <i class="pi pi-times"></i>
          </div>
        </div>
        <h3 class="font-semibold text-lg">Créer votre compte</h3>
        <h6 class="text-sm opacity-50">Commencez gratuitement</h6>
        <div class="mt-10 flex flex-col gap-7">
          <FloatLabel>
            <InputText class="w-full" v-model="email" type="email" />
            <label for="email">Email</label>
          </FloatLabel>
          <FloatLabel>
            <InputText class="w-full" v-model="firstName" />
            <label for="firstName">Prénom</label>
          </FloatLabel>
          <FloatLabel>
            <InputText class="w-full" v-model="lastName" />
            <label for="lastName">Nom de famille</label>
          </FloatLabel>
          <FloatLabel>
            <Password
              class="w-full"
              v-model="password"
              inputId="password"
              inputClass="w-full"
              toggleMask
            >
              <template #header class="w-full">
                <div class="font-semibold text-xm mb-4">
                  Choisie un mot de passe
                </div>
              </template>
              <template #footer class="w-full">
                <Divider class="w-full" />
                <ul class="pl-2 ml-2 my-0 leading-normal w-full">
                  <li class="font-medium">
                    Pour votre sécurité, veuillez utiliser
                  </li>
                  <li>Au moins une minuscule</li>
                  <li>Au moins une majuscule</li>
                  <li>Au moins un chiffre</li>
                  <li>Minimum de 8 caractères</li>
                </ul>
              </template></Password
            >
            <label for="password">Mot de passe</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              class="w-full"
              v-model="confirm_password"
              type="password"
            />
            <label for="password" password>Confirmer le mot de passe</label>
          </FloatLabel>

          <div class="flex">
            <Dropdown
              v-model="selectedCountry"
              :options="countries"
              optionLabel="code"
              placeholder="Code"
              class="w-32"
              selectionMessage="name"
            />
            <InputMask
              class="w-full"
              id="phoneNumber"
              v-model="phoneNumber"
              mask="9-99-99-99-99"
              placeholder="numéro de téléphone"
            />
          </div>
          <Button
            class="w-full"
            label="Créer un compte"
            icon="pi pi-arrow-right"
            iconPos="right"
            type="submit"
          />
        </div>
      </div>
    </div>
  </form>
</template>
