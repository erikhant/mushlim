const queryParams = 'language=id&words=true&translations=33&translation_fields=resource_name,language_name&audio=7&fields=text_uthmani,text_uthmani_simple,code_v1,chapter_id&word_fields=verse_key,verse_id,location,text_uthmani,text_uthmani_simple,code_v1';
export const PERPAGE_REQEST = 10;

const api = {
    quran:{
        v1:{
            all: 'https://api.quran.sutanlab.id/surah',
            surah: (number) => `https://api.quran.sutanlab.id/surah/${number}`,
            ayat: (surah, ayat) => `https://api.quran.sutanlab.id/surah/${surah}/${ayat}`,
        },
        v2: {
            chapter: (number) => `https://api.quran.com/api/v4/chapters/${number}?language=id`,
            listChapter: `https://api.quran.com/api/v4/chapters/?language=id`,
            chapterInfo: (number) => `https://api.quran.com/api/v4/chapters/${number}/info?language=id`,
            verseByChapter: (number, page) => `https://api.quran.com/api/v4/verses/by_chapter/${number}?${queryParams}&page=${page}&per_page=${PERPAGE_REQEST}`,
            verseByJuz: (number, page) => `https://api.quran.com/api/v4/verses/by_juz/${number}?${queryParams}&page=${page}&per_page=${PERPAGE_REQEST}`,
            verseByPage: (page) => `https://api.quran.com/api/v4/verses/by_page/${page}?${queryParams}`,
            footnote: (number) => `https://api.qurancdn.com/api/qdc/foot_notes/${number}`,
            audio: (url) => `https://verses.quran.com/${url}`,
            allJuz: `https://api.quran.com/api/v4/juzs`
        }
    }
}

export default api;