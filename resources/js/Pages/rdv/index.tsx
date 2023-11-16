import { RiFileExcel2Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { FaEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { BiPlusMedical } from "react-icons/bi";
import { PageProps } from '@/types';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import AddRdv from './part/AddRdv';
import EditRdv from "./part/EditRdv";
import axios from "axios";
import DangerButton from "@/Components/DangerButton";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import ExportRdv from "./part/ExportRdv";


export default function Rdv({ auth, rdvs }: PageProps<{ rdvs: any }>) {
    const [view, setview] = useState(false);
    const [add, setadd] = useState(false);
    const [exporter, setexporter] = useState(false);
    const [id, setid] = useState('');
    const [edit, setedit] = useState(false);
    const [disable, setDisable] = useState(false);
    const [search, setSearch] = useState("");

    function Show(p: any) {
        setview(true);
        setid(p)
    };
    function Edit(p: any) {
        setedit(true);
        setid(p)
    };
    function Disable(p: any) {
        setDisable(true);
        setid(p)
    };
    const Add = () => {
        setadd(true);
    };

    const Exporter = () => {
        setexporter(true);
    };

    const closeModal = () => {
        setview(false);
        setadd(false);
        setexporter(false);
        setedit(false);
        setDisable(false);
        router.reload({ only: ['rdvs'] })
    };

    const DeleteRdv = () => {
        const etat = toast.loading("Chargement...")
        axios.get('/admin/rendez-vous/delete/' + id)
            .then(() => {
                toast.update(etat, {
                    render: "Rendez-vous supprimé",
                    type: toast.TYPE.SUCCESS,
                    autoClose: 3000,
                    isLoading: false
                });
                setDisable(false);
                router.reload({ only: ['rdvs'] })

            }).catch(() => {
                toast.update(etat, {
                    render: "Oups, veillez récommencer",
                    type: toast.TYPE.ERROR,
                    autoClose: 3000,
                    isLoading: false
                });
            }
            )
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Rendez-vous</h2>}
        >
            <Head title="Rendez vous" />

            <div className="py-12 px-4">
                <div className="flex flex-wrap items-center justify-between md:px-4 mb-10">
                    <div>
                        <Modal show={add} onClose={closeModal}>
                            <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                            <AddRdv />
                        </Modal>
                        <span onClick={Add} className="p-4 cursor-pointer rounded-md bg-red-500 text-white mr-5 text-sm"> <BiPlusMedical className="inline-flex mr-2" />Ajouter un rendez-vous</span>
                    </div>
                    <div>
                        <Modal show={exporter} onClose={closeModal}>
                            <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                            <ExportRdv />
                        </Modal>
                        <span onClick={Exporter} className="p-4 md:mt-0 mt-8 cursor-pointer rounded-md bg-green-600 text-white mr-5 text-sm"> <RiFileExcel2Line className="inline-flex text-2xl mr-2" />Exporter les données</span>
                    </div>
                    <div className="max-w-xs w-full">
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" id="search-dropdown" className="bg-white border-0 md:mt-0 mt-8 text-sm rounded-full w-full h-12" placeholder="Recherche le nom..." />
                    </div>
                </div>

                <div className="flex items-center justify-end">
                <div>
                        <Link href={route('rendez-vous.indexView')} className={`p-3 rounded-sm ${location.pathname =='/admin/rendez-vous/liste' ? 'bg-red-500 text-white' : 'bg-white text-red-500' }  mr-1 text-xs`}>Tous</Link>
                    </div>
                    <div>
                        <Link href={route('rendez-vous.today')} className={`p-3 rounded-sm ${location.pathname == '/admin/rendez-vous/today' ? 'bg-red-500 text-white' : 'bg-white text-red-500' }  mr-1 text-xs`}>Aujourd'hui</Link>
                    </div>
                    <div>
                        <Link href={route('rendez-vous.tomorrow')} className={`p-3 rounded-sm ${location.pathname == '/admin/rendez-vous/tomorrow' ? 'bg-red-500 text-white' : 'bg-white text-red-500' }  mr-1 text-xs`}>Demain</Link>
                    </div> 
                </div>

                <div>
                    <section className="container px-4 mx-auto mt-4">
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
                                                        Status
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
                                                {rdvs.data.filter((rdv: any) => {
                                                    return (search.toLowerCase() === "" ? rdv :
                                                        rdv.nom.toLowerCase().includes(search.toLowerCase()))
                                                }).map((rdv: any, index: any) => (
                                                    <tr key={index}>
                                                        <td className="p-4 text-sm font-medium text-gray-700 whitespace-nowrap text-center">
                                                            {index + 1}
                                                        </td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">
                                                            {dayjs(new Date(rdv.date)).format("dddd, MMMM D, YYYY")}
                                                        </td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center uppercase font-bold">{rdv.nom} {rdv.postnom} {rdv.prenom}</td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">{rdv.phone}</td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center font-semibold capitalize">
                                                            {
                                                                rdv.status == "A venir" ?
                                                                    <span className="bg-blue-50 text-blue-500 p-3">{rdv.status}</span> :
                                                                    rdv.status == "effectue" ?
                                                                        <span className="bg-green-50 text-green-500 p-3">{rdv.status}</span> :
                                                                        rdv.status == "annule" ?
                                                                            <span className="bg-red-50 text-red-500 p-3">{rdv.status}</span> :
                                                                            rdv.status == "repporte" ?
                                                                                <span className="bg-blue-50 text-blue-500 p-3">{rdv.status}</span> : ''
                                                            }
                                                        </td>
                                                        <td className="">
                                                            <div className="w-96 md:w-full p-4 text-sm text-gray-700 text-center capitalize ">
                                                                {rdv.objet}
                                                            </div>
                                                        </td>

                                                        <td className="flex items-center justify-center px-2 h-full">
                                                            <span onClick={() => Show(rdv.id)} className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white mt-1 p-2 rounded-md text-sm">  <FaEye /></span>
                                                            <Modal show={id == rdv.id ? view : false} onClose={closeModal}>
                                                                <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                                                                <div className="p-5 mt-4 ">
                                                                    <h2 className="text-2xl font-bold text-gray-800 text-center w-full border-b-2 mb-4 pb-2">Détails du rendez-vous</h2>
                                                                    <div className="grid grid-cols-12 gap-4 text-gray-700 text-md h-96 overflow-hidden overflow-y-scroll">
                                                                        <span className="col-span-4 font-semibold">Nom</span> <span className="col-span-1">:</span> <span className="col-span-7 capitalize">{rdv.nom}</span>
                                                                        <span className="col-span-4 font-semibold">Postnom </span> <span className="col-span-1">:</span> <span className="col-span-7 capitalize">{rdv.postnom}</span>
                                                                        <span className="col-span-4 font-semibold">Prenom </span> <span className="col-span-1">:</span> <span className="col-span-7 capitalize">{rdv.prenom}</span>
                                                                        <span className="col-span-4 font-semibold">Numéro de téléphone </span> <span className="col-span-1">:</span> <span className="col-span-7">{rdv.phone}</span>
                                                                        <span className="col-span-4 font-semibold">Sexe </span> <span className="col-span-1">:</span> <span className="col-span-7">{rdv.sexe}</span>
                                                                        <span className="col-span-4 font-semibold">email </span> <span className="col-span-1">:</span> <span className="col-span-7">{rdv.email}</span>
                                                                        <span className="col-span-4 font-semibold">Date </span> <span className="col-span-1">:</span> <span className="col-span-7">{rdv.date}</span>
                                                                        <span className="col-span-4 font-semibold">Status </span> <span className="col-span-1">:</span> <span className="col-span-7"><span className="bg-red-100 text-red-500 p-3">{rdv.status}</span></span>
                                                                        <span className="col-span-4 font-semibold">Objet </span> <span className="col-span-1">:</span> <span className="col-span-7 text-justify mr-1">{rdv.objet}</span>
                                                                    </div>
                                                                </div>
                                                            </Modal>

                                                            <span onClick={() => Edit(rdv.id)} className="bg-green-500 hover:bg-green-700 text-white mt-1 p-2 mx-1 rounded-md text-sm">  <FaRegEdit /></span>
                                                            <Modal show={id == rdv.id ? edit : false} onClose={closeModal}>
                                                                <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                                                                <EditRdv edit={{
                                                                    'id': rdv.id,
                                                                    'status': rdv.status,
                                                                }} />
                                                            </Modal>

                                                            {
                                                                auth.user.acces == 1 ?
                                                                    <>
                                                                        <span onClick={() => Disable(rdv.id)} className="bg-red-500 cursor-pointer hover:bg-red-700 text-white mt-1 p-2 rounded-md text-sm">  <FaTrashAlt /></span>
                                                                        <Modal show={id == rdv.id ? disable : false} onClose={closeModal}>
                                                                            <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                                                                            <div className="w-full mt-6 px-6 py-4 bg-white overflow-hidden rounded-lg shadow-md">
                                                                                <h2 className="text-lg font-medium text-gray-900">
                                                                                    Etês vous sûr de vouloir supprimer ce rende-vousz?
                                                                                </h2>

                                                                                <div className="mt-6 flex justify-end">

                                                                                    <DangerButton className="ml-3" onClick={DeleteRdv}>
                                                                                        Supprimer
                                                                                    </DangerButton>

                                                                                </div>
                                                                            </div>
                                                                        </Modal></> : ''
                                                            }
                                                        </td>
                                                    </tr>

                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <nav className='mt-8'>
                                {rdvs.links.map((link: { url: string; active: any; label: string; }) => (
                                    <Link
                                        key={link.url}
                                        href={link.url}
                                        className={link.active ? 'text-white bg-red-500 py-2 px-3 rounded-sm' : 'text-gray-800 py-2 px-3 m-2 rounded-sm bg-gray-50'}
                                    >
                                        <span>
                                            {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                                        </span>

                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </section>
                </div>
            </div >
        </AuthenticatedLayout >
    );
}
