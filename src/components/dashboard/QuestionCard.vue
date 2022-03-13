<script setup lang="ts">
import { nanoid } from "nanoid";
import { computed, reactive } from "vue";

import { useDashboardStore } from "../../store/dashboard";
import BaseCard from "../../base/BaseCard.vue";
import BaseSelect from "../../base/BaseSelect.vue";
import BaseTextArea from "../../base/BaseTextArea.vue";

const dashboardStore = useDashboardStore();
const id = nanoid();
const isCardSelected = computed(() => dashboardStore.checkIsSelected(id));

const state = reactive({
  selectedQuestionType: "choice",
  questionTypes: [
    {
      id: "choice",
      name: "Multiple choice",
      icon: "radio_button_checked",
    },
    {
      id: "check",
      name: "Checkboxes",
      icon: "check_box",
    },
    {
      id: "drop",
      name: "Dropdown",
      icon: "expand_circle_down",
    },
  ],
});
</script>

<template>
  <BaseCard :id="id">
    <template v-slot>
      <div class="px-6 py-3">
        <header class="w-full flex flex-row gap-3">
          <BaseTextArea
            :inSelectedCard="isCardSelected"
            placeholder="Question"
          />
          <BaseSelect
            v-show="isCardSelected"
            :options="state.questionTypes"
            v-model:selectedOption="state.selectedQuestionType"
          />
        </header>
      </div>
    </template>
  </BaseCard>
</template>
