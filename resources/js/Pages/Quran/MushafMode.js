import React, { useEffect, useState, useCallback, Fragment } from 'react';
import Loading from '@/Components/Loading';
import Verse from '@/Components/Verse';
import Button from '@/Components/Button';
import { Head, usePage } from '@inertiajs/inertia-react';
import { useQuran } from '@/hooks/quran';
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/outline';
import { addFontface, getGlobalFont } from '@/helpers/quran/fontface.helper';
import { quranStore } from '@/store/quranStore';


export default function MushafMode({ chapterData, startPage, startVerse }){
    console.log('inPageMushaf', startPage);
    const { quran } = usePage().props;
    const [ pageIndex, setPageIndex ] = useState(startPage);
    const { verses, pagination, error, loading } = useQuran({ page: pageIndex, mushafMode: true });

    const handleMovePage = (direction) => {
        if(direction == 'next' ) {
            quranStore.incPage();
            setPageIndex(pagination.next_page);
            handleFontface(pagination.next_page);
        }
        if(direction == 'prev') { 
            quranStore.decPage();
            setPageIndex(pagination.previous_page);
            handleFontface(pagination.previous_page);
        }
        scrollTo(0, 0);
    }    

    const handleFontface = useCallback((page) => {
        quran.fonts = addFontface({
            fonts: quran.fonts, 
            family: `quran-${page}`, 
            pageNumber: page
        });
    });

    const isChapterEnd = () => {
        return pagination.current_page === chapterData?.pages[1];
    }    

    const isChapterStart = () => {
        return pagination.current_page === chapterData?.pages[0];
    }   
    
    const placeBismillah = (idInSurah, idInGlobal) => {
        // jika surat al-fatiha / at-taubah, skip tanpa bismillah (img)
        if (idInGlobal === 1 || idInGlobal === 1236) return false;

        return idInSurah === 1;
    }

    useEffect(() => {
        quranStore.setLatestPage(startPage);
        quranStore.setLatestChapter(chapterData?.id);
        quran.fonts = getGlobalFont();
        handleFontface(startPage);

    }, []);

    console.log(verses);
    
      
    return (
        <>                
            <div className="w-full mt-10 md:mt-0 relative">
                { loading && <Loading /> }
                    <div data-page={pagination?.current_page || ''} className="md:h-auto">
                        <div className="flex flex-col items-center min-h-full">
                            {
                                Object.keys(verses || {}).map(line => 
                                    <div key={line} data-line={line} className="w-auto text-center mx-auto">
                                    {
                                        verses[line].map(verse => (
                                            <Fragment key={verse.id}>
                                                {
                                                    placeBismillah(verse.verse_number, verse.id) ?
                                                    <div className="w-full mb-4 sm:mb-6 mt-3 text-secondary-dark text-center">
                                                        <img className="inline-block w-52 md:w-60" src="/font/quran/bismillah.svg" />
                                                    </div>
                                                    : ''
                                                }
                                                <Verse
                                                    verseKey={verse.verse_number}
                                                    juz={verse.juz_number}
                                                    hizb={verse.hizb_number}
                                                    ruku={verse.ruku_number}
                                                    isSajdah={verse.sajdah_number}
                                                    manzil={verse.manzil_number}
                                                    words={verse.words}
                                                    classFont="mushaf-view fluid-text antialiased"
                                                    wordFont={`quran-${verse.page_number}`}
                                                />
                                            </Fragment>
                                        ))
                                    }
                                    </div>  
                                )
                            }
                        </div>
                    </div>
                    { error && <p>{error.error || error.message}</p> }
                        {
                            pagination?.next_page &&
                            <div className="fixed transform md:top-1/2 left-0 -translate-y-full md:-translate-y-1/2 inline-block h-auto w-auto ml-4 md:ml-5">
                                {
                                    isChapterEnd() ?
                                    <Button 
                                        type="a"
                                        to={route('quran.chapter', { chapter: chapterData.id + 1, mode: 'mushaf' })}
                                        onClick={() => quranStore.incPage()} 
                                        variant="outline-circle" 
                                        className="md:p-2" 
                                        processing={!pagination.next_page || loading}
                                    >
                                        <ArrowNarrowLeftIcon className="w-8 h-8 text-primary-normal transition-transform ease-out hover:-translate-x-1" />
                                    </Button>
                                    :
                                    <Button 
                                        variant="outline-circle" 
                                        className="md:p-2" 
                                        onClick={() => handleMovePage('next')} 
                                        processing={!pagination.next_page || loading}
                                    >
                                        <ArrowNarrowLeftIcon className="w-8 h-8 text-primary-normal transition-transform ease-out hover:-translate-x-1" />
                                    </Button>

                                }
                            </div>
                        }
                        {
                            pagination?.previous_page && 
                            <div className="fixed transform md:top-1/2 right-0 -translate-y-full md:-translate-y-1/2 inline-block w-auto mr-4 md:mr-5">
                                {
                                    isChapterStart() ?
                                    <Button 
                                        type="a"
                                        to={route('quran.chapter', { chapter: chapterData.id - 1, mode: 'mushaf' })}
                                        onClick={() => quranStore.decPage()} 
                                        variant="outline-circle" 
                                        className="md:p-2" 
                                        processing={!pagination.previous_page || loading}
                                        >
                                            <ArrowNarrowRightIcon className="w-8 h-8 text-primary-normal transition-transform ease-out hover:translate-x-1" />
                                    </Button>
                                    :
                                    <Button 
                                        variant="outline-circle" 
                                        className="md:p-2" 
                                        onClick={() => handleMovePage('prev')} 
                                        processing={!pagination.previous_page || loading}
                                    >
                                        <ArrowNarrowRightIcon className="w-8 h-8 text-primary-normal transition-transform ease-out hover:translate-x-1" />
                                    </Button>
                                }
                            </div>
                        }
            </div>
        </>    
    );
}
