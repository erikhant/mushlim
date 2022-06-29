import React, { useCallback, useEffect, useLayoutEffect, useState, useRef, useContext } from 'react';
import ReactDOM from 'react-dom';
import Translation from '@/Components/Translation';
import Loading from '@/Components/Loading';
import Verse from '@/Components/Verse';
import Card from '@/Components/Card';
import Button from '@/Components/Button';
import API from '@/api/api.client';
import { useQuran } from '@/hooks/quran';
import { usePage } from '@inertiajs/inertia-react';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/solid';
import { BookmarkIcon, PlayIcon, PauseIcon } from '@heroicons/react/outline';
import QuranContextProvider, { ACTION, QuranContext } from '@/store/QuranContext';
import { getGlobalFont, addFontface } from '@/helpers/quran/fontface';
import { getYAxisByElement } from '@/helpers/scrollRegion';
import { pagePositionByVerse } from '@/helpers/quran/pages.helper';
import { quranStore } from '@/helpers/quran/global';

export default function ScrollMode({ bismillah, startPage, startVerse }){
    const { quran } = usePage().props;
    const [ pageIndex, setPageIndex ] = useState(startPage);
    const { verses, pagination, error, loading } = useQuran({ chapter: quran.chapter, juz: quran.juz, page: pageIndex }); 
    const [ allVerses, setVerses ] = useState([]);
    const [ hash, setHash ] = useState('');
    const [ snapAtOnce, setSnapAtOnce] = useState(true);
    const observe = useRef();

    const handleObserver = useCallback((node) => {
        if (loading) return;
        if (!observe.current) {
            observe.current = new IntersectionObserver(entries => {
                // console.log(entries);
                entries.forEach(entry => {
                    // cek apakah terlihat di viewport
                    // dan cek apa typenya
                    if (entry.isIntersecting && entry.target.dataset.ref === 'last') {
                        // ambil data page
                        const dataPage = parseInt(entry.target.dataset.page);
                        // cek apakah sudah ada page dibawah/setelahnya
                        if (pagination.total_pages === dataPage) return;
                        if (document.querySelector(`[data-page="${dataPage + 1}"]`)) return;
                        setPageIndex(dataPage + 1);
                    } 
                    else if (entry.isIntersecting && entry.target.dataset.ref === 'first') {
                        // ambil data page
                        const dataPage = parseInt(entry.target.dataset.page);
                        // cek apakah sudah ada page diatas/sebelumnya
                        if (!pagination.previous_page) return;
                        if (document.querySelector(`[data-page="${dataPage - 1}"]`)) return;
                        setPageIndex(dataPage - 1);
                    }
                });
            });
        }
        if (node) observe.current.observe(node);
    }, [loading]);


    const handleFootnote = (data, self) => {
        const footnotes = data.map(note => <Footnote text={note.text} key={note.id} />);
        ReactDOM.render(footnotes, self.current.nextElementSibling);
    }

    const handleHashChange = () => {
        const verse = location.hash.substring(1);
        if (document.getElementById(verse) == null) {
            const page = pagePositionByVerse(verse);
            setPageIndex(page);
            setHash(verse);
        }
    }

    const handleFontface = useCallback((page) => {
        quran.fonts = addFontface({
            fonts: quran.fonts, 
            family: `quran-${page}`, 
            pageNumber: page
        });
    });


    useEffect(() => {
        quran.fonts = getGlobalFont();
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        }
   }, []);

    useEffect(() => {
        if (verses){
            // console.log(pagination);
            setVerses(prev => {
                const verseObject = { page: pagination.current_page, verses }
                const sortedVerses = _.sortBy([verseObject, ...prev], (verse) => verse.page);

                return sortedVerses.map((versesPage) => {
                    const verses = versesPage.verses.map((verse, index) => {
                        let dataRef = null;
                        if (index === 0 && verse.verse_number !== 1){   // The first verse of each page
                            dataRef = 'first';
                        }
                        if (index === versesPage.verses.length - 1) {   // The last page and verse
                            dataRef = 'last';   
                        } 
                        // TODO: Ambil value page number berdasarkan ayat pertama dari juz
                        //       Simpan di global quran dgn key Juz
                        //       Cek kondisi dulu apakah sedang berada di juz
                        // TODO: Buat logika untuk dataRef agar tidak duplikat
                        handleFontface(verse.page_number);
                        return {...verse, dataRef }
                    });
                    return { ...versesPage, verses }
                });
            });
        }

    }, [verses]);

    useLayoutEffect(() => {
    
    // Snap scroll position at first & once
      if (allVerses.length && snapAtOnce) {
        const distance = getYAxisByElement(document.getElementById(startVerse));
        setTimeout(() => {
            scrollTo(0, distance);
            // Always reset request verse when this event triggered
            quranStore.set('reqVerse', null);

        }, 300);
        setSnapAtOnce(!snapAtOnce);
      }

    // Snap scroll position when hash changed
      if (hash !== '') {
        const distance = getYAxisByElement(document.getElementById(hash));
        scrollTo(0, distance);
        setHash('');
      }
    
    }, [allVerses]);

    // Reset footnote count every state changed
    useLayoutEffect(() => {
        quran.footnoteCount = 0;
    });
    
    return (
        <>
            <QuranContextProvider>
                    {/* Main Content */}
                    <div className="mt-14 md:mt-0">    
                    {
                        bismillah && 
                        <div className="w-full mb-4 sm:mb-6 text-secondary-dark text-center">
                            <img className="inline-block w-52 md:w-72" src="/font/quran/bismillah.svg" />
                        </div>
                    }
                    { allVerses.length ? loading && <Loading /> : '' }
                    {
                        allVerses.map((versesPage) => {
                            const { page, verses } = versesPage;
                            return verses.map((verse) => {
                                const { dataRef } = verse;
                                return (
                                    <div key={verse.id} ref={ dataRef ? handleObserver : null } data-page={page} data-ref={dataRef || 'v'}>
                                        <Card id={verse.verse_number}>
                                            <Card.Body>
                                                <div className="text-right">
                                                    <Verse
                                                        className="flex flex-row-reverse flex-wrap space-x-0.5"
                                                        verseKey={verse.verse_number}
                                                        juz={verse.juz_number}
                                                        hizb={verse.hizb_number}
                                                        ruku={verse.ruku_number}
                                                        isSajdah={verse.sajdah_number}
                                                        manzil={verse.manzil_number}
                                                        words={verse.words}
                                                        classFont="scroll-view fluid-text antialiased"
                                                        wordFont={`quran-${verse.page_number}`}
                                                    />
                                                </div>
                                                <div className="container mt-7 md:px-4" id={`translation-${verse.verse_number}`}>
                                                    <Translation 
                                                        text={verse.translations[0].text} 
                                                        verseKey={verse.verse_key} 
                                                        footnote={handleFootnote}
                                                    />
                                                    <div className="foot-note sm:text-sm"></div>
                                                </div>
                                            </Card.Body>
                                            <Card.Footer>
                                                <PlayAudio src={verse.audio.url} verseKey={verse.verse_key} />
                                                <Bookmark data={verse} />
                                            </Card.Footer>
                                        </Card>
                                    </div>
                                )    
                            });

                        })
                    }
                    { loading && <Loading /> }
                    { error && 
                        <div className="h-16 w-full flex justify-center items-center"><p className="text-secondary-dark">Oops! Sepertinya terjadi kesalahan dari sistem.</p></div> 
                    }   
                    </div>
            </QuranContextProvider>
        </>
    );
}



function Footnote({text}) {
    return (
        <div className="pt-2 sm:pt-4 mt-3 sm:mt-5 border-t border-t-secondary-light">
            <blockquote>{text}</blockquote>
        </div>
    )
}

function Bookmark({ data }) {
    const { quran, dispatch } = useContext(QuranContext);
    const { page_number:inPageMushaf, page_scroll:inPageScroll, verse_key:verseKey, verse_number:lastAyatRead, chapter_id:chapterId } = data;

    const actions = quran.bookmarks.some(item => item.lastAyatRead === lastAyatRead) ? ACTION.REMOVE_BOOKMARK : ACTION.ADD_BOOKMARK;

    const handleMark = () => {
        const parent = document.getElementById(lastAyatRead);
        const currentPos = getYAxisByElement(parent);
        dispatch({ 
            type: actions, 
            payload: { inPageMushaf, inPageScroll, verseKey, lastAyatRead, chapterId, scrollY: currentPos } 
        });
    }

    return (
        <Button
            className="p-1" 
            onClick={handleMark}
        >
        {
            quran.bookmarks.some(item => item.verseKey === verseKey) ? 
            <BookmarkIconSolid className="text-teal-600 w-7 h-6 sm:w-8 sm:h-7 md:w-9 md:h-8" />
            :    
            <BookmarkIcon className="text-secondary-normal hover:text-teal-600 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
        }
        </Button>
    )
}

function PlayAudio({src, verseKey}) {
    const { quran, dispatch } = useContext(QuranContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPause, setIsPause] = useState(false);
    const audio = useRef();

    const handleAudio = () => {
        if(!isPlaying && !isPause) {
            dispatch({
                type: ACTION.PLAY_AUDIO, 
                payload: { 
                    url: API.quran.v2.audio(src),
                    current: verseKey
                }
            });
            setIsPlaying(true);
        } 
        else if(!isPause){
            audio.current.pause();
            setIsPause(true);
            setIsPlaying(false);
        }else{
            audio.current.play();   
            setIsPause(false);
            setIsPlaying(true);
        }
    }

    const handleAudioEnd = () => {
        dispatch({ type: ACTION.ENDED_AUDIO })
        setIsPlaying(false);
        setIsPause(false);
    }

    useEffect(() => {
        if (quran.currentAudio == audio.current?.dataset.verse) {
            audio.current.play();   
        }
        return () => {
            if(isPlaying) setIsPlaying(false);
        }
    }, [quran.currentAudio])
    

    return (
    <>
        <audio 
            ref={audio} 
            src={quran.currentAudio == audio.current?.dataset.verse ? quran.audioPlaying : ''} 
            type="audio/mp3" 
            data-verse={verseKey} 
            onEnded={handleAudioEnd}
        />

        <Button 
            className="p-1" 
            onClick={handleAudio}
        > 
        {
            !isPlaying ?
            <PlayIcon className="text-secondary-normal rounded-full hover:text-teal-600 hover:bg-teal-50 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            :
            <PauseIcon className="text-teal-600 rounded-full w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
        }    
        </Button>
    </>
    )
}
