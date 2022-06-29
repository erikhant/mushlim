import React, { useState, useEffect } from 'react'
import { Head } from '@inertiajs/inertia-react';
import { useQuran } from '@/hooks/quran'
import Input from '@/Components/Input';
import Chapter from '@/Components/Chapter';
import Loading from '@/Components/Loading';
import AppLayout from '@/Layouts/AppLayout';
import { chaptersWithReader } from '@/helpers/quran/chapters';


export default function Index() {
  const { data, error, loading, searchSurah } = useQuran({list: 'chapter'});

  const [search, setSearch] = useState('');
  const [surahs, setSurah] = useState([]);

  const handleSearch = () => {
    if (!data) return;
    if (search !== '') {
      setSurah(searchSurah(search, chaptersWithReader(data)));
    }
    else {
      setSurah(chaptersWithReader(data));
    }
  }
  
  useEffect(() => {
    if (data) {
      setSurah(chaptersWithReader(data));
    }

  }, [data]);


  return (
      <AppLayout className="bg-body">
        <Head title="Quran" />
        <div className="mt-16 md:mt-0">
          <div className="fixed md:static md:mb-5 top-12 left-5 right-5 z-10">
            <Input value={search} placeholder="Cari Surah" handleChange={(event) => setSearch(event.target.value)} handleKeyboard={handleSearch} />
          </div>    
              { loading && <Loading />}

              { surahs?.length > 0 ? 
                  surahs.map(chapter => (
                    <Chapter 
                        key={chapter.id}
                        id={chapter.id}
                        arabic={chapter.name_arabic} 
                        transliteration={chapter.name_simple} 
                        revelation={chapter.revelation_place}
                        numVerses={chapter.verses_count}
                        latesReadAyat={chapter.lastAyatRead}
                      />
                  ))
                  :
                  !loading && 
                  <div className="h-16 w-full flex justify-center items-center"><p className="text-secondary-dark">Tidak ditemukan</p></div>    
              }
              { error && 
                  <div className="h-16 w-full flex justify-center items-center"><p className="text-secondary-dark">Oops! Sepertinya terjadi kesalahan.</p></div> 
              }
        </div>
      </AppLayout>
  )
}