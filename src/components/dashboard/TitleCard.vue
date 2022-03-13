<script setup lang="ts">
import { nanoid } from "nanoid";
import { computed } from "vue";

import BaseCard from "../../base/BaseCard.vue";
import { useDashboardStore } from "../../store/dashboard";
import BaseTextInput from "../../base/BaseTextInput.vue";

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
        <BaseTextInput
          class="w-full pb-2 text-3xl"
          :inSelectedCard="isCardSelected"
          :value="title"
          @input="$emit('update:title', ($event.target as HTMLInputElement).value)"
        />
        <BaseTextInput
          placeholder="Form description"
          class="w-full pb-1 text-md mt-3"
          :inSelectedCard="isCardSelected"
          :value="description"
          @input="$emit('update:description', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </template>
  </BaseCard>
</template>
