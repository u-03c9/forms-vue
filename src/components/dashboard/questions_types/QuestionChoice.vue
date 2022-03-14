<script setup lang="ts">
import { computed } from "vue";

import { useDashboardStore } from "../../../store/dashboard";

import AnswerItem from "../AnswerItem.vue";

const props = defineProps(["inSelectedCard", "modelValue", "questionId"]);
const emit = defineEmits(["update:modelValue"]);
const dashboardStore = useDashboardStore();

const answers = computed(() => dashboardStore.getAllAnswers(props.questionId));

const addOption = () =>
  dashboardStore.addAnswer(
    props.questionId,
    `Option ${answers.value.length + 1}`
  );

if (answers.value.length === 0) addOption();

const deleteOption = (id: string) =>
  dashboardStore.deleteAnswer(props.questionId, id);

function startDrag(event: DragEvent, item: { id: string; value: string }) {
  event.dataTransfer!.dropEffect = "move";
  event.dataTransfer!.effectAllowed = "move";
  event.dataTransfer!.setData("itemId", item.id);
}

function onDrop(event: DragEvent) {
  const itemId = event.dataTransfer!.getData("itemId");
  const parent = (event.target as HTMLElement).closest(".answers-container");
  const closestItemIndex = findClosestItemIndex(parent!, event.clientY);

  dashboardStore.dropAnswerBefore(props.questionId, closestItemIndex, itemId);
}

function findClosestItemIndex(parent: Element, clientY: number) {
  const calcDist = (el: Element) => {
    const { top, height } = el.getBoundingClientRect();
    return clientY - top - height / 2;
  };

  const closest = [...parent.children].reduce(
    (prevEl, currentEl, currentIndex) => {
      const offset = calcDist(currentEl);
      if (offset < 0 && prevEl.offset < offset) {
        return { offset, index: currentIndex };
      }
      return prevEl;
    },
    { offset: Number.NEGATIVE_INFINITY, index: -1 }
  );

  return closest.index;
}
</script>

<template>
  <div class="w-full ml-1">
    <div
      class="w-full flex flex-col gap-y-3 pt-4 answers-container"
      @dragenter.prevent=""
      @dragover.prevent=""
      @drop.prevent="onDrop"
    >
      <AnswerItem
        v-for="answer in answers"
        v-model="answer.value"
        :id="answer.id"
        :key="answer.id"
        :inSelectedCard="inSelectedCard"
        @deleteOption="deleteOption(answer.id)"
        @dragstart="startDrag($event, answer)"
      />
    </div>
    <div v-show="inSelectedCard" class="w-full flex flex-row text-sm mt-3">
      <span class="material-icons text-gray-400 ml-[1.35rem] mr-3 h-5 w-5">
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
