<script setup lang="ts">
import { computed, StyleValue } from "vue";
import { useDashboardStore } from "../store/dashboard";

const dashboardStore = useDashboardStore();

interface Props {
  cardId: string;
  hasTopBar?: boolean;
  topBarColor?: string;
  topBarHeight?: string;
  focusBarWidth?: string;
  focusColor?: string;
  bgColor?: string;
}
const props = withDefaults(defineProps<Props>(), {
  hasTopBar: false,
  topBarColor: "#673ab7",
  topBarHeight: "0.625rem",
  focusBarWidth: "0.325rem",
  focusColor: "#4285f4",
  bgColor: "white",
});

// --- styles ---

const topBarStyle = computed((): StyleValue => {
  return {
    height: props.topBarHeight,
    backgroundColor: props.topBarColor,
  };
});

const focusBarStyle = computed((): StyleValue => {
  return {
    top: props.hasTopBar ? props.topBarHeight : 0,
    height: props.hasTopBar ? `calc(100% - ${props.topBarHeight})` : "100%",
    width: props.focusBarWidth,
    borderTopLeftRadius: props.hasTopBar ? "0" : "0.5rem",
    borderBottomLeftRadius: "0.5rem",
  };
});
</script>

<template>
  <div
    :id="cardId"
    :style="{ backgroundColor: props.bgColor }"
    class="my-3 w-full mx-auto max-w-3xl flex relative shadow-md rounded-lg"
    @click.prevent.stop="dashboardStore.setSelectedCard(cardId)"
  >
    <!-- top bar -->
    <div
      v-if="hasTopBar"
      :style="topBarStyle"
      class="absolute top-0 left-0 w-full flex flex-row rounded-t-lg"
    />
    <!-- left bar -->
    <div
      class="absolute rounded-l-lg"
      :style="[
        focusBarStyle,
        {
          backgroundColor: dashboardStore.checkIsSelected(props.cardId)
            ? props.focusColor
            : props.bgColor,
        },
      ]"
    />
    <!-- slot -->
    <div class="relative top-0 left-0 w-full h-full">
      <slot></slot>
    </div>
  </div>
</template>
