import React, { useState, Fragment } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ProgressBar from '@/Components/ProgressBar';
import Bross from '@/Components/Bross';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import { Link, Head, usePage, useForm } from '@inertiajs/inertia-react';

export default function Home() {
  const { auth } = usePage().props;

  const [article, setArticle] = useState(['Lorem ipsum dolor sit atmet 1', 'Lorem ipsum dolor sit atmet 2']);

  const navSection = [
    {
      text: 'Al-Quran',
      route: route('quran.index'),
      img: '/img/quran-2-i.svg'
    },
    {
      text: 'Tafsir Al-Quran',
      route: '#',
      img: '/img/tafsir-2-i.svg'
    },
    {
      text: 'Dzikir & Doa',
      route: '#',
      img: '/img/dzikir-i.svg'
    },
    {
      text: 'Kisah Nabi \n & Sahabat',
      route: '#',
      img: '/img/nabi-saw-i.svg'
    },
  ];

  const navAppFooter = [
    {
      text: 'Baca Quran',
      route: route('quran.index')
    },
    {
      text: 'Baca Tafsir',
      route: '#'
    }, 
    {
      text: 'Hadits',
      route: '#'
    }, 
    {
      text: 'Kisah Nabi',
      route: '#'
    }
  ];

  const navHelpFooter = [
    {
      text: 'Tentang Kami',
      route: '#'
    },
    {
      text: 'Daftar',
      route: route('sign-up')
    }, 
    {
      text: 'Log in',
      route: route('login')
    }
  ];

  return (
    <AppLayout header={ auth ? <AuthBanner /> : <GuestBanner />}>
      <Head title="Home" />

      {/* Section Reading List */}
      <section id="reading-list" className="my-10 md:mb-24">
        <h2 className="text-base sm:text-lg md:text-xl text-primary-dark font-bold tracking-wide">Sumber bacaan</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
            {
              navSection.map(nav => (
                <div key={nav.text} className="col-span-1 flex flex-col justify-center items-center">
                  <Bross withAnimation={screen.availWidth >= 768}>
                    <Link href={nav.route} className="p-6 md:p-0 rounded-full">
                      <img src={nav.img} className="w-14 h-14 mx-auto" />
                      <p className="hidden lg:inline-block mt-3 text-primary-dark font-semibold">{nav.text}</p>
                    </Link>
                  </Bross>
                  <span className="text-sm sm:text-base lg:hidden mt-5">{nav.text}</span>
                </div>
              ))
            }
        </div>
      </section>

      {/* Section Featured & Jadwal Sholat */}
      <section className="my-12 md:mb-20">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-5 lg:col-span-3" id="featured">
            <div className="bg-primary-normal rounded-md h-full w-full">
              <p>Lorem ipsum</p>
            </div>
          </div>
          <div className="col-span-5 lg:col-span-2 overflow-hidden relative rounded-md" id="sholat-schedule">
            <div className="border border-secondary-light rounded-md flex justify-between p-4 pb-6 sm:p-8 sm:pt-5">
              <div className="w-1/2 tracking-wide">
                <h2 className="text-primary-dark text-base sm:text-lg font-bold">
                  Jadwal Sholat
                </h2>
                <p className="text-secondary-normal text-sm sm:text-base mb-5">Cirebon, Jawa Barat</p>
                <ul className="flex flex-col text-sm sm:text-base space-y-4 text-primary-dark w-full">
                    <li className="block"><span className="float-left">Subuh</span><span className="float-right">04:29 WIB</span></li>
                    <li className="block"><span className="float-left">Subuh</span><span className="float-right">04:29 WIB</span></li>
                    <li className="block"><span className="float-left">Subuh</span><span className="float-right">04:29 WIB</span></li>
                    <li className="block"><span className="float-left">Subuh</span><span className="float-right">04:29 WIB</span></li>
                    <li className="block"><span className="float-left">Subuh</span><span className="float-right">04:29 WIB</span></li>
                </ul> 
              </div>
              <div className="w-1/2 tracking-wide inline-flex justify-end">
                <p className="inline-block text-sm sm:text-base text-secondary-normal">20 Feb 2022</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Article */}
      <section className="my-12 md:mb-20">
        <div className="flex justify-between items-end md:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl text-primary-dark font-bold tracking-wide">Artikel islami</h2>
          <Link className="text-sm sm:text-base text-secondary-dark">Lihat semua</Link>
        </div>
        <div className="flex flex-col-reverse md:flex-row md:justify-between items-center space-y-6 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-[60%]">
            <div className="w-full lg:pr-16 mt-6 md:m-0">
              {
                article.map((item, index) => 
                  (<div className="flex items-start mb-6" key={index * 2}>
                    <div className="rounded h-24 w-28 overflow-hidden">
                      <Link className="inline-block">
                        <img src="https://images.unsplash.com/photo-1573483883644-d0b4b55eb25d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" className="inline-block w-full h-full object-cover" />
                      </Link>
                    </div>
                    <div className="w-auto px-4 sm:py-2">
                      <h1 className="text-sm sm:text-base text-secondary-dark tracking-wide leading-tight sm:leading-normal">
                        <Link className="inline-flex flex-col space-y-2">
                          {item}
                          <span className="block text-secondary-normal mt-1">{item}</span>
                        </Link>
                      </h1>
                    </div>
                  </div>)
                )
              }
            </div>
          </div>
          <div className="w-full md:w-[40%]">
            <div className="rounded-md overflow-hidden h-64 w-full relative">
              <img src="https://images.unsplash.com/photo-1573483883644-d0b4b55eb25d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" className="absolute bottom-0 top-0 left-0 right-0 w-full h-full object-cover" style={{zIndex: '-1'}} />
              <div className="h-full bg-gradient-to-t from-neutral-900 to-transparent ">
                <Link className="w-full h-full text-white tracking-wide flex flex-col space-y-1 p-4 justify-end">
                  <h1 className="sm:text-lg mb-0 leading-snug sm:leading-normal">Ramadhan Kareem</h1>
                  <p className="text-sm sm:text-base opacity-80">Lorem ipsum dolor sit atmet</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="my-12 md:mb-20 relative h-80">
        <div className="banner-pattern absolute top-0 left-1/2 transform -translate-x-1/2 w-[100vw] h-80 flex items-center">
          <div className="p-5 md:p-12 max-w-6xl mx-auto flex items-start sm:space-x-2">
            <div className="transform -translate-y-7 w-auto"><img src="/img/quote.svg" className="min-w-[28px] max-w-[52px]" /></div>
            <p className="text-white text-sm sm:text-base md:text-lg tracking-wide leading-snug sm:leading-relaxed md:text-center w-auto pl-4 md:pl-0 sm:pr-3 border-l border-l-slate-50 md:border-none" style={{textShadow: '0 0 3px rgb(55,55,55,0.5)'}}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni, sunt sint, consequatur quas autem mollitia vero repudiandae minima explicabo eum ratione, nihil enim eveniet quaerat! Quas, repellendus repudiandae? Quidem, earum?
            </p>
          </div>
        </div>
      </section>

      <section className="my-12 md:mb-20">
        <div className="flex justify-between flex-col md:flex-row">
          <ContactForm className={'flex-1 px-3 mb-12 md:m-0'} />
          <div className="flex-1 flex justify-center px-3 md:px-0 space-x-24">

            <div className="text-sm sm:text-base tracking-wide">
              <p className="text-primary-dark font-bold mb-5 md:mb-4">Aplikasi</p>
              <ul className="text-secondary-normal">
                {
                  navAppFooter.map((item, index) => (
                    <li key={index * 3} className="mb-5 md:mb-4">
                      <Link href={item.route} className="hover:text-secondary-dark">
                        {item.text}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="text-sm sm:text-base tracking-wide">
              <p className="text-primary-dark font-bold mb-5 md:mb-4">Bantuan</p>
              <ul className="text-secondary-normal">
                {
                  navHelpFooter.map((item, index) => (
                    <li key={index * 3} className="mb-5 md:mb-4">
                      <Link href={item.route} className="hover:text-secondary-dark">
                        {item.text}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

    </AppLayout>
  );
}

function GuestBanner() {
  return (
    <div className="h-48 sm:h-auto md:h-[412px] w-full mt-7 md:mt-0 p-4 sm:px-8 md:px-10 sm:py-8 lg:p-16 lg:py-12 border border-secondary-light rounded-lg overflow-hidden banner-bg">  
      <div className="w-10/12 sm:w-1/2 leading-loose text-primary-dark flex flex-col justify-center space-y-2 md:space-y-8">
        <h1 className="text-lg sm:text-xl md:text-4xl font-bold leading-snug sm:leading-relaxed">Sudahkah Anda membaca Al-Quran hari ini?</h1>
        <p className="tracking-wide text-sm sm:text-base leading-snug sm:leading-relaxed">Kami menyediakan Al-Quran digital dan sumber bacaan ilmu agama untuk kegiatan ibadah Anda yang <span className="hidden md:inline">bisa diakses dimana saja &</span> InsyaAllah bermanfaat. </p>
        <div className="hidden md:block">
          <Button type="a" to={route('quran.index')} variant="outline">
            Mulai Sekarang
          </Button>
        </div>
      </div>
    </div>
  )
}

function AuthBanner() {
  const { auth } = usePage().props;

  return (
    <div className="h-48 sm:h-auto md:h-[400px] w-full mt-7 md:mt-0 p-4 sm:px-8 md:px-10 sm:py-8 lg:p-16 lg:py-12 flex items-start justify-between border border-secondary-light rounded-lg overflow-hidden banner-pattern">  
      <div className="w-full sm:w-2/3 md:w-1/2 leading-loose text-primary-dark flex flex-col justify-center space-y-3 md:space-y-8">
        <h1 className="text-lg sm:text-xl md:text-4xl font-bold leading-snug sm:leading-relaxed">Assalamu'alaikum, <br/> { auth?.user.name }</h1>
        <div className="text-xs sm:text-base">
          <div className="flex justify-between text-primary-dark mb-2 md:mb-3">
            <p className="tracking-wider leading-relaxed inline-block">Terakhir dibaca</p>
            <p>10%</p>
          </div>
          <ProgressBar percentage={10} />
        </div>
        <div className="w-full flex justify-between text-xs sm:text-base">
          <Button type="a" to={'#'} variant="dark">
            Lanjutkan <span className="hidden sm:inline">&nbsp;membaca</span>
          </Button>
          <Link href={'#'} className="p-0 px-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light">
            Lihat riwayat
          </Link>
        </div>
      </div>
      <div className="hidden sm:inline-flex items-center w-40 md:w-auto">
        <img src="/img/banner-ornamen.svg" />
      </div>
    </div>
  )
}

function ContactForm({ className }) {
  const {data, setData, processing} = useForm({
    email: '',
    message: ''
  });

  const handleContactMessage = (event) => {
    event.preventDefault();
    
    alert(`email : ${data.email} | message : ${data.message}`);
  }

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  }

  return (
      <div className={className}>
        <h2 className="text-sm sm:text-base text-primary-dark font-bold tracking-wide leading-snug md:leading-relaxed mb-6">
          Jangan ragu untuk menghubungi kami melalui email, InsyaAllah kami akan menghubungi Anda sesegera mungkin
        </h2>
        <form onSubmit={handleContactMessage} className="md:pr-12">
          <Input 
            inputClasses="bg-body" 
            placeholder="Email" 
            name="email" 
            type="email" 
            value={data.email} 
            required 
            handleChange={onHandleChange}
          />
          <Input 
            type="textarea"
            className="my-4" 
            inputClasses="bg-body" 
            placeholder="Message" 
            name="message" 
            value={data.message} 
            required 
            rows={3} 
            handleChange={onHandleChange} 
          />
          <Button 
            type="submit"
            className="float-right" 
            processing={processing || _.isEmpty(data.email) || _.isEmpty(data.message)}
          >
            Kirim
          </Button>
        </form>
      </div>
  )
}
