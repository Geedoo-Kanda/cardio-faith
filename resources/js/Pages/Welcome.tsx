import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Dropdown from '@/Components/Dropdown';
import Navbar from '@/Components/Navbar';
import BarreLogo from '@/Components/BarreLogo';
import FAQAccordion from '@/Components/FAQAccordion';
import Footer from '@/Components/Footer';

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    return (
        <main className='font-mono'>
            <Head title="Welcome" />
            <Navbar auth={auth} />
            <div id='home' className='h-screen grid lg:grid-cols-2'>
                <div className='rounded-br-[30%] lg:rounded-br-[0%] lg:rounded-tr-[30%] bg-red-600 text-white flex items-center'>
                    <div className='p-8'>
                        <h3 className='text-xl'>Cabinet Médical</h3>
                        <h1 className=" mb-4 text-4xl font-sans font-bold">Cardio Faith : Votre partenaire en santé cardiaque.</h1>
                        <p className='text-sm'>Nous offrons des soins spécialisés et personnalisés pour prévenir, diagnostiquer et traiter les maladies cardiovasculaires. Votre santé est notre priorité.</p>
                        <div className='flex justify-center'>
                            <a href='mailto:Cardio.faith@gmail.com' className="flex items-center justify-center mt-4 mb-2 mx-2 border rounded-full hover:bg-white cursor-pointer transition-transform duration-300 transform p-3 border-white relative group w-64">
                                <span className="absolute flex left-2 transform group-hover:translate-x-[calc(100%-3rem)] transition-transform duration-1000 w-full ">
                                    <div className="p-1 border-white duration-500 group-hover:border-red-600  group-hover:bg-red-600 group-hover:text-white border rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z" /></svg>
                                    </div>
                                </span>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-semibold text-red-600 text-sm">
                                    Maintenant!
                                </span>
                                <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-500 font-semibold text-white text-sm absolute">
                                    Prenez rendez-vous
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center bg-red-600 relative'>
                    <div className='rounded-tl-[30%] lg:rounded-tl-[0%] lg:rounded-bl-[30%] bg-white h-full w-full flex justify-center items-center'>
                        <img src="/heart.png" alt="logo" />
                    </div>
                    <div className='absolute flex flex-wrap justify-around items-center w-full h-full'>
                        <div className="backdrop-blur-sm bg-[#4f4f4f]/50 text-white p-3 rounded-md m-1">
                            <div className="flex text-xs justify-between items-center w-40 sm:w-44 md:w-48 lg:w-56">
                                <span>Tension artérielle</span>
                                <svg className='animate-bounce' xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 48 48"><g fill="currentColor"><path d="m25 21.5l-1.5 5l1.5 2l1.5-2z" /><path fill-rule="evenodd" d="M34.001 17.633a17 17 0 0 1-2.606-1.614C29.852 14.846 28 12.949 28 10.449C28 8.221 29.684 6 32.188 6C33.35 6 34.29 6.464 35 7.157C35.709 6.464 36.65 6 37.813 6C40.316 6 42 8.223 42 10.448c0 2.423-1.861 4.323-3.389 5.503a18 18 0 0 1-2.61 1.667c.006 1.744.034 3.409.06 4.985c.06 3.455.11 6.484-.099 8.985c-.318 3.788-1.257 6.828-4.065 8.473c-2.761 1.617-6.841 2.225-10.22 1.814c-1.696-.206-3.315-.68-4.54-1.498c-.891-.595-1.598-1.396-1.93-2.4c-2.077-.095-4.143-.474-5.777-1.152c-1.765-.732-3.43-2-3.43-3.985V13.122h.003L6 13c0-2.761 4.477-5 10-5s10 2.239 10 5q0 .061-.003.122H26v5.949a7.001 7.001 0 0 1-.001 13.858c-.046 2.015-1.657 3.29-3.434 4.014c-1.47.598-3.28.928-5.13 1.026q.299.402.814.745c.87.582 2.15.991 3.67 1.176c3.051.371 6.667-.208 8.968-1.555c1.911-1.12 2.775-3.255 3.082-6.914c.201-2.402.152-5.262.095-8.638a358 358 0 0 1-.063-5.15M32.188 8C31.006 8 30 9.096 30 10.448c0 1.495 1.148 2.872 2.605 3.977a15 15 0 0 0 2.384 1.466q.195-.1.46-.249c.534-.299 1.24-.732 1.94-1.273C38.86 13.231 40 11.855 40 10.449C40 9.095 38.994 8 37.813 8c-.824 0-1.48.458-1.939 1.285L35 10.862l-.874-1.577C33.666 8.458 33.01 8 32.188 8M16 18c3.271 0 6.176-.785 8-2v3.07a7.001 7.001 0 0 0-.003 13.859c-.044.778-.673 1.545-2.186 2.161c-1.525.621-3.632.933-5.8.909a21 21 0 0 1-.92-.031V17.98q.45.02.909.02m8-5c0 .215-.226.948-1.823 1.747C20.699 15.485 18.518 16 16 16s-4.7-.515-6.177-1.253C8.226 13.948 8 13.215 8 13s.226-.948 1.823-1.747C11.301 10.515 13.482 10 16 10s4.7.515 6.177 1.253C23.774 12.052 24 12.785 24 13m1 18a5 5 0 1 0 0-10a5 5 0 0 0 0 10" clip-rule="evenodd" /></g></svg>
                            </div>
                            <div className='flex justify-center gap-2 items-center'>
                                <h3 className='text-3xl font-sans font-semibold'>120/80</h3>
                                <small className='text-xs'>mmHg</small>
                            </div>
                        </div>
                        <div className="backdrop-blur-sm bg-[#4f4f4f]/50 text-white p-3 rounded-md m-1">
                            <div className="flex text-xs justify-between items-center w-40 sm:w-44 md:w-48 lg:w-56">
                                <span>Fréquence cardiaque</span>
                                <svg className="animate-bounce" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="M72 144H32a8 8 0 0 1 0-16h35.72l13.62-20.44a8 8 0 0 1 13.32 0l25.34 38l9.34-14A8 8 0 0 1 136 128h24a8 8 0 0 1 0 16h-19.72l-13.62 20.44a8 8 0 0 1-13.32 0L88 126.42l-9.34 14A8 8 0 0 1 72 144M178 40c-20.65 0-38.73 8.88-50 23.89C116.73 48.88 98.65 40 78 40a62.07 62.07 0 0 0-62 62v2.25a8 8 0 1 0 16-.5V102a46.06 46.06 0 0 1 46-46c19.45 0 35.78 10.36 42.6 27a8 8 0 0 0 14.8 0c6.82-16.67 23.15-27 42.6-27a46.06 46.06 0 0 1 46 46c0 53.61-77.76 102.15-96 112.8c-10.83-6.31-42.63-26-66.68-52.21a8 8 0 1 0-11.8 10.82c31.17 34 72.93 56.68 74.69 57.63a8 8 0 0 0 7.58 0C136.21 228.66 240 172 240 102a62.07 62.07 0 0 0-62-62" /></svg>
                            </div>
                            <div className='flex justify-center gap-2 items-center'>
                                <h3 className='text-3xl font-sans font-semibold'>60-100</h3>
                                <small className='text-xs'>bpm</small>
                            </div>
                        </div>
                        <div className="backdrop-blur-sm bg-[#4f4f4f]/50 text-white p-3 rounded-md m-1">
                            <div className="flex text-xs justify-between items-center w-40 sm:w-44 md:w-48 lg:w-56">
                                <span>Cholestérol LDL</span>
                                <svg className='animate-bounce' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><g fill="currentColor"><path d="M25 14.333c0 .454-.37 1.108-1.514 1.707c-1.097.575-2.681.96-4.486.96s-3.389-.385-4.486-.96C13.37 15.441 13 14.787 13 14.333c0-.396.274-.942 1.136-1.489l-1.071-1.688c-1.138.72-2.065 1.801-2.065 3.177c0 1.571 1.197 2.751 2.586 3.479C15.023 18.564 16.94 19 19 19s3.977-.436 5.414-1.188c1.39-.728 2.586-1.908 2.586-3.479c0-1.376-.927-2.456-2.064-3.177l-1.072 1.688c.862.547 1.136 1.093 1.136 1.49" /><path fill-rule="evenodd" d="M6 15.5c0 2.976 1.873 5.632 4.803 7.374c-4.474 2.662-6.511 7.517-4.551 10.912c1.981 3.432 7.297 4.072 11.873 1.43c4.434-2.56 6.546-7.262 4.87-10.673C28.22 23.31 32 19.728 32 15.5C32 10.253 26.18 6 19 6S6 10.253 6 15.5m21.013 5.103C28.989 19.158 30 17.33 30 15.5s-1.01-3.658-2.988-5.103C25.037 8.954 22.212 8 19 8c-3.21 0-6.037.954-8.012 2.397C9.01 11.842 8 13.67 8 15.5s1.011 3.658 2.988 5.103C12.963 22.046 15.789 23 19 23s6.037-.954 8.012-2.397m-10.447 4.23q1.071.15 2.198.165c.197.186.372.402.516.652c.644 1.115.41 2.41-.167 3.47c-.587 1.077-1.603 2.083-2.88 2.82s-2.656 1.114-3.882 1.083c-1.207-.03-2.445-.474-3.088-1.589c-.563-.974-.453-2.094-.035-3.056l1.835.797c-.26.596-.212 1.01-.068 1.259c.163.283.584.57 1.406.59c.801.02 1.82-.232 2.832-.816s1.74-1.34 2.123-2.045c.393-.722.356-1.23.192-1.513c-.144-.25-.478-.497-1.124-.57z" clip-rule="evenodd" /><path d="M35.836 24.764c2.395.642 4.726-.294 5.208-2.09c.48-1.796-1.07-3.773-3.466-4.414c-2.395-.642-4.726.294-5.208 2.09c-.48 1.796 1.07 3.773 3.466 4.414" /><path fill-rule="evenodd" d="M42.245 36.457c-1.071 3.998-6.261 6.081-11.592 4.653s-8.784-5.828-7.713-9.826s6.261-6.081 11.592-4.653s8.785 5.828 7.713 9.826m-6.938-1.082c.832-.245 1.196-.655 1.29-1.006c.082-.309.01-.753-.417-1.291l1.565-1.245c.677.85 1.083 1.937.784 3.054c-.343 1.278-1.455 2.053-2.656 2.407c-1.22.36-2.705.353-4.186-.044s-2.77-1.133-3.647-2.055c-.863-.907-1.438-2.134-1.096-3.412c.3-1.117 1.194-1.855 2.206-2.253l.733 1.86c-.64.252-.924.601-1.007.91c-.094.35.015.888.613 1.517c.584.613 1.531 1.184 2.716 1.501c1.184.318 2.29.297 3.102.057" clip-rule="evenodd" /></g></svg>
                            </div>
                            <div className='flex justify-center gap-2 items-center'>
                                <h3 className='text-3xl font-sans font-semibold'> 1,6</h3>
                                <small className='text-xs'>g/L</small>
                            </div>
                        </div>
                        <div className="backdrop-blur-sm bg-[#4f4f4f]/50 text-white p-3 rounded-md m-1">
                            <div className="flex text-xs justify-between items-center w-40 sm:w-44 md:w-48 lg:w-56">
                                <span>Glycémie</span>
                                <svg className='animate-bounce' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M5.5 15.5C3.288 14.617 2 12.433 2 10.175C2 7.245 4.317 4.35 5.943 2.68c.883-.908 2.23-.908 3.114 0c.492.505.908 1.122 1.443 1.819M8 14.926c0-3.556 2.949-7.07 5.019-9.1c1.124-1.101 2.838-1.101 3.962 0c2.07 2.03 5.019 5.544 5.019 9.1C22 18.413 19.35 22 15 22s-7-3.587-7-7.074" /><path d="M18.5 15.5c0 2.21-1.5 3-3 3" /></g></svg>
                            </div>
                            <div className='flex justify-center gap-2 items-center'>
                                <h3 className='text-3xl font-sans font-semibold'>0,7-1,1</h3>
                                <small className='text-xs'>g/L</small>
                            </div>
                        </div>
                        <div className="backdrop-blur-sm bg-[#4f4f4f]/50 text-white p-3 rounded-md m-1">
                            <div className="flex text-xs justify-between items-center w-40 sm:w-44 md:w-48 lg:w-56">
                                <span>Saturation en oxygène</span>
                                <svg className="animate-bounce" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M17 6h2V4h-6v2h2v2h-2.17a3.001 3.001 0 1 0 0 2H15v2.083A6 6 0 0 0 10 18v25a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V18a6 6 0 0 0-5-5.917V10h5V8h-5zm-1 8a4 4 0 0 0-4 4v2h8v-2a4 4 0 0 0-4-4m-4 28V22h8v20zM9 9a1 1 0 1 1 2 0a1 1 0 0 1-2 0m17 12a4 4 0 0 1 8 0v6a4 4 0 0 1-8 0zm4-2a2 2 0 0 0-2 2v6a2 2 0 1 0 4 0v-6a2 2 0 0 0-2-2m8 7h-3v-2h3a3 3 0 1 1 0 6a1 1 0 0 0-1 1v1h4v2h-5a1 1 0 0 1-1-1v-2a3 3 0 0 1 3-3a1 1 0 1 0 0-2" clip-rule="evenodd" /></svg>
                            </div>
                            <div className='flex justify-center gap-2 items-center'>
                                <h3 className='text-3xl font-sans font-semibold'>95-100</h3>
                                <small className='text-xs'>%</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mx-auto text-gray-800 px-2'>
                <div id='about' className="grid md:grid-cols-2 gap-8 my-20 items-center">
                    <div className="h-80 overflow-hidden w-full bg-cover bg-center rounded-md min-h-56 bg-[url('/about.jpg')]">
                        <div className="bg-black/30 w-full h-full p-4">
                        </div>
                    </div>
                    <div className="text-justify md:py-14">
                        <span className="bg-red-100 text-red-600 py-2 px-8 rounded-full border border-red-600">About us</span>
                        <div className="mt-4">
                            <p className="my-3">
                                <span className='text-red-600 font-semibold'>Cardio Faith</span> est un cabinet médical spécialisé dans la prise en charge des pathologies cardiovasculaires, dédié à améliorer la santé cardiaque de nos patients grâce à une expertise de pointe et des soins personnalisés. Nous croyons fermement que chaque battement de cœur mérite une attention particulière, et notre mission est d'assurer un suivi complet et de qualité pour prévenir, diagnostiquer et traiter les maladies cardiaques.
                            </p>
                            <p className="my-3">
                                Nous offrons des soins de qualité en utilisant les meilleures pratiques médicales et des technologies modernes pour prévenir, diagnostiquer et traiter les maladies cardiovasculaires, tout en sensibilisant nos patients à l’importance de leur santé cardiaque.
                            </p>

                        </div>
                    </div>
                </div>
                <div id='services' className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 my-20">
                    <div className='col-span-full'>
                        <span className="bg-red-100 text-red-600 py-2 px-8 rounded-full border border-red-600">Nos services</span>
                    </div>
                    <div className='text-center shadow-md rounded-md bg-gray-50 p-4 border group hover:bg-red-50 hover:border-red-200'>
                        <div className="flex mb-2 justify-center">
                            <div className="p-4 text-red-600 bg-red-100 group-hover:bg-red-600 group-hover:text-white rounded-full border border-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 256 256"><g fill="currentColor"><path d="M16 152h32v56H16a8 8 0 0 1-8-8v-40a8 8 0 0 1 8-8M192.54 40A39.12 39.12 0 0 0 156 64a39.12 39.12 0 0 0-36.54-24C97.67 40 80 58.31 80 80c0 14.56 7 27.71 16.73 40H140a20 20 0 0 1 0 40h4l37.78-8.68C203.82 135.07 232 109.23 232 80c0-21.69-17.67-40-39.46-40" opacity=".2" /><path d="M230.33 141.06a24.34 24.34 0 0 0-18.61-4.77C230.5 117.33 240 98.48 240 80c0-26.47-21.29-48-47.46-48A47.58 47.58 0 0 0 156 48.75A47.58 47.58 0 0 0 119.46 32C93.29 32 72 53.53 72 80c0 11 3.24 21.69 10.06 33a31.87 31.87 0 0 0-14.75 8.4L44.69 144H16a16 16 0 0 0-16 16v40a16 16 0 0 0 16 16h104a8 8 0 0 0 1.94-.24l64-16a7 7 0 0 0 1.19-.4L226 182.82l.44-.2a24.6 24.6 0 0 0 3.93-41.56ZM119.46 48a31.15 31.15 0 0 1 29.14 19a8 8 0 0 0 14.8 0a31.15 31.15 0 0 1 29.14-19C209.59 48 224 62.65 224 80c0 19.51-15.79 41.58-45.66 63.9l-11.09 2.55A28 28 0 0 0 140 112h-39.32C92.05 100.36 88 90.12 88 80c0-17.35 14.41-32 31.46-32M16 160h24v40H16Zm203.43 8.21l-38 16.18L119 200H56v-44.69l22.63-22.62A15.86 15.86 0 0 1 89.94 128H140a12 12 0 0 1 0 24h-28a8 8 0 0 0 0 16h32a8.3 8.3 0 0 0 1.79-.2l67-15.41l.31-.08a8.6 8.6 0 0 1 6.3 15.9Z" /></g></svg>
                            </div>
                        </div>
                        <h2 className='text-lg font-semibold text-red-600'>Consultations en cardiologie</h2>
                        <p className='text-sm'>Évaluation complète et diagnostic précis pour prendre soin de votre cœur.</p>
                    </div>
                    <div className='text-center shadow-md rounded-md bg-gray-50 p-4 border group hover:bg-red-50 hover:border-red-200'>
                        <div className="flex mb-2 justify-center">
                            <div className="p-4 text-red-600 bg-red-100 group-hover:bg-red-600 group-hover:text-white rounded-full border border-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 48 48"><g fill="currentColor"><path d="m25 21.5l-1.5 5l1.5 2l1.5-2z" /><path fill-rule="evenodd" d="M34.001 17.633a17 17 0 0 1-2.606-1.614C29.852 14.846 28 12.949 28 10.449C28 8.221 29.684 6 32.188 6C33.35 6 34.29 6.464 35 7.157C35.709 6.464 36.65 6 37.813 6C40.316 6 42 8.223 42 10.448c0 2.423-1.861 4.323-3.389 5.503a18 18 0 0 1-2.61 1.667c.006 1.744.034 3.409.06 4.985c.06 3.455.11 6.484-.099 8.985c-.318 3.788-1.257 6.828-4.065 8.473c-2.761 1.617-6.841 2.225-10.22 1.814c-1.696-.206-3.315-.68-4.54-1.498c-.891-.595-1.598-1.396-1.93-2.4c-2.077-.095-4.143-.474-5.777-1.152c-1.765-.732-3.43-2-3.43-3.985V13.122h.003L6 13c0-2.761 4.477-5 10-5s10 2.239 10 5q0 .061-.003.122H26v5.949a7.001 7.001 0 0 1-.001 13.858c-.046 2.015-1.657 3.29-3.434 4.014c-1.47.598-3.28.928-5.13 1.026q.299.402.814.745c.87.582 2.15.991 3.67 1.176c3.051.371 6.667-.208 8.968-1.555c1.911-1.12 2.775-3.255 3.082-6.914c.201-2.402.152-5.262.095-8.638a358 358 0 0 1-.063-5.15M32.188 8C31.006 8 30 9.096 30 10.448c0 1.495 1.148 2.872 2.605 3.977a15 15 0 0 0 2.384 1.466q.195-.1.46-.249c.534-.299 1.24-.732 1.94-1.273C38.86 13.231 40 11.855 40 10.449C40 9.095 38.994 8 37.813 8c-.824 0-1.48.458-1.939 1.285L35 10.862l-.874-1.577C33.666 8.458 33.01 8 32.188 8M16 18c3.271 0 6.176-.785 8-2v3.07a7.001 7.001 0 0 0-.003 13.859c-.044.778-.673 1.545-2.186 2.161c-1.525.621-3.632.933-5.8.909a21 21 0 0 1-.92-.031V17.98q.45.02.909.02m8-5c0 .215-.226.948-1.823 1.747C20.699 15.485 18.518 16 16 16s-4.7-.515-6.177-1.253C8.226 13.948 8 13.215 8 13s.226-.948 1.823-1.747C11.301 10.515 13.482 10 16 10s4.7.515 6.177 1.253C23.774 12.052 24 12.785 24 13m1 18a5 5 0 1 0 0-10a5 5 0 0 0 0 10" clip-rule="evenodd" /></g></svg>
                            </div>
                        </div>
                        <h2 className='text-lg font-semibold text-red-600'>Examens spécialisés</h2>
                        <p className='text-sm'>Électrocardiogrammes (ECG), échocardiographies, tests d'effort et plus.</p>
                    </div>
                    <div className='text-center shadow-md rounded-md bg-gray-50 p-4 border group hover:bg-red-50 hover:border-red-200'>
                        <div className="flex mb-2 justify-center">
                            <div className="p-4 text-red-600 bg-red-100 group-hover:bg-red-600 group-hover:text-white rounded-full border border-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32"><path fill="currentColor" d="M23 23v3H8.5a4.5 4.5 0 0 1 0-9H9v-2h-.5a6.5 6.5 0 0 0 0 13H23v3h8v-8Zm6 6h-4v-4h4Z" /><path fill="currentColor" d="M21 22h-2v-3h-6v3h-2v-3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2zm-5-6a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3m0-4a1 1 0 1 0 1 1a1 1 0 0 0-1-1" /><path fill="currentColor" d="M23.5 4H9V1H1v8h8V6h14.5a4.5 4.5 0 0 1 0 9H23v2h.5a6.5 6.5 0 0 0 0-13M7 7H3V3h4Z" /></svg>
                            </div>
                        </div>
                        <h2 className='text-lg font-semibold text-red-600'>Prévention et réadaptation</h2>
                        <p className='text-sm'>Programmes personnalisés pour une vie saine et active.</p>
                    </div>
                </div>
                <div className='grid lg:grid-cols-2 items-center'>
                    <BarreLogo className='h-96 w-auto lg:block hidden' />
                    <div className='text-xl'>
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
                <div id='faq' className='mt-14 grid lg:grid-cols-2 gap-2'>
                    <FAQAccordion />
                    <div>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15913.85767879498!2d15.2778401!3d-4.3235119!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a310011d5fed5%3A0x42de32292b16f315!2sCardiofaith!5e0!3m2!1sfr!2scd!4v1733487890346!5m2!1sfr!2scd" className='w-full mt-4' height={450} style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
