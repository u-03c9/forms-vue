<script setup lang="ts">
import { getAuth } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
function signOut() {
  getAuth().signOut();
  router.replace({ name: "home" });
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">Dashboard Page</h1>
    <button @click="signOut">sign out</button>
  </div>
</template>

<style scoped></style>
