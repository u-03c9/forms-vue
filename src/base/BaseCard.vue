<script setup lang="ts">
import { computed } from "vue";

interface Props {
  hasTopBar?: boolean;
  topBorderColor?: string;
  topBorderHeight?: string;
  leftBorderWidth?: string;

  bgColor?: string;
  focusColor?: string;
  isFocused?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  hasTopBar: false,
  topBorderColor: "bg-[#673ab7]",
  topBorderHeight: "h-3",
  leftBorderWidth: "w-2",

  bgColor: "bg-white",
  focusColor: "bg-[#4285f4]",
  isFocused: false,
});

const leftBorderColor = computed(() =>
  props.isFocused ? props.focusColor : props.bgColor
);
</script>

<template>
  <div
    :class="[bgColor]"
    class="my-3 w-full mx-auto max-w-3xl relative shadow-md overflow-hidden h-full rounded-lg"
    @focusin="isFocused = true"
    @focusout="isFocused = false"
  >
    <!-- top bar -->
    <div
      v-if="hasTopBar"
      :class="[topBorderColor, topBorderHeight]"
      class="absolute top-0 left-0 w-full z-20 flex flex-row"
    />
    <!-- left bar -->
    <div
      class="absolute top-0 left-0 h-full z-10"
      :class="[leftBorderColor, leftBorderWidth]"
    />
    <div class="relative top-0 left-0 w-full h-full">
      <slot></slot>
    </div>
  </div>
</template>
