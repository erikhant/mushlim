export const isStorageSupported = () => {
    if (typeof localStorage == null) {
        console.error('No storage in the browser you are using. Some features such as bookmarks will not work properly');
        return false;
    };
    return true;
}

export const getStorage = (key) => {
    const storage = localStorage.getItem(key);
    if(storage) return JSON.parse(storage);
    return null;
}