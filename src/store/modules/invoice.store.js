import {createInvoice} from "@/services/api/invoice.api";

export const invoiceStore = {
    namespaced: true,
    state:{
            invoice_number: null,
            isValid: false,
            billSummary:{
                total_item: 0,
                total_price: 0,
                pay: null,
                change: 0,
            },
            items: [{
                item_name: null,
                item_price: null,
                item_quantity: null,
                item_subtotal: null
            }],
    },
    mutations:{
        addItem(state){
            state.items.push({
                item_name: null,
                item_price: null,
                item_quantity: null,
                item_subtotal: null
            })
        },
        removeItem(state, index){
            state.items.splice(index, 1)
        },
        calculateSubtotalPrice(state) {
            state.items.map((item)=>{
                item.item_subtotal = item.item_price * item.item_quantity
            })
        },
        calculateTotalPrice(state){
            state.billSummary.total_price = state.items.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.item_subtotal
            },0);
        },
        calculateTotalItem(state){
            state.billSummary.total_item = state.items.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.item_quantity
            },0);
        },
        calculateChange(state) {
            state.billSummary.change = state.billSummary.pay - state.billSummary.total_price
        },
        setIsValid(state, payload){
            state.isValid = payload
        },
        setInvoiceNumber(state, payload){
            state.invoice_number = payload
        }
    },
    getters:{
        getItems(state){
            return state.items
        },
        getItemsLength(state){
            return state.items.length
        },
        getBillSummary(state){
            return state.billSummary
        },
        getPay(state){
            return state.billSummary.pay
        },
        getIsValid(state){
            return state.isValid
        },
        getInvoiceNumber(state){
            return state.invoice_number
        }
    },
    actions:{
        addItem({commit, state}){
            commit('addItem', state)
        },
        removeItem({commit}, index) {
            commit('removeItem', index)
        },
        calculateSubtotalPrice({commit}){
            commit('calculateSubtotalPrice')
        },
        calculateTotalPrice({commit}) {
            commit('calculateTotalPrice')
        },
        calculateTotalItem({commit}){
            commit('calculateTotalItem')
        },
        calculateChange({commit}){
            commit('calculateChange')
        },
        validateInvoice({state, commit}){
            const thereAreNull = state.items.some((element) => {
                return Object.keys(element).some(
                    function (key) {
                        return element[key]===null;
                    }
                );
            })

            const validPay = state.billSummary.pay - state.billSummary.total_price >= 0
            commit('setIsValid', (!thereAreNull && validPay))
        },
        async createInvoice({state, commit}){
                const requestBody = {
                    total_item: state.billSummary.total_item,
                    total_price: state.billSummary.total_price,
                    pay: state.billSummary.pay,
                    change: state.billSummary.change,
                    items: state.items,
                }
                const response = await createInvoice(requestBody)
                commit('setInvoiceNumber', response.data.invoice_number)
        }
    }
}
