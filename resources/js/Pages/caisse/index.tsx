import { AiOutlineClose } from "react-icons/ai";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { BiPlusMedical } from "react-icons/bi";
import { PageProps } from '@/types';
import { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import Modal from '@/Components/Modal';
import AddCaiise from "./part/AddCaisse";
import { FaTrashAlt } from "react-icons/fa";
import RemoveCaisse from "./part/RevomeCaisse";


export default function Caiise({ auth, data }: PageProps<{ data: [] }>) {
    const [add, setadd] = useState(false);
    const [disable, setDisable] = useState(false);
    const [search, setSearch] = useState("");

    const Add = () => {
        setadd(true);
    };

    const Disable = () => {
        setDisable(true);
    };


    const closeModal = () => {
        setadd(false);
        setDisable(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Caisse</h2>}
        >
            <Head title="Caisse" />

            <div className="py-12 px-4">
                <div className="flex flex-wrap items-center justify-between md:px-4 mb-10">
                <div>
                        <Modal show={add} onClose={closeModal}>
                            <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                            <AddCaiise />
                        </Modal>
                        <span onClick={Add} className="p-4 cursor-pointer rounded-md bg-red-500 text-white mr-5 text-sm"> <BiPlusMedical className="inline-flex mr-2" />Ajouter une opération</span>
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
                                                        Employé
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Operation
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Devise
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Montant
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        solde
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Libele
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
                                                    <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">15/06/2023 à 12h 30</td>
                                                    <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center uppercase font-bold">Geedoo kanda</td>
                                                    <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">Retrait</td>
                                                    <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">USD</td>
                                                    <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">50 000</td>
                                                    <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">186 000</td>
                                                    <td className="">
                                                        <div className="w-96 md:w-full p-4 text-sm text-gray-700 text-center capitalize ">
                                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore distinctio quisquam voluptas dolorum eaque, eius vitae, natus rem similique magnam veritatis deserunt ad obcaecati dolore mollitia laborum assumenda tempore omnis.
                                                        </div>
                                                    </td>

                                                    <td className="flex items-center justify-center px-2 h-full">
                                                    <span onClick={Disable} className="bg-red-500 ml-2 cursor-pointer hover:bg-red-700 text-white mt-1 p-2 rounded-md text-sm">  <FaTrashAlt /></span>
                                                        <Modal show={disable} onClose={closeModal}>
                                                            <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                                                            <RemoveCaisse />
                                                        </Modal>
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
