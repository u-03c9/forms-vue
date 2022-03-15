<script setup lang="ts">
import { computed } from "vue";

import BaseCard from "../../base/BaseCard.vue";
import { useDashboardStore } from "../../store/dashboard";
import BaseTextInput from "../../base/BaseTextInput.vue";

const props = defineProps(["cardId", "title", "description"]);
defineEmits(["update:title", "update:description"]);

const dashboardStore = useDashboardStore();
const isCardSelected = computed(() =>
  dashboardStore.checkIsSelected(props.cardId)
);

</script>

<template>
  <BaseCard :cardId="cardId" hasTopBar>
    <template v-slot>
      <div class="w-full h-full pt-8 pb-6 px-6">
        <BaseTextInput
          class="w-full pb-2 text-3xl"
          :inSelectedCard="isCardSelected"
          :value="title"
          :showBar="true"
          @input="$emit('update:title', ($event.target as HTMLInputElement).value)"
        />
        <BaseTextInput
          placeholder="Form description"
          class="w-full pb-1 text-md mt-3"
          :inSelectedCard="isCardSelected"
          :value="description"
          :showBar="true"
          @input="$emit('update:description', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </template>
  </BaseCard>
</template>
