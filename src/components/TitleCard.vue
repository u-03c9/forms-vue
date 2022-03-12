<script setup lang="ts">
import BaseCard from "../base/BaseCard.vue";

defineProps(["title", "description"]);
defineEmits(["update:title", "update:description"]);
</script>

<template>
  <BaseCard hasTopBar>
    <template v-slot>
      <div class="w-full h-full pt-6 pb-6 px-5">
        <input
          class="w-full outline-none border-b-2 pb-2 border-slate-300 text-3xl focus:border-[#673ab7]"
          :value="title"
          @input="$emit('update:title', ($event.target as HTMLInputElement).value)"
        />
        <input
          placeholder="Form description"
          class="w-full outline-none border-b-2 pb-1 border-slate-300 text-md mt-3 focus:border-[#673ab7]"
          :value="description"
          @input="$emit('update:description', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </template>
  </BaseCard>
</template>
