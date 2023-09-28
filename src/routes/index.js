import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import CashierView from "@/views/CashierView.vue";
import HistoryView from "@/views/HistoryView.vue";

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: HomeView,
            redirect: {path: '/cashier'},
            children: [
                {
                    path: '/cashier',
                    name: 'Cashier',
                    component: CashierView
                },
                {
                    path: '/history',
                    name: 'History',
                    component: HistoryView
                }
            ]
        }
    ]
})
