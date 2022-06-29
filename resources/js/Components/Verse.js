import { Transition } from '@headlessui/react';
import React, { useCallback, useState } from 'react'
import Tooltip from './Tooltip'

export default function Verse({
    className = '',
    juz,
    hizb,
    ruku,
    manzil,
    isSajdah,
    verseKey,
    wordFont = '',
    classFont = '',
    words
}) {
  const [show, setShow] = useState(false);
  const [dataTooltip, setDataTooltip] = useState({});

  const tooltip = useCallback(({target}) => {
    if (target.dataset.chartype == 'word') {
      let data = {}; 
      data.coordinate = target.getBoundingClientRect();
      data.text = target.dataset.translation;
      
      setDataTooltip({...data});
      setShow(true);
    }

  }, []);
  

  return (
    <>
    <Tooltip show={show} coordinate={dataTooltip.coordinate} data={dataTooltip.text} />
    <span 
        className={className} 
        data-juz={juz} 
        data-verse={verseKey} 
        data-hizb={hizb} 
        data-manzil={manzil} 
        data-ruku={ruku} 
        data-sajdah={isSajdah}>
        { words.map(word => (
          <Transition 
            key={word.id} 
            appear={true}
            show={true}
            as="span"
            enter="transition-opacity ease-linear duration-300 delay-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <span 
              className={`${wordFont} ${classFont} hover:text-primary-normal hover:cursor-default`} 
              data-position={word.position} 
              data-location={word.location}
              data-chartype={word.char_type_name}
              data-translation={word.translation.text}
              onMouseEnter={tooltip} 
              onMouseLeave={() => setShow(false)} 
              style={{fontFamily: wordFont}}
              >
              {word.code_v1}
            </span>
          </Transition>
        )) 
        }
    </span>
    </>
  )
}

