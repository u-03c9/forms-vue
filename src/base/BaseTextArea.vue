<script lang="ts">
import { ref } from "vue";

export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
const props = defineProps(["inSelectedCard", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const isFocused = ref(false);

const textArea = ref<InstanceType<typeof HTMLTextAreaElement> | null>(null);
const textAreaHeight = ref("auto");
function expandHeight() {
  textAreaHeight.value = textArea.value?.scrollHeight + "px";
}
function shrinkHeight() {
  textAreaHeight.value = "auto";
}

function handleInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLTextAreaElement).value);
  expandHeight();
}

async function focusOnTextArea() {
  setTimeout(() => {
    textArea.value?.focus();
  });
}
</script>

<template>
  <div class="flex-grow">
    <p v-show="!inSelectedCard" @click="focusOnTextArea">
      {{ modelValue ? modelValue : "Question" }}
    </p>
    <div v-show="inSelectedCard" class="flex flex-col relative">
      <textarea
        ref="textArea"
        v-bind:="$attrs"
        class="w-full h-auto outline-none overflow-hidden resize-none rounded-t-lg pt-3 px-4 leading-5 bg-gray-50 hover:bg-gray-100"
        :style="{ height: textAreaHeight }"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @input="handleInput"
        @keydown.backspace="shrinkHeight"
        @keydown.ctrl.z="shrinkHeight"
        @keydown.enter.prevent
      />
      <div class="w-full relative">
        <div class="w-full h-[1px] absolute top-0 left-0 z-0 bg-gray-400" />
        <div
          class="top-0 h-[2px] transition-[width] relative ease-in duration-300 mx-auto z-10"
          :class="isFocused ? 'w-full bg-primary-dark' : 'w-0 bg-transparent'"
        />
      </div>
    </div>
  </div>
</template>
