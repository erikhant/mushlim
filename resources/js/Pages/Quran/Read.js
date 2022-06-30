import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Button from '@/Components/Button';
import ScrollMode from './ScrollMode';
import MushafMode from './MushafMode';
import Navigate from './Navigate';
import { BookOpenIcon, CollectionIcon } from '@heroicons/react/outline';
import { usePage, Head } from '@inertiajs/inertia-react';
import { getChapterInStorage } from '@/helpers/quran/chapters.helper';
import { useQuran } from '@/hooks/quran';
import { quranStore } from '@/store/quranStore';
import { pagePositionByVerse } from '@/helpers/quran/pages.helper';

export default function Read() {
  const { quran } = usePage().props;
  const { data:detail, error:errDetail } = useQuran({ chapterDetail: quran.chapter });
  const { data:info, error:errInfo } = useQuran({ chapterInfo: quran.chapter });
  const { data:juzs, error:errJuzs } = useQuran({ list: 'juz' });
  const { inPageScroll, inPageMushaf, lastAyatRead } = getChapterInStorage(quran.chapter);

  const reqVerse = quranStore.get('reqVerse');
  const latestPage = quranStore.get('latest page');
  // Only effect in scroll mode
  const startPage = pagePositionByVerse(reqVerse || 1);

  const handleRoute = (mode) => {
    if (quran.chapter){
        return route('quran.chapter', { chapter: quran.chapter, mode });
    } 
    return route('quran.juz', { juz: quran.juz, mode });
  }
  
  const handleTitle = () => {
    if (quran.chapter) {
        return `Quran: ${detail?.name_simple || ''}`;
    }
    return `Quran: juz ${quran.juz}`;
  }

  return (
    <AppLayout className="bg-body">
        <Head>
            <title>{handleTitle()}</title>
        </Head>

        <Navigate navigate={{...info, ...detail, juzs }} />

        <div className="fixed right-0 md:right-5 bottom-0 md:bottom-5 -translate-x-6 -translate-y-6 flex flex-col space-y-5 z-20">
            {
                quran.mode !== '0' ?
                // Go to mushaf mode 
                <Button
                    type="a"
                    to={handleRoute('0')}
                    onClick={() => quranStore.set('latest page', detail.pages[0])}
                    variant="solid-circle"
                    className="shadow-lg shadow-slate-300"
                >
                    <BookOpenIcon className="text-white -translate-y-0.5 h-8 md:h-7 w-8 md:w-7" />
                </Button>
                :
                // Go to scroll mode 
                <Button
                    type="a"
                    to={handleRoute('1')}
                    variant="solid-circle"
                    className="shadow-lg shadow-slate-300"
                >
                    <CollectionIcon className="text-white -translate-y-0.5 h-8 md:h-7 w-8 md:w-7" />
                </Button>

            }
        </div>

        {
            quran.chapter ? 
                detail ?
                    quran.mode !== '0' ?
                    <ScrollMode
                        bismillah={detail.bismillah_pre}
                        startPage={startPage}
                        startVerse={reqVerse}
                    />
                    :
                    <MushafMode
                        chapterData={detail}
                        startPage={inPageMushaf || latestPage ? latestPage : detail.pages[0]}
                        startVerse={lastAyatRead}
                    />
                : ''
            :
            quran.mode !== '0' ?
                    <ScrollMode
                        startPage={inPageScroll || 1}
                        startVerse={lastAyatRead}
                    />
                    :
                    <MushafMode
                        // TODO: Ambil value page number berdasarkan ayat
                        //       ide 1 : simpan page number dalam global quran dari loop verses scrollmode
                        startPage={1}
                        startVerse={lastAyatRead}
                    />    
        }
    </AppLayout>
  )

}


