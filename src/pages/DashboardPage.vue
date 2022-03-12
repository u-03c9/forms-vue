<script setup lang="ts">
import { getAuth } from "firebase/auth";
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import TitleCard from "../components/TitleCard.vue";
import QuestionCard from "../components/QuestionCard.vue";

const router = useRouter();
function signOut() {
  getAuth().signOut();
  router.replace({ name: "home" });
}

const state = reactive({
  title: "Untitled form",
  description: "",
});

watch(state, () => {
  console.log({ ...state });
});
</script>

<template>
  <div class="bg-[#f0ebf8]">
    <nav class="w-full flex flex-row justify-between px-2 py-2 bg-white">
      <div>
        <span>forms-vue</span>
      </div>
      <div>
        <button @click="signOut">sign out</button>
      </div>
    </nav>
    <main class="w-full mx-auto mt-12 pb-12">
      <form>
        <TitleCard
          v-model:title="state.title"
          v-model:description="state.description"
        />
        <QuestionCard />
      </form>
    </main>
  </div>
</template>

<style scoped></style>
