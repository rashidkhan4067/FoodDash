export const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (!payload.exp) return false; // No expiration set?
        return payload.exp * 1000 < Date.now();
    } catch (e) {
        return true;
    }
};

export const decodeToken = (token) => {
    if (!token) return null;
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};
