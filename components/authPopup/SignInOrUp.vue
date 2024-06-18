<script setup lang="ts">
import { inject } from "vue";

const email = inject<string>("email") || "";
let authPopup = inject<boolean>("authPopup") || false;

const emit = defineEmits(["signInPopup", "signUpPopup", "openOtp"]);

const supabase = useSupabaseClient();
const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.error("Error signing in with Google", error.message);
  }
};

const signInOrUp = async () => {
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
    emit("signInPopup");
  } else if (emailExists === "not_found") {
    console.log("Email does not exist.");
    emit("signUpPopup");
  } else {
    emit("openOtp");
    console.log("not confirmed email");
  }
};
</script>

<template>
  <form @submit.prevent="signInOrUp">
    <div class="mx-8 my-10">
      <div class="flex justify-end items-center">
        <div class="mb-5 w-max cursor-pointer">
          <i class="pi pi-times" @click="authPopup = !authPopup"></i>
        </div>
      </div>
      <div class="">
        <h3 class="font-semibold text-lg">Créer un compte ou se connecter</h3>
        <h6 class="text-sm opacity-50">Commencez gratuitement</h6>
      </div>
      <div class="flex justify-center mt-5">
        <Button
          @click="signInWithGoogle"
          severity="primary"
          class="w-full"
          outlined
        >
          <img
            src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
            class="w-5 h-5 mr-2"
          />
          Se connecter avec Google
        </Button>
      </div>
      <div class="flex justify-center mt-5">
        <div
          class="w-[90%] border-b -translate-y-[40%] border-gray-200 mx-1"
        ></div>
        <p class="text-sm opacity-50">ou</p>
        <div
          class="w-[90%] border-b -translate-y-[40%] border-gray-200 mx-1"
        ></div>
        <div></div>
      </div>
      <div class="flex justify-center mt-5">
        <InputText
          type="email"
          v-model="email"
          placeholder="Email"
          class="w-full"
        />
      </div>
      <div class="flex justify-center mt-5">
        <Button
          label="s'enregistrer ou se connecter"
          class="w-full"
          type="submit"
        />
      </div>
    </div>
  </form>
</template>
