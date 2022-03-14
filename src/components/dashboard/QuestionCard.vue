<script setup lang="ts">
import { computed, reactive } from "vue";

import { useDashboardStore, Question } from "../../store/dashboard";

import BaseCard from "../../base/BaseCard.vue";
import BaseSelect from "../../base/BaseSelect.vue";
import BaseTextArea from "../../base/BaseTextArea.vue";

import QuestionChoice from "./questions_types/QuestionChoice.vue";
import QuestionCheck from "./questions_types/QuestionCheck.vue";
import QuestionDrop from "./questions_types/QuestionDrop.vue";

const props = defineProps(["questionId"]);
const dashboardStore = useDashboardStore();

const question: Question = reactive(
  dashboardStore.getQuestionById(props.questionId)
);
const isCardSelected = computed(() =>
  dashboardStore.checkIsSelected(props.questionId)
);
</script>

<template>
  <BaseCard :id="questionId">
    <template v-slot>
      <div class="mx-6 my-3">
        <header class="w-full flex flex-row gap-3">
          <BaseTextArea
            v-model="question.header"
            :inSelectedCard="isCardSelected"
            placeholder="Question"
          />
          <BaseSelect
            v-show="isCardSelected"
            :options="dashboardStore.questionTypes"
            v-model:selectedOption="question.type"
          />
        </header>
      </div>
      <div class="mr-6 mb-6">
        <QuestionChoice
          :questionId="questionId"
          v-if="question.type === 'choice'"
          :inSelectedCard="isCardSelected"
        />
        <QuestionCheck
          :questionId="questionId"
          v-else-if="question.type === 'check'"
          :inSelectedCard="isCardSelected"
        />
        <QuestionDrop
          :questionId="questionId"
          v-else-if="question.type === 'drop'"
          :inSelectedCard="isCardSelected"
        />
      </div>
    </template>
  </BaseCard>
</template>
