import { isStorageSupported, getStorage } from '@/utils/localStorage';
import React, { createContext, useReducer } from 'react';

export const ACTION = {
    ADD_BOOKMARK: 'add-mark',
    REMOVE_BOOKMARK: 'delete-mark',
    PLAY_AUDIO: 'play-audio',
    ENDED_AUDIO: 'stop-audio'
}

export const STORAGE_KEY = 'bookmark';

export const QuranContext = createContext();

function reducer(data, action) {
    switch (action.type) {
        case ACTION.ADD_BOOKMARK:
            return {
               ...data,
               bookmarks: newBookmark(action.payload)
            };
        case ACTION.REMOVE_BOOKMARK:
            return {
                ...data,
                bookmarks: removeBookmark(action.payload)
            };
        case ACTION.PLAY_AUDIO:
            return {
                ...data,
                audioPlaying: action.payload.url,
                currentAudio: action.payload.current,
            };
        case ACTION.ENDED_AUDIO:
            return {
                ...data,
                audioPlaying: '',
                currentAudio: null,
            };
        default:
            return data;
    }

}


function removeBookmark(verse) {
    if (!isStorageSupported()) return;
    let bookmarks = getStorage(STORAGE_KEY);
    if (bookmarks && bookmarks.length) {
        bookmarks = bookmarks.filter(mark => mark.verseKey !== verse.verseKey);
        bookmarks.length ? localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks)) : localStorage.removeItem(STORAGE_KEY);
        return bookmarks;
    }
    return [];
}

function newBookmark(verse) {
    if (!isStorageSupported()) return;
    let bookmarks = getStorage(STORAGE_KEY);
    if (bookmarks) {
        // check duplicate bookmark item
        bookmarks = bookmarks.filter(mark => mark.chapterId !== verse.chapterId);
        bookmarks.push(verse);
    }else{
        bookmarks = [verse];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    return bookmarks;
}



export default function QuranContextProvider({children}) {
  const bookmarks = getStorage(STORAGE_KEY) || [];
  const audioPlaying = '';
  const [quran, dispatch] = useReducer(reducer, { bookmarks, audioPlaying });

  return (
    <QuranContext.Provider value={{ quran, dispatch }}>
    { children }
    </QuranContext.Provider>
  )
}


