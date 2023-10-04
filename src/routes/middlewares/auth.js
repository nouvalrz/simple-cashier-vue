export default async function auth ({ next, store }){
    if(!store.getters['sessionStore/getSession'].isLogin){
        return next({
            name: 'login'
        })
    }
    return next()
}
