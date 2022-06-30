export const quranStore = {
    init(){
        if (!document.quran) {
            document.quran = {};
        } else{
            const global = Object.keys(document.quran);
            if (global.length > 0){
                global.map(key => this[key] = document.quran[key]);
            }
        }
    },
    set(property, value, persist = false){
        this[property] = value;
        if (persist) document.quran[property] = value;
    },
    get(property) {
        return this[property];
    },
}

quranStore.init();