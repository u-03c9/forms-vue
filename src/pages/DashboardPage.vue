<script setup lang="ts">
import { getAuth } from "firebase/auth";
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";

import TitleCard from "../components/dashboard/TitleCard.vue";
import QuestionCard from "../components/dashboard/QuestionCard.vue";
import { useDashboardStore } from "../store/dashboard";

const dashboardStore = useDashboardStore();
const questions = reactive(dashboardStore.questions);
if (questions.values.length === 0) dashboardStore.addNewQuestion();

const router = useRouter();
function signOut() {
  getAuth().signOut();
  router.replace({ name: "home" });
}
</script>

<template>
  <div class="bg-primary-light">
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
          v-model:title="dashboardStore.title"
          v-model:description="dashboardStore.description"
        />
        <QuestionCard v-for="{ id } in questions" :questionId="id" :key="id" />
      </form>
    </main>
  </div>
</template>

<style scoped></style>
