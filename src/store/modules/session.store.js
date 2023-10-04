import {checkToken} from '@/services/api/auth.api';
export const sessionStore = {
    namespaced: true,
    state: {
        session: {
            isLogin: false,
            isAdmin: false,
            tokenCheckDone: false
        }
    },
    mutations:{
        setIsLogin(state, status) {
            state.session.isLogin = status;
        },
        setTokenCheckDone(state, done) {
            state.session.tokenCheckDone  = done;
        }
    },
    actions:{
        async checkToken({commit}){
                try{
                    const token = localStorage.getItem("token")
                    if(token){
                        const response = await checkToken(token)
                        const isValidToken = response.data.isValid;
                        commit('setIsLogin', isValidToken);
                    }
                }catch (e) {
                    console.error('Error checking token:', e.message);
                }
        },
    },
    getters: {
        getSession(state) {
            return state.session
        }
    }
}
