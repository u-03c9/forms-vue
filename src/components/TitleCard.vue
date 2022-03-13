<script setup lang="ts">
import { nanoid } from "nanoid";
import { computed } from "vue";

import BaseCard from "../base/BaseCard.vue";
import { useDashboardStore } from "../store/dashboard";

const dashboardStore = useDashboardStore();
const id = nanoid();
const isCardSelected = computed(() => dashboardStore.checkIsSelected(id));

defineProps(["title", "description"]);
defineEmits(["update:title", "update:description"]);
</script>

<template>
  <BaseCard :id="id" hasTopBar>
    <template v-slot>
      <div class="w-full h-full pt-8 pb-6 px-6">
        <input
          class="w-full outline-none pb-2 text-3xl focus:border-[#673ab7]"
          :class="isCardSelected ? 'border-gray-300 border-b-[1px]' : ''"
          :value="title"
          @input="$emit('update:title', ($event.target as HTMLInputElement).value)"
        />
        <input
          placeholder="Form description"
          class="w-full outline-none pb-1 text-md mt-3 focus:border-[#673ab7]"
          :class="isCardSelected ? 'border-gray-300 border-b-[1px]' : ''"
          :value="description"
          @input="$emit('update:description', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </template>
  </BaseCard>
</template>
