<script setup lang="ts">
import { nanoid } from "nanoid";
import { computed, reactive } from "vue";

import { useDashboardStore } from "../../store/dashboard";
import BaseCard from "../../base/BaseCard.vue";
import BaseSelect from "../../base/BaseSelect.vue";
import BaseTextArea from "../../base/BaseTextArea.vue";

import QuestionChoice from "./questions_types/QuestionChoice.vue";
import QuestionCheck from "./questions_types/QuestionCheck.vue";
import QuestionDrop from "./questions_types/QuestionDrop.vue";

const dashboardStore = useDashboardStore();
const id = nanoid();
const isCardSelected = computed(() => dashboardStore.checkIsSelected(id));

const state = reactive({
  questionHeader: "",
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
            v-model="state.questionHeader"
            :inSelectedCard="isCardSelected"
            placeholder="Question"
          />
          <BaseSelect
            v-show="isCardSelected"
            :options="state.questionTypes"
            v-model:selectedOption="state.selectedQuestionType"
          />
        </header>
        <QuestionChoice
          v-if="state.selectedQuestionType === 'choice'"
          :inSelectedCard="isCardSelected"
        />
        <QuestionCheck
          v-else-if="state.selectedQuestionType === 'check'"
          :inSelectedCard="isCardSelected"
        />
        <QuestionDrop
          v-else-if="state.selectedQuestionType === 'drop'"
          :inSelectedCard="isCardSelected"
        />
      </div>
    </template>
  </BaseCard>
</template>
