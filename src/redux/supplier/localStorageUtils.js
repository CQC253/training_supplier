export const setLocalStorageData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorageData = (key, params) => {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
};