import React, { useEffect, useState } from 'react'
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import { useQuran } from '@/hooks/quran'
import { Transition, Tab } from '@headlessui/react'
import { usePage } from '@inertiajs/inertia-react';
import { BookmarkIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { chaptersWithReader } from '@/helpers/quran/chapters';
import { quranPersist } from '@/helpers/quran/global';


function arrayNumber (numEnd) {
    return Array.from({length: numEnd}).map((_a, index) => index + 1);
}

function TargetLink({target, isActive, className = '', label, as, ...props}) {
    const bullets = <div className="w-3 h-3 absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-primary-dark"></div>

    return(
        <div className={`w-full text-xs sm:text-sm md:text-base border-b border-secondary-light text-secondary-dark font-semibold capitalize ${className}`}>
            { 
                <Button
                    type={as}
                    to={target}
                    className="block w-full relative p-3.5 hover:bg-slate-100 rounded" 
                    {...props}
                >
                    { label }
                    { isActive && bullets }
                </Button>
            }
        </div>
    )
}

function AyatJumper({ verseCount }) {
    const [ ayat, setAyat ] = useState('');
    const [ ayatListArray ] = useState(arrayNumber(verseCount));
    const [ ayatList, setAyatList ] = useState(ayatListArray);
    const [ hash, setHash ] = useState(location.hash.substring(1));

    const handleSearch = (value) => {
        setAyat(value);
        if (value === '') return setAyatList(ayatListArray);

        const filteredAyatList = ayatListArray.filter(ayat => {
            const ayatStr = ayat.toString();
            return ayatStr.includes(value);
        });
        setAyatList(filteredAyatList);
    }

    const handleHash = () => setHash(location.hash.substring(1));

    useEffect(() => {
      window.addEventListener('hashchange', handleHash, true);
        
      return () => {
        window.removeEventListener('hashchange', handleHash, true);
      }
    }, []);

    return(
        <Input 
            type="select"
            options={ayatList.map(ayat => ({name: `ayat ${ayat}`, value: ayat}))}
            handleChange={(e) => location.hash = e.target.value}
        />
    )
    
    // return (
    //     <>
    //         <Input 
    //             type="number" 
    //             min={1} 
    //             value={ayat} 
    //             placeholder="ayat ke" 
    //             className="px-3 py-2 mb-1"
    //             handleChange={({target}) => handleSearch(target.value)} />
                
    //         <div className="text-center">
    //             {  ayatList.map(ayat => 
    //                 <TargetLink 
    //                     key={ayat} 
    //                     target={ayat} 
    //                     label={`Ayat ${ayat}`}
    //                     className='text-center'
    //                     isActive={hash == ayat}
    //                     onClick={() => location.hash = ayat} />
    //             )}
    //         </div>
    //     </>
    // )
}

function ChapterJumper({ chapterList }) {
    const { quran } = usePage().props;
    const [ search, setSearch ] = useState('');
    const [ chapters, setChapters ] = useState(chapterList);
    const URLparams = new URLSearchParams(location.search);

    const handleSearch = (value) => {
        setSearch(value);
        if (value === '') return setChapters(chapterList);
        
        const filteredChapter = chapterList.filter(chapter => chapter.name_simple.toLowerCase().includes(value));
        setChapters(filteredChapter);
    }

    const handleChange = (e) => {
        // const { pages } = chapterList.filter(chapter => chapter.id == e.target.value)[0];
        location.assign(route('quran.chapter', { chapter: e.target.value, mode: URLparams.get('mode') }))
    }

    return (
        <Input 
            type="select"
            options={chapters.map(chapter => ({name: chapter.name_simple, value: chapter.id}))}
            handleChange={handleChange}
        />
    )

    // return (
    //     <>
    //         <Input 
    //             value={search} 
    //             placeholder="Cari surah" 
    //             className="px-3 py-2 mb-1" 
    //             handleChange={({target}) => handleSearch(target.value)} />
            
    //         { chapters.map(chapter => 
    //             <div key={chapter.id} className="flex justify-between items-center">
    //                 {   <TargetLink 
    //                         as="a"
    //                         label={chapter.name_simple}
    //                         isActive={quran.chapter == chapter.id}
    //                         target={route('quran.chapter', { chapter: chapter.id, mode: URLparams.get('mode') })}
    //                         onClick={() => quranPersist.init(chapter.pages[0], chapter.id)} />
    //                 }
    //                 { chapter.lastAyatRead 
    //                     && 
    //                    <div className="py-3 m-0 border-b border-secondary-light">
    //                        <BookmarkIcon className="w-6 h-6 text-teal-600" />
    //                    </div> 
    //                 }
    //             </div>
    //         )}
    //     </>    
    // )
}


function JuzJumper() {
    const [ juz, setJuz ] = useState('');
    const [ juzCount ] = useState(arrayNumber(30));
    const [ juzList, setJuzList ] = useState(juzCount);
    const { quran } = usePage().props;

    const handleSearch = (value) => {
        setJuz(value);
        if (value === '') return setJuzList(juzCount);

        const filteredJuzList = juzCount.filter(juz => juz == value);
        setJuzList(filteredJuzList);
    }

    return (
        <>
            <Input type="number" 
                min={1} 
                value={juz} 
                placeholder="juz ke" 
                className="px-3 py-2 mb-1"
                handleChange={({target}) => handleSearch(target.value)} />

            <div className="text-center">
                {  juzList.map(juz => 
                    <TargetLink 
                        key={`juz-${juz}`} 
                        as="a"
                        label={`Juz ${juz}`} 
                        isActive={quran.juz == juz}
                        className='text-center'
                        target={route('quran.juz', { juz })} />
                )}
            </div>
        </>
    )
}


export default function Navigation({ show, onShow }) {
  const { quran } = usePage().props;
  const { data } = useQuran();
  const [ nav ] = useState({});

  useEffect(() => {
    console.log(nav);
    console.log('data load');
    if (data) {
        console.log('data loaded');
        console.log(nav);
        if (quran.chapter) nav.Ayat = <AyatJumper verseCount={getVerseCount(data)} />;
        nav.Surah = <ChapterJumper chapterList={collectionChapters(data)} />;
        nav.Juz = <JuzJumper />
    }

  }, [data]);

  const getVerseCount = (chapters) => {
    const { verses_count } = chapters.filter(chapter => chapter.id == quran.chapter)[0];
    return verses_count;
  }

  return (
    <div className="sticky top-0 left-0 right-0 h-auto z-40 text-xs sm:text-sm md:text-base">
        <div className="bg-ui border-r border-secondary-light inline-block overflow-y-auto w-full h-full">
            <Tab.Group>
                <Tab.List className="flex p-3 space-x-1 rounded-md">
                    {
                        Object.keys(nav).map(title => (
                            <Tab 
                                key={title} 
                                className={
                                    ({ selected }) => `w-full py-2.5 px-3 text-sm leading-5 ${ 
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
            <Button className="bg-white shadow shadow-gray-400 p-3 rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <ChevronUpIcon className="text-black -translate-y-0.5 h-8 md:h-7 w-8 md:w-7" />
            </Button>
        </div>
    </div>
  )

//   return (
//     <Transition className="fixed top-0 left-0 bottom-0 right-0 z-40 text-xs sm:text-sm md:text-base" show={show}>
//     {/* Background overlay */}
//       <Transition.Child
//         className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-20"
//         enter="transition-opacity ease-linear duration-300"
//         enterFrom="opacity-0"
//         enterTo="opacity-100"
//         leave="transition-opacity ease-linear duration-300"
//         leaveFrom="opacity-100"
//         leaveTo="opacity-0"
//         onClick={() => onShow(prev => !prev)}>
//       </Transition.Child>

//       {/* Sliding sidebar */}
//       <Transition.Child
//         className="fixed w-3/4 md:w-72 h-screen overflow-y-hidden"
//         enter="transition ease-in-out duration-300 transform"
//         enterFrom="-translate-x-full"
//         enterTo="translate-x-0"
//         leave="transition ease-in-out duration-300 transform"
//         leaveFrom="translate-x-0"
//         leaveTo="-translate-x-full"
  
//       >
//         <div className="bg-ui border-r border-secondary-light inline-block overflow-y-auto w-full h-full py-6">
//             <Tab.Group>
//                 <Tab.List className="flex p-1 px-3 space-x-1 rounded-md">
//                 {
//                     Object.keys(nav).map(title => (
//                         <Tab 
//                             key={title} 
//                             className={
//                                 ({ selected }) => `w-full py-2.5 px-3 text-sm leading-5 ${ 
//                                     selected ? 
//                                     'font-bold text-primary-dark bg-slate-100 rounded border border-secondary-light' 
//                                     : 
//                                     'text-secondary-normal'}`}>
//                             { title }
//                         </Tab>
//                     ))
//                 }
//                 </Tab.List>
//                 <Tab.Panels>
//                 {
//                     Object.values(nav).map((content, idx) => (
//                         <Tab.Panel key={idx} className="w-full">{ content }</Tab.Panel>
//                     ))
//                 }    
//                 </Tab.Panels>
//             </Tab.Group>
//         </div>
//       </Transition.Child>
//     </Transition>
//   )
}
