/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';




const Footer: React.FC = () => {

    return (
        <div id='contacts' className='bg-gray-50 mt-24 border-t border-gray-200 text-gray-700 pb-16 md:pb-0'>
            <div className='container mx-auto'>
                <div className='mb-4 grid grid-cols-1 lg:grid-cols-2     mx-1.5 md:mx-4'>
                    <div>

                        <ul className='text-sm'>
                            <li className='my-5 group '>
                                <p className='font-semibold text-md mb-2'>Adresse</p>
                                <a href="https://maps.app.goo.gl/4Wk5BzuoGk9F941M8" className={`flex items-center  text-gray-700 hover:text-red-600 hover:font-semibold justify-center`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        className="transform transition-transform duration-500 group-hover:-translate-x-2 opacity-0 group-hover:opacity-100 min-w-10"
                                    >
                                        <path fill="currentColor" d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z" />
                                    </svg>
                                    <span>25, Av. de l'OUA, C/ Ngaliema, Réf: Rond point Safricas, Kinshasa, République Démocratique du Congo.</span>
                                </a>
                            </li>
                            <div className='md:grid-cols-2 grid'>
                                <li className='my-5'>
                                    <p className='font-semibold text-md mb-2'>Téléphone</p>
                                    <a href="tel:+243841563256" className={`flex text-gray-700 hover:text-red-600 hover:font-semibold group `}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            className="transform transition-transform duration-500 group-hover:-translate-x-2 opacity-0 group-hover:opacity-100"
                                        >
                                            <path fill="currentColor" d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z" />
                                        </svg>
                                        <span>+243 841 563 256</span>
                                    </a>
                                    <a href="tel:+243820153154" className={`flex text-gray-700 hover:text-red-600 hover:font-semibold group `}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            className="transform transition-transform duration-500 group-hover:-translate-x-2 opacity-0 group-hover:opacity-100"
                                        >
                                            <path fill="currentColor" d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z" />
                                        </svg>
                                        <span>+243 820 153 154</span>
                                    </a>
                                </li>
                                <li className='my-5 group '>
                                    <p className='font-semibold text-md mb-2'>Adresse mail</p>
                                    <a href="mailto:Cardio.faith@gmail.com" className={`flex items-center text-gray-700 hover:text-red-600 hover:font-semibold `}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            className="transform transition-transform duration-500 group-hover:-translate-x-2 opacity-0 group-hover:opacity-100"
                                        >
                                            <path fill="currentColor" d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z" />
                                        </svg>
                                        <span>Cardio.faith@gmail.com</span>
                                    </a>
                                </li>
                            </div>
                        </ul>
                    </div>
                    <div className='text-center items-center h-full flex'>
                        <div className='text-sm'>
                            <p>
                                Prenez soin de votre cœur aujourd'hui pour garantir votre bien-être de demain – prenez rendez-vous avec nos experts en cardiologie et commencez dès maintenant à préserver votre santé cardiaque avec des soins personnalisés et de haute qualité.
                            </p>
                            <div className='flex justify-center'>
                                <a href='mailto:Cardio.faith@gmail.com' className="flex items-center justify-center mt-4 mb-2 mx-2 border rounded-full hover:bg-red-600 cursor-pointer transition-transform duration-300 transform py-4 px-7 border-red-600 relative group w-64">
                                    <span className="absolute flex left-2 transform group-hover:translate-x-[calc(100%-3rem)] transition-transform duration-1000 w-full ">
                                        <div className="p-1 border-red-600 text-red-600 duration-500 group-hover:border-red-600  group-hover:bg-white border rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z" /></svg>
                                        </div>
                                    </span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-semibold text-white text-sm">
                                        Maintenant!
                                    </span>
                                    <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-500 font-semibold text-red-600 text-sm absolute">
                                        Prenez rendez-vous
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between border-t border-gray-300 mt-8 px-2 md:px-8 md:flex-nowrap flex-wrap">
                    <div className='flex space-x-2 text-sm flex-wrap'>
                        <div className='py-2 pb-4 hover:text-red-600 cursor-pointer'>
                            © 2024 Cardio Faith, Inc.
                        </div>

                        <span className='border-l border-gray-300'></span>
                        <div className='py-2 pb-4 hover:text-red-600 cursor-pointer'>
                            Confidentialité
                        </div>
                        <span className='border-l border-gray-300'></span>
                        <a href={'https://www.geedoo-kanda.com/'} className='py-2 pb-4 hover:text-red-600 cursor-pointer'>
                            Designed by GEEDOO KANDA
                        </a>
                        <span className='border-l border-gray-300'></span>
                        <a href={'https://www.facebook.com/p/Cardio-faith-100075914775248/'} className='py-2 pb-4 hover:text-red-600 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="m23.446 18l.889-5.791h-5.557V8.451c0-1.584.776-3.129 3.265-3.129h2.526V.392S22.277.001 20.085.001c-4.576 0-7.567 2.774-7.567 7.795v4.414H7.431v5.791h5.087v14h6.26v-14z" /></svg>
                        </a>
                        <span className='border-l border-gray-300'></span>
                        <a href={'https://www.instagram.com/cardio_faith_rdc/p/CwZpg18t7yt/'} className='py-2 pb-4 hover:text-red-600 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01" /></g></svg>
                        </a>
                    </div>
                 
                </div>
            </div>
        </div>
    );
};

export default Footer;
