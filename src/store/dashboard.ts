import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard", {
  state: () => {
    return {
      selectedCard: "",
    };
  },
  getters: {
    getSelectionCard(): string {
      return this.selectedCard;
    },
  },
  actions: {
    setSelectedCard(value: string) {
      this.selectedCard = value;
    },
  },
});
