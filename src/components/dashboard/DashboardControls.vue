<script setup lang="ts">
import { reactive, watch } from "vue";
import { useDashboardStore } from "../../store/dashboard";

const dashboardStore = useDashboardStore();

const questionTypes = reactive(dashboardStore.questionTypes);

const position = reactive({ top: "0", left: "revert", right: "0" });

watch(
  () => dashboardStore.selectedCardEl,
  async (cardEl) => {
    if (!cardEl) return;

    setTimeout(() => {
      const box = cardEl.getBoundingClientRect();
      position.top = window.scrollY + box.top + "px";
      position.left = box.right + "px";
      position.right = "revert";
    }, 10);
  }
);
</script>

<template>
  <div
    class="absolute py-2 hidden md:flex flex-col shadow-md bg-white rounded-lg text-gray-500 ml-3 transition-all duration-200 ease-linear select-none"
    :style="{ top: position.top, left: position.left, right: position.right }"
  >
    <span
      v-for="{ id, name, icon } in questionTypes"
      :key="id"
      class="material-icons mx-1 px-2 py-2 cursor-pointer rounded-full hover:bg-gray-100"
      :title="name"
      @click="dashboardStore.addNewQuestion(id)"
    >
      {{ icon }}
    </span>
  </div>
  <div class="fixed w-full bottom-0 text-gray-500 md:hidden z-30 select-none">
    <div
      class="py-2 w-fit mx-auto flex flex-row justify-center drop-shadow-md bg-white rounded-t-lg"
    >
      <span
        v-for="{ id, name, icon } in questionTypes"
        :key="id"
        class="material-icons mx-1 px-2 py-2 cursor-pointer rounded-full hover:bg-gray-100"
        :title="name"
        @click="dashboardStore.addNewQuestion(id)"
      >
        {{ icon }}
      </span>
    </div>
  </div>
</template>
