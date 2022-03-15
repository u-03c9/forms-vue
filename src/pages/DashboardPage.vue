<script setup lang="ts">
import { getAuth } from "firebase/auth";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

import { useDashboardStore } from "../store/dashboard";

import TitleCard from "../components/dashboard/TitleCard.vue";
import QuestionCard from "../components/dashboard/QuestionCard.vue";
import DashboardControls from "../components/dashboard/DashboardControls.vue";

const dashboardStore = useDashboardStore();
const questions = reactive(dashboardStore.questions);
if (questions.values.length === 0) dashboardStore.addNewQuestion();

const router = useRouter();
function signOut() {
  getAuth().signOut();
  router.replace({ name: "home" });
}

onMounted(() => {
  dashboardStore.setSelectedCard(dashboardStore.formId);
});
</script>

<template>
  <div>
    <div class="fixed top-0 left-0 bg-primary-light w-screen h-screen -z-50" />
    <nav class="w-full flex flex-row justify-between px-2 py-2 bg-white">
      <div>
        <span>forms-vue</span>
      </div>
      <div>
        <button @click="signOut">sign out</button>
      </div>
    </nav>
    <main class="w-full mx-auto mt-12 pb-12">
      <form class="w-full">
        <TitleCard
          :cardId="dashboardStore.formId"
          v-model:title="dashboardStore.title"
          v-model:description="dashboardStore.description"
        />
        <QuestionCard v-for="{ id } in questions" :questionId="id" :key="id" />
      </form>
    </main>
    <DashboardControls />
  </div>
</template>

<style scoped></style>
