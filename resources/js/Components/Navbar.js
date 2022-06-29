import React, { useState } from 'react';
import Logo from '@/Components/Logo';
import Dropdown from '@/Components/Dropdown';
import { Transition } from '@headlessui/react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { ChevronDownIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Button from './Button';


export default function Navbar() {
    const { auth } = usePage().props;

    const [showResponsiveMenu, setShowResponsiveMenu] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-ui w-full md:border-none md:static z-30 border-b-2 border-b-secondary-light">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Large Screen */}
                <div className="hidden md:flex justify-between h-20">
                    <div className="shrink-0 flex items-center">
                        <Link href="/">
                            <Logo className="block h-9 w-auto" />
                        </Link>
                    </div>
                    <ul className="flex space-x-4 items-center">
                                <li className="list-none">
                                    <Button type="a" to={route('home')} isActive={route().current('home')}>
                                        Home
                                    </Button>
                                </li>
                                <li className="list-none">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <Button className="p-1 border-b-2 border-transparent focus-visible:border-primary-normal">
                                                <span className="inline-flex items-center ">
                                                    Sumber Bacaan &nbsp;
                                                    <ChevronDownIcon className="h-4 w-4" />
                                                </span>
                                            </Button>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content className="flex flex-col w-full">
                                            <Button type="a" to={route('quran.index')} className="px-4 py-1.5">
                                                Al-Quran
                                            </Button>
                                            <Button type="a" to="#" className="px-4 py-1.5">
                                                Tafsir Al-Quran
                                            </Button>
                                            <Button type="a" to="#" className="px-4 py-1.5">
                                                Dzikir {'&'} Doa
                                            </Button>
                                            <Button type="a" to="#" className="px-4 py-1.5">
                                                Kisah Nabi
                                            </Button>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>
                                <li className="list-none">
                                    <Button type="a" to="#" className="border-b-2 border-transparent focus-visible:border-primary-normal">
                                        Tentang
                                    </Button>
                                </li>
                                {
                                    auth ? 
                                    <li className="list-none">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <Button className="p-1 focus-visible:border-primary-dark">
                                                    <span className="h-8 w-8 rounded-full bg-secondary-normal"></span>
                                                    &nbsp;
                                                    <ChevronDownIcon className="h-4 w-4" />
                                                </Button>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content className="flex flex-col w-full ">
                                                <Button type="a" to="#" className="px-4 py-1.5">
                                                    Dashboard
                                                </Button>
                                                <Button type="a" to={route('logout')} method="post" className="px-4 py-1.5">
                                                    Log out
                                                </Button>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    :
                                    <>
                                    <li className="list-none">
                                        <Button type="a" to={route('sign-up')} className="border-b-2 border-transparent focus-visible:border-primary-normal">
                                            Sign Up
                                        </Button>
                                    </li>
                                    <li className="list-none">
                                        <Button type="a" to={route('login')} variant="solid">
                                            Log in
                                        </Button>
                                    </li>
                                    </>
                                }
                    </ul>
                </div>            

                {/* Mobile Screen */}
                        
                <div className="flex justify-between w-full md:hidden bg-ui">
                        <Transition
                            className="grow"
                            show={showResponsiveMenu}
                            enter="transition ease-linear duration-300 transform"
                            enterFrom="-translate-y-[70%] opacity-0"
                            enterTo="translate-y-0 opacity-100"
                            leave="transition ease-linear duration-200 transform"
                            leaveFrom="translate-y-0 opacity-100"
                            leaveTo="-translate-y-[70%] opacity-10"
                        >
                            <ul className="text-secondary-dark text-base tracking-wide pt-3 sm:pl-8 sm:pt-8">
                                <li className="border-b border-b-neutral-200 px-3 py-2">
                                    <Button type="a" to={route('home')} isActive={route().current('home')}>
                                        Home
                                    </Button>
                                </li>
                                <li className="border-b border-b-neutral-200 px-3 py-2">
                                    <Button type="a" to={'#'} isActive={false}>
                                        Tentang
                                    </Button>
                                    </li>
                                <li className="border-b border-b-neutral-200 px-3 py-2">
                                    <Dropdown>
                                        <Dropdown.Trigger responsive>
                                            <Button>
                                                <span className="inline-flex items-center ">
                                                    Sumber Bacaan &nbsp;
                                                    <ChevronDownIcon className="h-4 w-4" />
                                                </span>
                                            </Button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Responsive>
                                            <Button type="a" to={route('quran.index')} className="px-3 py-2 block">Al-Quran</Button>
                                            <Button type="a" to={'#'} className="px-3 py-2 block">Tafsir Al-Quran</Button>
                                            <Button type="a" to={'#'} className="px-3 py-2 block">Dzikir & Doa</Button>
                                            <Button type="a" to={'#'} className="px-3 py-2 block">Kisah Nabi & Sahabat</Button>
                                        </Dropdown.Responsive>
                                    </Dropdown>
                                </li>
                                <li className="border-b border-b-neutral-200 px-3 py-2">
                                    <Button type="a" to={route('sign-up')} isActive={route().current('sign-up')}>
                                        Sign Up
                                    </Button>
                                </li>
                                <li className="border-b border-b-neutral-200 px-3 py-2">
                                    <Button type="a" to={route('login')} isActive={route().current('login')}>
                                        Login
                                    </Button>
                                </li>
                            </ul>
                            <div className="w-full flex justify-center sm:justify-end">
                                <button className="focus-visible:ouline-none border-none outline-none px-2 py-3 focus-visible:ring focus-visible:ring-primary-normal rounded-sm translate-x-1/2" onClick={()=> setShowResponsiveMenu(!showResponsiveMenu)}>
                                    <XIcon className="w-6 h-6 text-secondary-dark" />
                                </button>
                            </div>
                        </Transition>
                        <div className="ml-auto overflow-hidden">
                            <div className={`transition inline-block ease-linear ${showResponsiveMenu ? 'translate-x-[120%] ' : '' }`}>
                                <button className="focus-visible:ouline-none border-none outline-none py-2 focus-visible:ring focus-visible:ring-primary-normal rounded-sm" onClick={()=> setShowResponsiveMenu(!showResponsiveMenu)}>
                                    <MenuIcon className="w-6 h-6 text-secondary-dark" />
                                </button>
                            </div>
                        </div>
                        {
                            showResponsiveMenu &&
                            <div className="fixed inset-0 min-h-screen w-full bg-gray-100 bg-opacity-20" style={{zIndex: '-1'}} onClick={()=> setShowResponsiveMenu(!showResponsiveMenu)}></div>
                        } 
                </div>
            </div>        
        </nav>
  )
}
