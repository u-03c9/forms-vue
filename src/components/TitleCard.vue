<script setup lang="ts">
import BaseCard from "../base/BaseCard.vue";
const props = defineProps(["title", "description"]);
const emit = defineEmits(["update:title", "update:description"]);
</script>

<template>
  <BaseCard hasTopBar>
    <template v-slot>
      <div class="w-full h-full pt-6 pb-6 px-5">
        <input
          class="w-full outline-none border-b-2 pb-2 border-slate-300 text-3xl focus:border-[#673ab7]"
          v-model="title"
        />
        <input
          placeholder="Form description"
          class="w-full outline-none border-b-2 pb-1 border-slate-300 text-md mt-3 focus:border-[#673ab7]"
          v-model="description"
        />
      </div>
    </template>
  </BaseCard>
</template>
