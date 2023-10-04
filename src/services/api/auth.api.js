import apiClient from "@/services/api/apiClient";

const END_POINT = '/auth'

const login = (email, password) => apiClient.post(END_POINT + '/login', {email, password})
const checkToken = (token) => apiClient.get(END_POINT + '/check-token', {headers:{'Authorization': `${token}`}})

export {
    login,
    checkToken
}
