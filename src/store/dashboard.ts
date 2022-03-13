import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard", {
  state: () => {
    return {
      selectedCard: "",
    };
  },
  getters: {},
  actions: {
    setSelectedCard(value: string) {
      this.selectedCard = value;
    },
    checkIsSelected(cardId: string): boolean {
      return this.selectedCard === cardId;
    },
  },
});
