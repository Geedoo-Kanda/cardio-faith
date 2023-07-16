import { AiOutlineClose } from "react-icons/ai";
import { FaEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { BiPlusMedical } from "react-icons/bi";
import { PageProps } from '@/types';
import { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import Modal from '@/Components/Modal';


export default function Rdv({ auth, data }: PageProps<{ data: [] }>) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const [search, setSearch] = useState("");

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Rendez-vous</h2>}
        >
            <Head title="Rendez vous" />

            <div className="py-12 px-4">
                <div className="flex flex-wrap items-center justify-between md:px-4 mb-10">
                    <div>
                        <Link href={route('rendez-vous.indexView')} className="p-4 rounded-md bg-red-500 text-white mr-5 text-sm"> <BiPlusMedical className="inline-flex mr-2" />Ajouter un rendez-vous</Link>
                    </div>
                    <div className="max-w-xs w-full">
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" id="search-dropdown" className="bg-white border-0 md:mt-0 mt-8 text-sm text-red-500 rounded-full w-full h-12" placeholder="Recherche..." />
                    </div>
                </div>

                <div className="flex items-center justify-end">
                    <div>
                        <Link href={route('rendez-vous.indexView')} className="p-3 rounded-sm bg-red-100 text-red-500 mr-1 text-xs">Hier</Link>
                    </div>
                    <div>
                        <Link href={route('rendez-vous.indexView')} className="p-3 rounded-sm bg-red-500 text-white mr-1 text-xs">Aujourd'hui</Link>
                    </div>
                    <div>
                        <Link href={route('rendez-vous.indexView')} className="p-3 rounded-sm bg-red-100 text-red-500 mr-1 text-xs">Demain</Link>
                    </div>
                    <div>
                        <Link href={route('rendez-vous.indexView')} className="p-3 rounded-sm bg-red-100 text-red-500 mr-1 text-xs">Cette semaine</Link>
                    </div>
                </div>

                <div className="mt-4">
                    <section className="container px-4 mx-auto">
                        <div className="flex flex-col">

                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300 ">
                                            <thead className="bg-gray-700">
                                                <tr>
                                                    <th scope="col" className="py-3.5 px-4 text-sm flex items-center justify-center text-center text-white font-bold">
                                                        <div className="flex items-center">
                                                            #
                                                        </div>
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Dates
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Noms complets
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Téléphones
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Objets
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Options
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                <tr>
                                                    <td className="p-4 text-sm font-medium text-gray-700 whitespace-nowrap text-center">
                                                        <div className="inline-flex items-center gap-x-3">
                                                            <input type="checkbox" className="text-blue-500 border-gray-500 rounded " />
                                                            <span>1</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">15/06/2023 à x12h 30</td>
                                                    <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center uppercase font-bold">Geedoo kanda</td>
                                                    <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">azertyui</td>
                                                    <td className="">
                                                        <div className="w-96 md:w-full p-4 text-sm text-gray-700 text-center capitalize ">
                                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore distinctio quisquam voluptas dolorum eaque, eius vitae, natus rem similique magnam veritatis deserunt ad obcaecati dolore mollitia laborum assumenda tempore omnis.
                                                        </div>
                                                    </td>

                                                    <td className="flex items-center justify-center px-2 h-full">
                                                        <span onClick={confirmUserDeletion} className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white mt-1 p-2 rounded-md text-sm">  <FaEye /></span>
                                                        <Modal show={confirmingUserDeletion} onClose={closeModal}>
                                                            <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                                                            <div className="p-5 mt-4 ">
                                                                <h2 className="text-2xl font-bold text-gray-800 text-center w-full border-b-2 mb-4 pb-2">Détails du rendez-vous</h2>
                                                                <div className="grid grid-cols-12 gap-4 text-gray-700 text-md h-96 overflow-hidden overflow-y-scroll">
                                                                    <span className="col-span-4 font-semibold">Nom</span> <span className="col-span-1">:</span> <span className="col-span-7">Kanda</span>
                                                                    <span className="col-span-4 font-semibold">Postnom </span> <span className="col-span-1">:</span> <span className="col-span-7">Geddoo</span>
                                                                    <span className="col-span-4 font-semibold">Prenom </span> <span className="col-span-1">:</span> <span className="col-span-7">Heritier</span>
                                                                    <span className="col-span-4 font-semibold">Numéro de téléphone </span> <span className="col-span-1">:</span> <span className="col-span-7">(+244) 810 190 567</span>
                                                                    <span className="col-span-4 font-semibold">Sexe </span> <span className="col-span-1">:</span> <span className="col-span-7">M</span>
                                                                    <span className="col-span-4 font-semibold">email </span> <span className="col-span-1">:</span> <span className="col-span-7">geedookanda06@gmail.com</span>
                                                                    <span className="col-span-4 font-semibold">Date </span> <span className="col-span-1">:</span> <span className="col-span-7">16/07/2024 à 14h 40</span>
                                                                    <span className="col-span-4 font-semibold">Status </span> <span className="col-span-1">:</span> <span className="col-span-7">En entente</span>
                                                                    <span className="col-span-4 font-semibold">Objet </span> <span className="col-span-1">:</span> <span className="col-span-7 text-justify mr-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum vel voluptatibus nisi ullam eius ipsam consequuntur nesciunt. Sunt corrupti error laborum ipsa, soluta atque. Itaque aut eius voluptates alias illo?</span>
                                                                </div>
                                                            </div>
                                                        </Modal>
                                                        <Link href={`/datacy/edit/`} className="bg-green-500 hover:bg-green-700 text-white mt-1 p-2 mx-1 rounded-md text-sm">  <FaRegEdit /></Link>
                                                        <Link href={`/product/product/`} className="bg-red-500 hover:bg-red-700 text-white mt-1 p-2 rounded-md text-sm">  <FaTrashAlt /></Link>
                                                    </td>
                                                </tr>
                                               
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <a href="#" className="flex items-center px-5 py-2 text-sm text-white capitalize transition-colors duration-200 border rounded-md gap-x-2 bg-gray-900  hover:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>

                                <span>
                                    previous
                                </span>
                            </a>

                            <div className="items-center hidden md:flex gap-x-3">
                                <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-300 bg-blue-100/60">1</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-600 rounded-md hover:bg-blue-100/60">2</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-600 rounded-md hover:bg-blue-100/60">3</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-600 rounded-md hover:bg-blue-100/60">...</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-600 rounded-md hover:bg-blue-100/60">12</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-600 rounded-md hover:bg-blue-100/60">13</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-600 rounded-md hover:bg-blue-100/60">14</a>
                            </div>

                            <a href="#" className="flex items-center px-5 py-2 text-sm text-white capitalize transition-colors duration-200 border rounded-md gap-x-2 bg-gray-900  hover:bg-gray-800">
                                <span>
                                    Next
                                </span>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
