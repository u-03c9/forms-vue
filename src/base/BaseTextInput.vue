<script lang="ts">
import { ref } from "vue";

export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
defineProps(["inSelectedCard", "showBar"]);
const isFocused = ref(false);
</script>

<template>
  <div class="w-full">
    <input
      v-bind:="$attrs"
      class="w-full outline-none"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <div class="w-full relative">
      <div
        class="w-full h-[1px] absolute top-0 left-0 z-0"
        :class="
          inSelectedCard
            ? showBar
              ? 'bg-gray-300'
              : 'bg-transparent'
            : 'bg-transparent'
        "
      />
      <div
        class="top-0 h-[2px] transition-[width] relative ease-in duration-300 mx-auto z-10"
        :class="isFocused ? 'w-full bg-primary-dark' : 'w-0 bg-transparent'"
      />
    </div>
  </div>
</template>
