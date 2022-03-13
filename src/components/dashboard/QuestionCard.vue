<script setup lang="ts">
import { nanoid } from "nanoid";
import { computed } from "vue";

import { useDashboardStore } from "../../store/dashboard";
import BaseCard from "../../base/BaseCard.vue";
import BaseSelect from "../../base/BaseSelect.vue";
import BaseTextArea from "../../base/BaseTextArea.vue";

const dashboardStore = useDashboardStore();
const id = nanoid();
const isCardSelected = computed(() => dashboardStore.checkIsSelected(id));
</script>

<template>
  <BaseCard :id="id">
    <template v-slot>
      <div class="px-6 py-3">
        <header class="w-full flex flex-row gap-3">
          <BaseTextArea
            :inSelectedCard="isCardSelected"
            placeholder="Question"
          />
          <BaseSelect v-show="isCardSelected" />
        </header>
      </div>
    </template>
  </BaseCard>
</template>
