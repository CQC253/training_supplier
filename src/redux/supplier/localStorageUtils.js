export const setLocalStorageData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorageData = (key) => {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
};