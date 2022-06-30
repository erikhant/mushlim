import { STORAGE_KEY } from '@/store/QuranContext';
import { isStorageSupported, getStorage } from '@/utils/localStorage';

export const getChapterInStorage = (chapterId) => {
    let bookmarks = getStorage(STORAGE_KEY);
    if (bookmarks?.length){
      bookmarks = bookmarks.filter(chapter => chapter.chapterId == chapterId)[0];
    }
    return bookmarks || {}; 
}


export const chaptersWithReader = (chapters) => {
    if (!isStorageSupported()) return;

    let bookmarks = getStorage(STORAGE_KEY);
    let subIdx = 0;        
    bookmarks = bookmarks && _.sortBy(bookmarks, (mark) => mark.chapterId);

    return chapters.map(chapter => {
      let lastAyatRead = null;
      if (bookmarks && chapter.id === bookmarks[subIdx]?.chapterId){
        lastAyatRead = bookmarks[subIdx].lastAyatRead;
        subIdx++;
      }
      return { ...chapter, lastAyatRead }
    });    
}
