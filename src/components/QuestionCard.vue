<script setup lang="ts">
import BaseCard from "../base/BaseCard.vue";
import BaseSelect from "../base/BaseSelect.vue";
</script>

<template>
  <BaseCard>
    <template v-slot>
      <div class="px-6 py-3">
        <header class="w-full flex flex-row gap-3">
          <input
            type="text"
            placeholder="Question"
            class="bg-gray-100 outline-none border-b-[1px] border-gray-400 py-0 px-4 flex-grow rounded-t-lg focus:border-[#673ab7]"
          />
          <BaseSelect />
        </header>
      </div>
    </template>
  </BaseCard>
</template>
