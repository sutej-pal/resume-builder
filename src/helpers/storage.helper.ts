function getUserTokenFromLS() {
    const lsUserData = localStorage.getItem('rb.user');
    if (lsUserData) {
        const user = JSON.parse(lsUserData);
        return user?.token ?? null;
    } else {
        return null;
    }
}

export {
    getUserTokenFromLS,
};
