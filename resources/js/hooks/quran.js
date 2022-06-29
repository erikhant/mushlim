import useSWR from 'swr'
import API from '@/api/api.client';
import { searchLike } from '@/utils/search';

const MODE = {
    MUSHAF: 'mushaf',
    SCROLL: 'scroll'
}

export const useQuran = ({ page, chapter, chapterInfo, chapterDetail, juz, mushafMode = false, list } = {}) => {

    const options = {
        revalidateOnFocus : false
    }
    
    const fetcher = (url) => axios.get(url).then(response => response.data).catch(error => {
        console.error(error);
        if (error.response) throw error.response.data;
        if (error.request) throw Error('No response was received');
    });

    const createPagination = (pagination, mode = MODE.SCROLL) => {
        const next = page + 1;
        const prev = page - 1;

        const minPage = 1;
        const maxPage = mode == MODE.SCROLL ? pagination.total_pages : 604;
        
        pagination.next_page = next <= maxPage ? next : null;
        pagination.previous_page = prev >= minPage ? prev : null;
        pagination.current_page = page;
        return pagination;
    }

    const sortLinesVerse = (verses) => {
        const line = {}; 
        verses.forEach(verse => {
            verse.words.forEach(word => {
                let cond = true;
                let lineIndex = 1;
                while (cond) {
                    if (word.line_number === lineIndex) {
                        const verseWord = {...verse}

                        if (line[`line${lineIndex}`]) {
                            const added = line[`line${lineIndex}`].map(lines => {
                                if(lines.verse_number === verseWord.verse_number) {
                                    if(lines.words) lines.words.push(word);
                                    else lines.words = [word];
                                    return true;
                                }
                            }).includes(true);

                            if (!added) {
                                verseWord.words = [];
                                verseWord.words.push(word);
                                line[`line${lineIndex}`].push(verseWord);
                            }
                            cond = false;
    
                        } else{
                            line[`line${lineIndex}`] = [];
                            verseWord.words = [];
                            verseWord.words.push(word);
                            line[`line${lineIndex}`].push(verseWord);
                            cond = false;
                        }
                    }
                    lineIndex++;
                }
            });
        });
        return line;
    }

    const getChapterVerses = (chapterId) => {
        const { data:verses, error } = useSWR(API.quran.v2.verseByChapter(chapterId, page), 
            (url) => fetcher(url).then(result => {
                const pagination = createPagination(result.pagination);
                const verses = result.verses.map(verse => ({...verse, page_scroll: page}));
                return { pagination, verses }
            }), 
        options); 
        
        return {
            verses: verses?.verses,
            pagination: verses?.pagination,
            error,
            loading: !verses && !error,
        }    
    }

    const getJuzVerses = (juzId) => {
        const { data, error } = useSWR(API.quran.v2.verseByJuz(juzId, page), (url) => fetcher(url).then(result => {
            const pagination = createPagination(result.pagination);
            const verses = result.verses.map(verse => ({...verse, page_scroll: page}));
            return { pagination, verses }
        }), 
        options);
        
        return { 
            verses: data?.verses, 
            pagination: data?.pagination, 
            error, 
            loading: !data && !error 
        }
    }

    const getVersesByPage = (page) => {
        const { data, error } = useSWR(API.quran.v2.verseByPage(page), (url) => fetcher(url).then(result => {
            const pagination = createPagination(result.pagination, MODE.MUSHAF);
            const verses = sortLinesVerse(result.verses);
            return { pagination, verses }

        }), options);
        return {
            verses: data?.verses, 
            pagination: data?.pagination,
            error, 
            loading: !data && !error,
        }
    }

    const getChapterDetail = (chapterId) => {
        const { data, error } = useSWR(API.quran.v2.chapter(chapterId), fetcher, options);
        return { 
            data: data?.chapter, 
            error, 
            loading: !data && !error 
        }
    }

    const getChapterInfo = (chapterId) => {
        const { data, error } = useSWR(API.quran.v2.chapterInfo(chapterId), fetcher, options);
        return { 
            data : data?.chapter_info, 
            error, 
            loading: !data && !error 
        }
    }

    const getChapterList = () => {
        const { data, error } = useSWR(API.quran.v2.listChapter, fetcher, options);
        return { 
            data: data?.chapters, 
            error, 
            loading: !data && !error,
            searchSurah: (term, collection = data) => searchLike({term, objectSearch: collection || [], keyTerm: 'name_simple'})
        }
    }

    const getJuzList = () => {
        const { data, error } = useSWR(API.quran.v2.allJuz, fetcher, options);
        return { 
            data: data?.juzs, 
            error, 
            loading: !data && !error,
        }
    }


    // Validation type of params
    if (chapter && !page) throw ReferenceError('the parameter page is required');
    if (juz && !page) throw ReferenceError('the parameter page is required');
    if (mushafMode && !page) throw ReferenceError('the parameter page is required');
    if (page && !_.isInteger(page)) throw TypeError('the parameter page must be an integer');
    if (mushafMode && !_.isBoolean(mushafMode)) throw TypeError('mushaf mode paramaters must be bool type');


    if (chapter) {
        return getChapterVerses(chapter);
    }
    if (juz) {
        return getJuzVerses(juz);
    }
    if (mushafMode) {
        return getVersesByPage(page);
    }
    if(chapterDetail){
        return getChapterDetail(chapterDetail);
    }
    if(chapterInfo){
        return getChapterInfo(chapterInfo);
    }
    if(list === 'juz'){
        return getJuzList();
    }
    if (list === 'chapter') {
        return getChapterList();
    }
    
    return {}

}

