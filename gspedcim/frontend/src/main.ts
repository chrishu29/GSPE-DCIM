import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "@mdi/font/css/materialdesignicons.min.css";
import "vue-multiselect/dist/vue-multiselect.css";
import "vue3-easy-data-table/dist/style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount("#app");
