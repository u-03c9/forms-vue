<script setup lang="ts">
import { computed, reactive } from "vue";

import { useDashboardStore } from "../../../store/dashboard";

import BaseCard from "../../base/BaseCard.vue";
import BaseSelect from "../../base/BaseSelect.vue";
import BaseTextArea from "../../base/BaseTextArea.vue";

const props = defineProps(["isCardSelected"]);
const dashboardStore = useDashboardStore();
</script>

<template>
  <div class="w-full">
    <h1> Dropdown </h1>
  </div>
</template>
