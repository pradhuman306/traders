export const set = (key, data) => localStorage.setItem(key, data);

export const get = (key) => localStorage.getItem(key);

export const remove = (key) => localStorage.removeItem(key);

export const clear = () => localStorage.clear();