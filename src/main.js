import { createApp } from 'vue'
import App from './App.vue'
import router from "@/routes";
import { VueFire, VueFireFirestoreOptionsAPI } from 'vuefire'
import {firebaseApp} from "@/services/firebase";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import "bootstrap";
import {store} from '@/store';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';


const app = createApp(App)

app.use(store)
app.use(router)
app.use(ToastPlugin)

app.use(VueFire, {
    firebaseApp,
    modules:[
        VueFireFirestoreOptionsAPI()
    ]
})

app.mount('#app')


