<script lang="ts">
import { computed, ref, StyleValue } from "vue";

export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
defineProps(["isFocused", "inSelectedCard"]);

// --- style while card is selected ---
const textArea = ref<InstanceType<typeof HTMLTextAreaElement> | null>(null);
const textAreaHeight = ref("auto");
function expandHeight() {
  textAreaHeight.value = textArea.value?.scrollHeight + "px";
}
function shrinkHeight() {
  textAreaHeight.value = "auto";
}

// --- style while card is NOT selected ---
</script>

<template>
  <div class="flex-grow flex flex-col relative">
    <textarea
      ref="textArea"
      v-bind:="$attrs"
      class="w-full h-auto outline-none overflow-hidden resize-none rounded-t-lg"
      :class="
        inSelectedCard
          ? 'px-4 pt-3 leading-5 bg-gray-50 hover:bg-gray-100'
          : 'placeholder:text-gray-800 bg-transparent cursor-pointer'
      "
      :style="{ height: textAreaHeight }"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @input="expandHeight"
      @keydown.backspace="shrinkHeight"
      @keydown.ctrl.z="shrinkHeight"
      @keydown.enter.prevent
    />
    <div class="w-full relative">
      <div
        class="w-full h-[1px] absolute top-0 left-0 z-0"
        :class="inSelectedCard ? 'bg-gray-400' : 'bg-transparent'"
      />
      <div
        class="top-0 h-[2px] transition-[width] relative ease-in duration-300 mx-auto z-10"
        :class="isFocused ? 'w-full bg-primary-dark' : 'w-0 bg-transparent'"
      />
    </div>
  </div>
</template>
