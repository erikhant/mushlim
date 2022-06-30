import { quranStore } from '@/store/quranStore';
import React from 'react';
import Bross from './Bross';
import Button from './Button';
import ProgressBar from './ProgressBar';

export default function Chapter({
    id,
    arabic,
    transliteration,
    revelation,
    numVerses,
    latestReadTime,
    latesReadAyat
}) {

  const calcProgress = () => {
    if (!latesReadAyat) return null;
    return Math.floor((latesReadAyat / numVerses) * 100);
  }

  const hasProgress = calcProgress();

  return (
    <div className="w-full max-w-3xl flex text-xs sm:text-sm md:text-base mx-auto md:mx-0 p-3">
        <div className="inline-block">
            <Bross>
                <p className="ar-1 text-3xl md:text-4xl text-primary-dark" style={{lineHeight: 'initial'}}>
                    {arabic}
                </p>
            </Bross>
        </div>
        <div className="w-full pl-5 pr-0 sm:px-5 py-1 md:flex md:flex-col justify-center">
            <h2 className="text-sm sm:text-base font-semibold text-secondary-dark">Surah {transliteration}</h2>
            <div className="flex w-full justify-between items-center">
                <p className="text-secondary-normal capitalize">{revelation}</p>
                {/* Medium - Large Screen */}
                {
                    <div className="hidden sm:inline-block mb-1.5">
                        <>
                        {
                            hasProgress === 100 && <span className="text-teal-600 font-semibold mx-3">Selesai</span>
                        }
                        {
                            hasProgress && hasProgress < 100 ?
                            <Button type="a" to={route('quran.chapter', {chapter: id})} onClick={() => quranStore.set('reqVerse', latesReadAyat)} variant="outline">
                                Lanjutkan membaca
                            </Button>
                            :
                            <Button type="a" to={route('quran.chapter', {chapter: id})} variant="outline">
                                {  hasProgress === 100 ? 'Baca lagi' : 'Mulai Baca'}
                            </Button>
                        }
                        </>
                    </div>
                }
            </div>
            <div className="flex w-full justify-between items-end">
                <p className="text-secondary-normal">{numVerses} ayat</p>
                {
                    hasProgress &&
                    <p className="text-primary-dark">
                        <span className="">{latesReadAyat} / </span>
                        <span className="font-semibold">{numVerses}</span>
                    </p>
                }
            </div>
            <div className="w-auto">
                {
                    hasProgress ?
                    <>
                        <div className="my-3">
                            <ProgressBar percentage={hasProgress} />
                        </div> 
                        <div className="sm:hidden flex flex-wrap items-center">
                            {
                                hasProgress == 100 && <span className="text-teal-600 font-semibold mr-3 mb-1.5">Selesai</span>
                            }
                            <Button type="a" to={route('quran.chapter', {chapter: id})} onClick={() => quranStore.set('reqVerse', latesReadAyat)} variant="outline">
                                {/* Mobile Screen (if has read) */}
                                Lanjutkan
                            </Button>
                        </div>
                        <div className="hidden sm:inline-block">
                            <p className="text-secondary-normal">{latestReadTime}</p>
                        </div>
                    </>
                    :
                    <div className="sm:hidden py-3"> 
                        <Button type="a" to={route('quran.chapter', {chapter: id})} variant="outline">
                            {/* Mobile Screen (if not read)*/}
                            { hasProgress === 100 ? 'Baca lagi' : 'Mulai Baca'}
                        </Button>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}
