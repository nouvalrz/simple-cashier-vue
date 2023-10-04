export default async function ({next, store}) {
    const { tokenCheckDone } = store.state.sessionStore;
    if (!tokenCheckDone) {
        await store.dispatch('sessionStore/checkToken');
    }
    next();
}
