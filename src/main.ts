import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "./firebase-utils";
import router from "./routes";
import { createPinia } from "pinia";
import { useMainStore } from "./store";

const pinia = createPinia();

const vm = createApp(App);
vm.use(pinia);
await useMainStore().bindUser();

vm.use(router);
vm.mount("#app");
