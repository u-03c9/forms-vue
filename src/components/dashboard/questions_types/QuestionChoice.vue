<script setup lang="ts">
import { computed, reactive } from "vue";

import { useDashboardStore } from "../../../store/dashboard";

import BaseCard from "../../base/BaseCard.vue";
import BaseSelect from "../../base/BaseSelect.vue";
import BaseTextArea from "../../base/BaseTextArea.vue";
import BaseTextInput from "../../../base/BaseTextInput.vue";
import AnswerItem from "../AnswerItem.vue";

const props = defineProps(["inSelectedCard", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const dashboardStore = useDashboardStore();
const state = reactive({
  answers: ["Option 1", "Option 2", "Option 3"],
});

function addOption() {
  state.answers.push(`Option ${state.answers.length + 1}`);
}
</script>

<template>
  <div class="w-full flex flex-col gap-4 pt-4">
    <AnswerItem
      v-for="(answer, idx) in state.answers"
      :inSelectedCard="inSelectedCard"
      v-model="state.answers[idx]"
      @deleteOption="state.answers.splice(idx, 1)"
    />
    <div v-show="inSelectedCard" class="w-full flex flex-row text-sm">
      <span class="material-icons text-gray-400 mr-3 h-5 w-5">
        radio_button_unchecked
      </span>
      <span
        class="text-gray-500 cursor-pointer mt-[0.125rem] hover:underline hover:underline-offset-[8px] hover:decoration-gray-300"
        @click="addOption"
      >
        Add option
      </span>
    </div>
  </div>
</template>
