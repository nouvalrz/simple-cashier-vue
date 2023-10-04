export default function admin ({ next, store }){
    if(!store.getters['sessionStore/getSession'].isAdmin){
        return next({
            name: 'home'
        })
    }
    return next()
}
