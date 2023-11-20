function getUserTokenFromLS() {
    const lsUserToken = localStorage.getItem('rb.userToken') ?? null;
    if (lsUserToken) {
        const token = JSON.parse(lsUserToken);
        return token ?? null;
    } else {
        return null;
    }
}

export {
    getUserTokenFromLS,
};
