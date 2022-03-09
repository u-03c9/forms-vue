import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "./firebase-utils";
import router from "./routes";

createApp(App).use(router).mount("#app");
