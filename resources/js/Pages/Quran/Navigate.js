import React, { useState, useEffect, useRef } from 'react';
import { parse as HTMLParser } from 'node-html-parser';
import { usePage } from '@inertiajs/inertia-react';
import { Tab } from '@headlessui/react';
import { quranStore } from '@/store/quranStore';
import { useQuran } from '@/hooks/quran';
import { ChevronUpIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/solid';
import Input from '@/Components/Input';
import Button from '@/Components/Button';

function arrayListNumber (total) {
    return Array.from({length: total}).map((_a, index) => index + 1);
}

//  TODO : 
//  UBAH DENGAN useReducer <Jumper>

function Jumper({ chapters }) {
    const { quran } = usePage().props;
    const [verseCount, setVerseCount] = useState(0);
    const [onSelectVerse, setOnSelectVerse] = useState();
    const [juz, setJuz] = useState(quran.juz || 1);    
    const [verse, setVerse] = useState(location.hash.substring(1) || quranStore.get('reqVerse') || 1); 
    const chapter = useRef(quran.chapter || 1);

    const chapterOptions = () => {
        return chapters.map(chapter => ({
            name: `${chapter.id} - ${chapter.name_simple}`, 
            value: chapter.id, 
        }))
    }

    const verseOptions = () => {
        return arrayListNumber(verseCount).map(val => ({name: val, value: val}));
    }

    const juzOptions = () => {
        return arrayListNumber(30).map(val => ({name: val, value: val}));
    }

    const handleChangeChapter = (value) => {
        chapter.current = value;
        const { verses_count } = chapters.filter(chapter => chapter.id == value)[0];
        setVerseCount(verses_count);
        setEventOnSelectedVerse();
    }

    const handleChangeVerses = (value) => {
        return onSelectVerse ? onSelectVerse(value) : setVerse(value);
    }

    const handlePageRoute = (state) => {
        const value = parseInt(quran.chapter || quran.juz);   
        const nameRoute = quran.chapter ? 'quran.chapter' : 'quran.juz';
        const options = { mode: quran.mode };

        if (state === 'prev') {
            quran.chapter
                ? options.chapter = value - 1
                : options.juz = value - 1;
        } 
        else if (state === 'next'){
            quran.chapter
                ? options.chapter = value + 1
                : options.juz = value + 1;
        }
        
        return route(nameRoute, {...options});
    }

    const onNavigateChanges = (state) => {
        quranStore.set('reqVerse', verse);
        
        if (quran.mode === '0' && quran.chapter) {
            const current = chapters.filter(chapt => {
                if (state === 'prev') {
                    return chapt.id === parseInt(quran.chapter) - 1
                } 
                else if (state === 'next') {
                    return chapt.id === parseInt(quran.chapter) + 1
                } 
                else{
                    return chapt.id == chapter.current
                }
            })[0];
            quranStore.set('latest page', current.pages[0]);
        }
    }

    const setEventOnSelectedVerse = () => {
        if (chapter.current == quran.chapter) {
            setOnSelectVerse(() => {
                return (value) => {
                    location.hash = value;
                    setVerse(value);
                }
            });
        } else{
            setOnSelectVerse(false);
        }
    }

    useEffect(() => {
        handleChangeChapter(chapter.current);

    }, []);


  return (
    <div className="grid grid-cols-6 md:grid-cols-4 gap-x-2 gap-y-2 text-xs sm:text-sm md:text-base">
        <div className="col-span-3 md:col-span-2">
            <p className="text-neutral-900 font-semibold">Surah</p>
            <Input 
                type="select"
                value={chapter.current}
                options={chapterOptions()}
                handleChange={({target}) => handleChangeChapter(target.value)}
            />
        </div>
        <div className="col-span-3 sm:col-span-2 md:col-span-1">
            <p className="text-neutral-900 font-semibold">Ayat</p>
            <div className="flex space-x-1 items-center justify-between">
                <Input 
                    type="select"
                    value={verse}
                    className="w-full"
                    options={verseOptions()}
                    handleChange={({target}) => handleChangeVerses(target.value)}
                />
                {
                    chapter.current !== quran.chapter ?
                    <Button 
                        type="a"
                        variant="solid"
                        className="px-3 sm:px-5"
                        to={route('quran.chapter', { chapter: chapter.current, mode: quran.mode })}
                        onClick={onNavigateChanges}
                        >Go
                    </Button>
                    :
                    <Button variant="solid" className="px-3 sm:px-5">Go</Button>
                    
                }
            </div>
        </div>
        <div className="col-span-6 sm:col-span-4 md:col-span-1">
            <p className="text-neutral-900 font-semibold">Juz</p>
            <div className="flex space-x-1 items-center justify-between">
                <Input 
                    type="select"
                    value={juz}
                    className="w-full"
                    options={juzOptions()}
                    handleChange={(e) => setJuz(e.target.value)}
                />
                <Button 
                    type="a"
                    variant="solid"
                    className="px-3 sm:px-5"
                    to={route('quran.juz', { juz, mode: quran.mode })}
                    >Go
                </Button>
            </div>
        </div>
        <div className="col-span-6 py-2 flex space-x-2 justify-between items-center">
            {
                quran.chapter === '114' || quran.juz === '30' 
                ? ''
                :
                <Button 
                    type="a"
                    variant="outline"
                    onClick={() => onNavigateChanges('next')}
                    to={handlePageRoute('next')}
                    >
                    <span className="mr-1.5">
                        <ChevronDoubleLeftIcon className="text-neutral-400 h-4 w-4 md:h-6 md:w-6" />
                    </span>
                   { quran.chapter ? 'Next surah' : 'Next juz' } 
                </Button>
            }
            {
                quran.chapter === '1' || quran.juz === '1' 
                ? ''
                :
                <Button 
                    type="a"
                    variant="outline"
                    onClick={() => onNavigateChanges('prev')}
                    to={handlePageRoute('prev')}
                    >
                    { quran.chapter ? 'Prev surah' : 'Prev juz' } 
                    <span className="ml-1.5">
                        <ChevronDoubleRightIcon className="text-neutral-400 h-4 w-4 md:h-6 md:w-6" />
                    </span>
                </Button>
            }
        </div>
    </div>
  )
}


function JuzInfo({ data:{ juzs } }) {
    const { quran } = usePage().props;
    const { verse_mapping, verses_count } = juzs.filter(juz => juz.id == quran.juz)[0];
    const chaptersInJuz = quranStore.get('chapters')
                            .filter(chapter => verse_mapping.hasOwnProperty(chapter.id))
                            .map(chapter => ({ ...chapter, verseInJuz: verse_mapping[chapter.id] }));
                            
    return (
        <div className="relative max-h-[50vh] sm:max-h-[75vh] overflow-y-auto px-3 sm:px-6 md:px-14 py-3 md:py-4 text-xs sm:text-sm md:text-base leading-relaxed">
            <div className="grid grid-cols-6 gap-3 text-secondary-dark">
                <p className="col-span-2 p-1 text-center"><span>Juz</span> ke- {quran.juz}</p>
                <p className="col-span-2 p-1 text-center border-r border-l border-neutral-300"><span>Berisi</span> {chaptersInJuz.length} surah</p>
                <p className="col-span-2 p-1 text-center"><span>Total</span> {verses_count} ayat</p>
                {
                    chaptersInJuz.map(chapter => (
                        <div key={chapter.id} className="col-span-2 mt-2 bg-secondary-light rounded flex flex-col space-y-1 justify-center items-center p-3">
                            <p className="font-bold text-lg">{chapter.name_arabic}</p>
                            <h2>{chapter.name_simple}</h2>
                            <p className="font-light text-secondary-normal">{chapter.verseInJuz}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


function ChapterInfo({data}) { 
    const text = HTMLParser(data.text);

    return (
        <div className="relative max-h-[50vh] sm:max-h-[75vh] overflow-y-auto px-3 sm:px-6 md:px-14 py-3 md:py-4 text-xs sm:text-sm md:text-base leading-relaxed">
            <div className="hidden md:float-right sm:block">
                <span className="sm:text-4xl lg:text-6xl text-primary-dark font-bold">{data.name_arabic}</span>
            </div> 
            <div className="flex justify-start items-start mb-4">
                <p className="flex flex-col space-y-1.5 text-stone-700 font-semibold">
                    <span>Surah</span>
                    <span>Jumlah</span>
                    <span>Golongan</span>
                    <span>Sumber</span>
                </p>
                <h1 className="flex flex-col space-y-1.5 text-stone-700 break">
                    <span>&nbsp;: {data.name_simple}</span>
                    <span>&nbsp;: {data.verses_count} ayat</span>
                    <span>&nbsp;: {data.revelation_place}</span>
                    <span>&nbsp;: {data.source}</span>
                </h1>
            </div>   
            <div className=" flex flex-col space-y-3 md:pr-16 lg:pr-24">
                {text.childNodes.map(({textContent}, idx) => 
                    (<p key={idx} className="text-stone-600">{textContent}</p>)
                )}
            </div>
        </div>
    )
}


export default function Navigate({ navigate }) {
    const { quran } = usePage().props;
    const { data:chapterList } = useQuran({ list: 'chapter' });
    const [nav, setNav] = useState({
        navigate: '',
        info: '',
        setting: ''
    });

    const [toggle, setToggle] = useState(true);
    const self = useRef();
    const toggleBtn = useRef();

    const setScrollPaddingTop = (self) => {
        if (self.current) {
            setTimeout(() => {
                document.documentElement.style.scrollPaddingTop = `${self.current.offsetHeight + 5}px`;
            }, 150);
        }
    }

    const togglePosition = () => {
        setToggle(prev => !prev);
        const offsetHeight = self.current.offsetHeight;
        const adjuster = screen.availWidth < 768 ? 0.55 : 0.6;

        if (toggle) {
            self.current.classList.remove('top-0');
            self.current.style.top = offsetHeight * adjuster * -1 + 'px';
            toggleBtn.current.classList.add('rotate-180');
        } else{
            self.current.style.top = '';
            self.current.classList.add('top-0');
            toggleBtn.current.classList.remove('rotate-180');
        }
    }

    const hideToggle = () => {
        if (window.scrollY > 100) {
            toggleBtn.current.classList.remove('opacity-0');
        } else{
            toggleBtn.current.classList.add('opacity-0');
        }
    }

    useEffect(() => {
      if (quranStore.get('chapters')) {
        setNav(prev => ({
            ...prev,
            navigate: <Jumper chapters={quranStore.get('chapters')} />
        }));
      }

      window.addEventListener('scroll', hideToggle);
      return () => { 
          window.removeEventListener('scroll', hideToggle);
      }
    }, []);
    
    useEffect(() => {
        if (chapterList) {
            if (!quranStore.get('chapters')) {
                quranStore.set('chapters', chapterList, true);
                setNav(prev => ({
                    ...prev,
                    navigate: <Jumper chapters={chapterList} />
                }));
            }
        }

        if (navigate) {
            setNav(prev => ({
                ...prev,
                info: quran.chapter ? <ChapterInfo data={navigate} /> : <JuzInfo data={navigate} />
            }));
        }
        
    }, [chapterList, navigate]);
    

  return (
    <div ref={self} className="sticky top-10 md:top-0 left-0 right-0 h-auto z-30 mb-6 origin-top text-xs sm:text-sm md:text-base bg-ui border border-secondary-light rounded transition-all duration-200 ease-out">
        <div ref={() => setScrollPaddingTop(self)} className="inline-block overflow-y-auto w-full h-full pb-3 md:pb-1.5">
            <Tab.Group>
                <Tab.List className="flex p-3 space-x-1 rounded-md">
                    {
                        Object.keys(nav).map(title => (
                            <Tab 
                                key={title} 
                                className={
                                    ({ selected }) => `w-full py-2.5 px-3 text-sm leading-5 capitalize ${ 
                                        selected ? 
                                        'font-bold text-primary-dark bg-slate-100 rounded border border-secondary-light' 
                                        : 
                                        'text-secondary-normal'}`}>{ title }
                            </Tab>
                        ))
                    }
                </Tab.List>
                <Tab.Panels className="px-3 pb-3">
                    {
                        Object.values(nav).map((content, idx) => (
                            <Tab.Panel key={idx} className="w-full">{ content }</Tab.Panel>
                        ))
                    }   
                </Tab.Panels>
            </Tab.Group>
        </div>
        <div className="w-auto relative">
            <Button
                self={toggleBtn}
                onClick={togglePosition}
                className="bg-white border-2 border-secondary-light p-2 rounded-full absolute top-0 left-1/2 opacity-0 -translate-x-1/2 -translate-y-1/2 transition-all">
                <ChevronUpIcon className="text-neutral-600 -translate-y-0.5 h-8 md:h-7 w-8 md:w-7" />
            </Button>
        </div>
    </div>
  )
}
