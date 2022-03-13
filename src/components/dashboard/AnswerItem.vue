<script setup lang="ts">
import BaseTextInput from "../../base/BaseTextInput.vue";
const props = defineProps(["inSelectedCard", "isHovered", "modelValue"]);
const emit = defineEmits(["update:modelValue", "deleteOption"]);
</script>

<template>
  <div
    class="w-full flex flex-row"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
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
