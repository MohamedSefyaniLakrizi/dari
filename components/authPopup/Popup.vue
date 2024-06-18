<script setup lang="ts">
import { ref, provide, defineEmits } from "vue";
import SignInOrUp from "./SignInOrUp.vue";
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const selectedCountry = ref();
const phoneNumber = ref();
provide("email", email);
provide("password", password);
provide("firstName", firstName);
provide("lastName", lastName);
provide("selectedCountry", selectedCountry);
provide("phoneNumber", phoneNumber);
const signInPopup = ref(false);
const signUpPopup = ref(false);
const otpPopup = ref(false);
onMounted(() => {
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "";
});

const signInWithOtp = async () => {
  console.log(email.value);
  console.log("trying to sign in");
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: "http://localhost:3000/confirm",
    },
  });
  if (error) console.log(error);
};
const renderSignIn = () => {
  console.log("render sign in called");
  signInPopup.value = true;
  signUpPopup.value = false;
};
const renderSignUp = () => {
  console.log("render sign up called");
  signUpPopup.value = true;
  signInPopup.value = false;
};

const goBack = () => {
  console.log("called go back");
  signInPopup.value = false;
  signUpPopup.value = false;
  otpPopup.value = false;
};

const openOtp = () => {
  console.log("called open otp");
  signInPopup.value = false;
  signUpPopup.value = false;
  otpPopup.value = true;
};
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-50 bg-black bg-opacity-30 flex justify-center items-center"
  >
    <Toast />
    <div
      class="w-96 h-[500px] bg-white rounded-2xl border-gray-400 border overflow-hidden"
    >
      <ScrollPanel style="width: 100%; height: 500px">
        <SignInOrUp
          :email="email"
          @sign-in-popup="renderSignIn"
          @sign-up-popup="renderSignUp"
          @open-otp="openOtp"
          @go-back="goBack"
          v-if="!signInPopup && !signUpPopup && !otpPopup"
        />
        <SignIn :email="email" v-if="signInPopup" @go-back="goBack" />
        <SignUp
          :email="email"
          v-if="signUpPopup"
          @go-back="goBack"
          @open-otp="openOtp"
        />
        <Otp v-if="otpPopup" @open-otp="openOtp" @go-back="goBack" />
      </ScrollPanel>
    </div>
  </div>
</template>
