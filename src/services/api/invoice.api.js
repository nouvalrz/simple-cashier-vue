import apiClient from "@/services/api/apiClient";

const END_POINT = '/invoice'
const token = localStorage.getItem("token")

const createInvoice = (payload) => apiClient.post(END_POINT + '/create', payload, {
    headers: {
        'Authorization' : token
    }
})


export   {
    createInvoice
}
