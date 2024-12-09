"use client";

import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import Dropdown from './Dropdown';
import ApplicationLogo from './ApplicationLogo';

interface NavbarProps {
    auth: {
        user: any;
    };
}

const Navbar: React.FC<NavbarProps> = ({ auth }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {  // Seuil pour changer la couleur de fond
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <div className='w-full font-mono'>
            {/* Navbar pour grand écran */}
            <nav className={`${isScrolled ? " bg-[#3c3c3c]/90 fixed" : "bg-transparent absolute"} z-50 flex-wrap lg:flex-nowrap gap-5 hidden lg:flex items-center justify-between w-full py-2 px-8`}>
                <div className="flex gap-4 text-sm w-full">
                    <ScrollLink to="home" smooth={true} duration={500} className={`text-white hover:font-semibold cursor-pointer`}>Home</ScrollLink>
                    <ScrollLink to="about" smooth={true} duration={500} className={`text-white hover:font-semibold cursor-pointer`}>About</ScrollLink>
                    <ScrollLink to="services" smooth={true} duration={500} className={`text-white hover:font-semibold cursor-pointer`}>Services</ScrollLink>
                    <ScrollLink to="faq" smooth={true} duration={500} className={`text-white hover:font-semibold cursor-pointer`}>FAQ</ScrollLink>
                    <ScrollLink to="contacts" smooth={true} duration={500} className={`text-white hover:font-semibold cursor-pointer`}>Contacts</ScrollLink>
                </div>
                <div className='flex justify-between w-full items-center'>
                    <div className="">
                        {
                            isScrolled &&
                            <ApplicationLogo className='h-14 w-auto ' />

                        }
                    </div>
                    <div className="">
                        {auth.user ? (
                            <>
                                {
                                    auth.user.acces != 0 ?
                                        auth.user.disable != 'true' ?
                                            <Link
                                                href={route('dashboard')}
                                                className="inline-flex font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                            >
                                                Dashboard
                                            </Link>
                                            : ''
                                        : ''
                                }
                                <Dropdown.Link href={route('logout')} method="post" as="button" className='px-4 py-2 text-sm bg-red-600 hover:bg-red-600 text-white rounded-md'>
                                    Deconnexion
                                </Dropdown.Link>

                            </>
                        ) : (
                            <div className='flex gap-2'>
                                <Link
                                    href={route('login')}
                                    className='px-4 py-2 text-sm bg-red-600 hover:bg-red-600 text-white rounded-md flex items-center'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M26 30H14a2 2 0 0 1-2-2v-3h2v3h12V4H14v3h-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2" /><path fill="currentColor" d="M14.59 20.59L18.17 17H4v-2h14.17l-3.58-3.59L16 10l6 6l-6 6z" /></svg>
                                    Connexion
                                </Link>
                                <Link
                                    href={route('register')}
                                    className='px-4 py-2 text-sm border border-red-600 hover:bg-red-600 text-red-600 hover:text-white rounded-md flex items-center'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="2.75" r="2.25"/><path d="M4.5 12.5h-4V11A4.51 4.51 0 0 1 7 7m3.5.5v6m-3-3h6"/></g></svg>
                                    Inscription
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <nav className={`w-full py-4 fixed z-50 lg:hidden transition-all duration-300 ${isScrolled ? "backdrop-blur-sm bg-[#3c3c3c]/90" : "bg-transparent"}`}>
                <div className="">
                    <div className="flex items-center justify-between px-4">
                        <div className="">
                            {
                                isScrolled &&
                                <ApplicationLogo className='h-14 w-auto ' />

                            }
                        </div>
                        <div className="">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-white focus:outline-none"
                            >
                                <svg
                                    className="h-8 w-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Menu mobile*/}
            <div className={`bg-black/30 absolute h-screen w-full z-50 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300 ease-in-out`}>
                <div className={`fixed backdrop-blur-sm bg-[#1e1e1e]/90 h-screen w-[80%] right-0 pt-8 px-4 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className='flex justify-end items-end -mt-4'>
                        <svg onClick={() => setIsMenuOpen(!isMenuOpen)} xmlns="http://www.w3.org/2000/svg" className='hover:text-red-600 text-white' width="40" height="40" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 18L18 6m0 12L6 6" /></svg>
                    </div>
                    <ul className='grid grid-cols-1 text-center gap-4 mt-8 '>
                        <ScrollLink onClick={() => setIsMenuOpen(!isMenuOpen)} to="home" smooth={true} duration={500} className={`text-white hover:font-semibold cursor-pointer`}>Home</ScrollLink>
                        <ScrollLink onClick={() => setIsMenuOpen(!isMenuOpen)} to="about" smooth={true} duration={500} className={`text-white hover:font-semibold cursor-pointer`}>About</ScrollLink>
                        <ScrollLink onClick={() => setIsMenuOpen(!isMenuOpen)} to="services" smooth={true} duration={500} className={`text-white hover:font-semibold cursor-pointer`}>Services</ScrollLink>
                        <ScrollLink onClick={() => setIsMenuOpen(!isMenuOpen)} to="faq" smooth={true} duration={500} className={`text-white hover:font-semibold cursor-pointer`}>FAQ</ScrollLink>
                        <ScrollLink onClick={() => setIsMenuOpen(!isMenuOpen)} to="contacts" smooth={true} duration={500} className={`text-white hover:font-semibold cursor-pointer`}>Contacts</ScrollLink>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
