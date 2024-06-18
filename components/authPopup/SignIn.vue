<script setup lang="ts">
const toast = useToast();
let authPopup = inject<boolean>("authPopup") || false;
const emit = defineEmits(["openOtp", "goBack"]);
const email = inject<string>("email") || "";
const password = ref("");

const signIn = async () => {
  const { code, body } = await $fetch("/api/signIn", {
    method: "post",
    body: {
      email: email,
      password: password,
    },
  });
  if (code == 500) {
    console.error("Error signing in", body);
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "email ou mot de passe incorrect",
      life: 3000,
    });
  } else {
    console.log("Sign in successful");
    toast.add({
      severity: "success",
      summary: "Succès",
      detail: "Vous êtes connecté",
      life: 3000,
    });
  }
};
</script>

<template>
  <form @submit.prevent="signIn">
    <div class="mx-8 my-10">
      <div class="flex justify-between items-center">
        <div class="mb-5 w-max cursor-pointer" @click="$emit('goBack')">
          <i class="pi pi-arrow-left"></i>
        </div>
        <div class="mb-5 w-max cursor-pointer" @click="authPopup = !authPopup">
          <i class="pi pi-times"></i>
        </div>
      </div>
      <h3 class="font-semibold text-lg">Se connecter</h3>
      <h6 class="text-sm opacity-50">Continuer gratuitement</h6>
      <div class="mt-10 flex flex-col gap-7">
        <FloatLabel>
          <InputText class="w-full" v-model="email" type="email" />
          <label for="email">Email</label>
        </FloatLabel>
        <FloatLabel>
          <Password
            class="w-full"
            v-model="password"
            inputId="password"
            inputClass="w-full"
            :feedback="false"
            toggleMask
          />
          <label for="firstName">Mot de passe</label>
        </FloatLabel>
      </div>
      <div class="mt-5">
        <Button type="submit" class="w-full" label="se connecter" raised />
      </div>
    </div>
  </form>
</template>
