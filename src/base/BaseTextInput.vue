<script setup lang="ts">
defineProps(["isFocused", "inSelectedCard"]);
</script>

<template>
  <input
    v-bind:="$attrs"
    class="w-full outline-none"
    @focus="isFocused = true"
    @blur="isFocused = false"
  />
  <div class="w-full relative">
    <div
      class="w-full h-[1px] absolute top-0 left-0 z-0"
      :class="inSelectedCard ? 'bg-gray-300' : 'bg-transparent'"
    />
    <div
      class="top-0 h-[2px] transition-[width] relative ease-in duration-300 mx-auto z-10"
      :class="isFocused ? 'w-full bg-primary-dark' : 'w-0 bg-transparent'"
    />
  </div>
</template>
