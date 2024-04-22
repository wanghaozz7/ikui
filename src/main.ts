// import { createApp } from 'vue'
// import App from './App.vue'
// import './registerServiceWorker'
// import router from './router'
// import store from './store'

// createApp(App).use(store).use(router).mount('#app')
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//@ts-ignore
import library from "./components/library";
//@ts-ignore
import commonFunction from "./utils/commonFunction";

createApp(App)
  .use(store)
  .use(router)
  .use(library)
  .use(commonFunction)
  .mount("#app");
