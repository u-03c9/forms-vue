<script setup lang="ts">
import { ref } from "vue";
import BaseTextInput from "../../base/BaseTextInput.vue";
const props = defineProps(["inSelectedCard", "isHovered", "modelValue"]);
const emit = defineEmits(["update:modelValue", "deleteOption"]);
const isDragging = ref(false);
</script>

<template>
  <div
    class="w-full flex flex-row answer-item"
    :class="isDragging ? 'dragging' : ''"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    draggable="true"
    @dragstart="isDragging = true"
    @dragend="isDragging = false"
  >
    <div class="h-5 w-6">
      <span
        v-show="inSelectedCard && isHovered"
        class="material-icons text-gray-400 h-5 w-5 cursor-move"
      >
        drag_indicator
      </span>
    </div>
    <span class="material-icons text-gray-400 mr-3 h-5 w-5">
      radio_button_unchecked
    </span>
    <BaseTextInput
      class="w-full pb-2 text-sm"
      :inSelectedCard="inSelectedCard"
      :showBar="isHovered"
      :value="modelValue"
      @input.trim="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span
      v-show="inSelectedCard"
      @click="$emit('deleteOption')"
      class="material-icons text-gray-400 h-5 w-5 cursor-pointer"
    >
      close
    </span>
  </div>
</template>
