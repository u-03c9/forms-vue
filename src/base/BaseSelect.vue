<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps<{
  selectedOption: string;
  options: { id: string; name: string; icon: string }[];
}>();
const emit = defineEmits(["update:selectedOption"]);

const state = reactive({
  isMenuOpen: false,
});

function getSelectedOption() {
  return (
    props.options.find(({ id }) => id === props.selectedOption) ??
    props.options[0]
  );
}

function handleFocusOut() {
  setTimeout(() => {
    state.isMenuOpen = false;
  }, 100);
}
</script>

<template>
  <div class="w-56 relative overflow-visible" @focusout="handleFocusOut">
    <button
      @click="state.isMenuOpen = !state.isMenuOpen"
      class="flex flex-row justify-between border-gray-200 rounded-md border-[1px] px-2 pt-3 pb-2 w-full text-gray-600"
    >
      <div class="flex flex-row gap-3">
        {{}}
        <span class="material-icons">
          {{ getSelectedOption().icon }}
        </span>
        <span class="text-sm pt-[0.125rem]">
          {{ getSelectedOption().name }}
        </span>
      </div>
      <div>
        <span class="material-icons"> arrow_drop_down </span>
      </div>
    </button>
    <div
      class="absolute left-0 top-14 w-full bg-white shadow-lg text-gray-600 z-50"
      v-show="state.isMenuOpen"
    >
      <div
        v-for="{ id, name, icon } in props.options"
        @click="$emit('update:selectedOption', id)"
        class="flex flex-row gap-3 p-3 hover:bg-gray-100 cursor-pointer"
      >
        <span class="material-icons"> {{ icon }} </span>
        <span class="text-sm self-center"> {{ name }} </span>
      </div>
    </div>
  </div>
</template>
