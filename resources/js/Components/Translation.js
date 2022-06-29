import React, { useEffect, useRef, useState } from 'react';
import API from '@/api/api.client';
import axios from 'axios';
import useSWR from 'swr';
import { usePage } from '@inertiajs/inertia-react';
import Loading from './Loading';

export default function Translation({ text = '', className = '', footnote, verseKey }) {
  const { quran } = usePage().props;
  const target = useRef();
  const footnotes = [];
  let noteId;
  
  const handleNoteFetch = (data) => {
    footnotes.push(data);
    footnote && footnote(footnotes, target);
  }

  const explodeText = text.split(/<sup\s(\w*=\d*)>\d<\/sup>/ig);
  const translate = explodeText.map(text => { 
      if(text.includes('foot_note')){
          quran.footnoteCount++;
          noteId = text.match(/\d+/).join('');
          return <SupScript data={parseInt(noteId)} key={noteId} onDataFetched={handleNoteFetch} dataOrder={quran.footnoteCount} />
      }
      return text;
  });

  return (
    <div className={className} data-verse={verseKey} ref={target}>
        <p>{translate}</p>
    </div>
  )
}

function SupScript({ data:key, dataOrder = 1, onDataFetched }) {
    const [trigger, setTrigger] = useState(false);
    
    const fetcher = (url) => axios.get(url).then(response => response.data.foot_note).catch(error => {
        console.error(error);
        if (error.response) throw error.response.data;
        if (error.request) throw Error('No response was received');
    });
    const { data, error } = useSWR(() => trigger ? API.quran.v2.footnote(key) : null, fetcher, { revalidateOnFocus : false });

    const handleFetch = (e) => {
        setTrigger(true);
    }

    useEffect(() => {
        if (data) {
            onDataFetched && onDataFetched(data);
        }
        if (error) {
            if(error.status >= 400) setTrigger(false);
        }
    }, [data, error]);
    

    return (
        <button className="bg-transparent p-0 m-0 w-auto h-auto inline focus-visible:outline-none border-none focus-visible:underline" onClick={handleFetch}>
            <sup className="p-0.5 font-semibold text-red-600 decoration-red-600 cursor-pointer" data-footnote={key}>{`[${dataOrder}]`}</sup>
        </button>
    )    
}
