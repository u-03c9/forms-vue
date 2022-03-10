<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";
import { useMainStore } from "../store";

const router = useRouter();
const mainStore = useMainStore();

function loginWithGoogle() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((user) => {
      router.replace({ name: "dashboard" });
    })
    .catch((error) => {
      console.log("error occurred", error);
    });
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">Login Page</h1>
    <button @click="loginWithGoogle">Sign in with Google</button>
  </div>
</template>

<style scoped></style>
