export default async function guest ({ next, store }){
    if(store.getters['sessionStore/getSession'].isLogin){
        return next({
            name: 'home'
        })
    }
    return next()
}
