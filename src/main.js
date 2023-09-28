import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/routes";
import { VueFire, VueFireFirestoreOptionsAPI } from 'vuefire'
import {firebaseApp} from "@/services/firebase";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App)

app.use(router)

app.use(VueFire, {
    firebaseApp,
    modules:[
        VueFireFirestoreOptionsAPI()
    ]
})

app.mount('#app')


