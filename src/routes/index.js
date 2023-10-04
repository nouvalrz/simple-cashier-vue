import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import CashierView from "@/views/CashierView.vue";
import HistoryView from "@/views/HistoryView.vue";
import LoginView from "@/views/LoginView.vue";
import checkToken from "@/routes/middlewares/checkToken";
import auth from "@/routes/middlewares/auth";
import middlewarePipeline from "@/routes/middlewarePipeline";
import guest from "@/routes/middlewares/guest";
import {store} from "@/store";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                middleware: [
                    checkToken,
                    auth
                ]
            },
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
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: {
                middleware: [
                    guest
                ]
            },
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware

    const context = {
        to,
        from,
        next,
        store
    }


    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })

})

export default router
