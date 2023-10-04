import {createStore} from "vuex";
import {sessionStore} from "@/store/modules/session.store";
import {invoiceStore} from "@/store/modules/invoice.store";

export const store = createStore({
    modules:{
        sessionStore: sessionStore,
        invoiceStore: invoiceStore
    }
})
