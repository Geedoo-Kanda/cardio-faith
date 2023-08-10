import { AiOutlineClose } from "react-icons/ai";
import { FaEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { BiPlusMedical } from "react-icons/bi";
import { PageProps } from '@/types';
import { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import Modal from '@/Components/Modal';
import AddFiche from "./part/AddFiche";
import dayjs from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";
import DangerButton from "@/Components/DangerButton";
import { RiFileExcel2Line } from "react-icons/ri";
import ExportFiche from "./part/ExportFiche";
import EditFiche from "./part/EditFiche";


export default function Fiche({ auth, fiches, compteRendus }: PageProps<{ fiches: any, compteRendus: any }>) {
    const [view, setview] = useState(false);
    const [add, setadd] = useState(false);
    const [disable, setDisable] = useState(false);
    const [exporter, setexporter] = useState(false);
    const [edit, setedit] = useState(false);
    const [id, setid] = useState('');
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
        setedit(false);
        setadd(false);
        setexporter(false);
        setDisable(false);
        router.reload({ only: ['fiches', 'compteRendus'] })
    };

    const DeleteFiche = () => {
        const etat = toast.loading("Chargement...")
        axios.get('/admin/fiche/delete/' + id)
            .then(() => {
                toast.update(etat, {
                    render: "Fiche supprimée",
                    type: toast.TYPE.SUCCESS,
                    autoClose: 3000,
                    isLoading: false
                });
                setDisable(false);
                router.reload({ only: ['fiches'] })

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
            header={<h2 className="font-semibold text-xl text-white leading-tight">Fiches medicales</h2>}
        >
            <Head title="Fiches medicales" />

            <div className="py-12 px-4">
                <div className="flex flex-wrap items-center justify-between md:px-4 mb-10">
                    <div>
                        <Modal show={add} onClose={closeModal}>
                            <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                            <AddFiche />
                        </Modal>
                        <span onClick={Add} className="p-4 cursor-pointer rounded-md bg-red-500 text-white mr-5 text-sm"> <BiPlusMedical className="inline-flex mr-2" />Ajouter une fiche</span>
                    </div>
                    <div>
                        <Modal show={exporter} onClose={closeModal}>
                            <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                            <ExportFiche />
                        </Modal>
                        <span onClick={Exporter} className="p-4 md:mt-0 mt-8 cursor-pointer rounded-md bg-green-600 text-white mr-5 text-sm"> <RiFileExcel2Line className="inline-flex text-2xl mr-2" />Exporter les données</span>
                    </div>
                    <div className="max-w-xs w-full">
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" id="search-dropdown" className="bg-white border-0 md:mt-0 mt-8 text-sm rounded-full w-full h-12" placeholder="Recherche..." />
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
                                                        Sexe
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Lieu et date de naissance
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Adresse
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Situation familliale
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Options
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {fiches.data.filter((fiche: any) => {
                                                    return (search.toLowerCase() === "" ? fiche :
                                                        fiche.nom.toLowerCase().includes(search))
                                                }).map((fiche: any, index: any) => (
                                                    <tr key={index}>
                                                        <td className="p-4 text-sm font-medium text-gray-700 whitespace-nowrap text-center">
                                                            {index + 1}
                                                        </td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">
                                                            {dayjs(new Date(fiche.created_at)).format("DD/MM/YYYY")}
                                                        </td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center uppercase font-bold">
                                                            {fiche.nom} {fiche.postnom} {fiche.prenom}
                                                        </td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">
                                                            {fiche.sexe}
                                                        </td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">
                                                            {fiche.lieu_naissance},  {dayjs(new Date(fiche.date_naissance)).format(" le DD-MM-YYYY")}
                                                        </td>
                                                        <td className="p-4 text-sm text-gray-700 text-center">
                                                            {fiche.adresse}
                                                        </td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">
                                                            {fiche.situation_familliale}
                                                        </td>

                                                        <td className="flex items-center justify-center px-2 h-full">
                                                            <span onClick={() => Show(fiche.id)} className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white mt-1 p-2 rounded-md text-sm mr-2">  <FaEye /></span>
                                                            <Modal show={id == fiche.id ? view : false} onClose={closeModal}>
                                                                <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                                                                <div className="p-5 mt-4 ">
                                                                    <h2 className="text-2xl font-bold text-gray-800 text-center w-full border-b-2 mb-4 pb-2">Détails du patient</h2>
                                                                    <div className=" text-gray-700 text-md h-96 overflow-hidden overflow-y-scroll">
                                                                        <h3 className="font-bold text-lg text-red-500 mb-3">1. Coordonnées</h3>
                                                                        <div className="grid grid-cols-12 gap-4">
                                                                            <span className="col-span-4 font-semibold">Nom</span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.nom}</span>
                                                                            <span className="col-span-4 font-semibold">Postnom </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.postnom}</span>
                                                                            <span className="col-span-4 font-semibold">Prenom </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.prenom}</span>
                                                                            <span className="col-span-4 font-semibold">Lieu et date de naissance </span> <span className="col-span-1">:</span> <span className="col-span-7">
                                                                                {fiche.lieu_naissance},  {dayjs(new Date(fiche.date_naissance)).format(" le DD-MM-YYYY")}
                                                                            </span>
                                                                            <span className="col-span-4 font-semibold">Sexe </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.sexe}</span>
                                                                            <span className="col-span-4 font-semibold">Adresse </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.adresse}</span>
                                                                            <span className="col-span-4 font-semibold">situation familliale </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.situation_familliale}</span>
                                                                            <span className="col-span-4 font-semibold">Nombre d'enfant/s </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.nbr_enfants}</span>
                                                                            <span className="col-span-4 font-semibold">Nombre de grossesse/s </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.nbr_grosses}</span>
                                                                            <span className="col-span-4 font-semibold">N° de Sécu </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.num_secu}</span>
                                                                            <span className="col-span-4 font-semibold">Taille </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.taille}</span>
                                                                            <span className="col-span-4 font-semibold">Poids</span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.poids}</span>
                                                                            <span className="col-span-4 font-semibold">Groupe sanguin </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.groupe_saguin}</span>
                                                                            <span className="col-span-4 font-semibold">Fumeur </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.fumeur},
                                                                                {
                                                                                    fiche.fumeur === 'Oui' ?
                                                                                        fiche.nbr_cigarette + 'cigarettes/jour' : ''
                                                                                }
                                                                            </span>

                                                                        </div>
                                                                        <h3 className="font-bold text-lg text-red-500 mb-3 mt-8">2. Antécédents</h3>
                                                                        <div className="grid grid-cols-12 gap-4">
                                                                            <span className="col-span-4 font-semibold">Antécédents familiaux </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.antecedents_familiaux}</span>
                                                                            <span className="col-span-4 font-semibold">Maladie infantiles contractées </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.maladie_infatiles_contractees}</span>
                                                                            <span className="col-span-4 font-semibold">Antécédents médicaux </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.antecedent_medicaux}</span>
                                                                            <span className="col-span-4 font-semibold">Alergies </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.allergies}</span>
                                                                            <span className="col-span-4 font-semibold">Intolérance médicamenteuse </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.intolerance_medicamenteuse}</span>
                                                                            <span className="col-span-4 font-semibold">Traitement régulier </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.traitement_regulier}</span>
                                                                            <span className="col-span-4 font-semibold">Vaccins </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.vaccin}</span>
                                                                        </div>

                                                                        <h3 className="font-bold text-lg text-red-500 mb-3 mt-8">3. Compte rendu</h3>
                                                                        <div className="text-justify mr-2">
                                                                            {compteRendus.map((compteRendu: any, index: any) => (
                                                                                compteRendu.fiche_id == fiche.id ?
                                                                                    <>
                                                                                        <b className="text-gray-600 font-bold mb-2">{dayjs(new Date(fiche.created_at)).format("DD-MM-YYYY")}</b>
                                                                                        <p className="mb-4">{compteRendu.description}</p>
                                                                                    </>
                                                                                    : ''
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Modal>
                                                            {
                                                                auth.user.acces == 1 || auth.user.acces == 3 ?
                                                                    <>
                                                                        <span onClick={() => Edit(fiche.id)} className="bg-green-500 hover:bg-green-700 text-white mt-1 p-2 mx-1 rounded-md text-sm">  <FaRegEdit /></span>
                                                                        <Modal show={id == fiche.id ? edit : false} onClose={closeModal}>
                                                                            <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                                                                            <EditFiche edit={{
                                                                                'id': fiche.id,
                                                                            }} />
                                                                        </Modal>
                                                                    </> : ''
                                                            }
                                                            {
                                                                auth.user.acces == 1 ?
                                                                    <>
                                                                        <span onClick={() => Disable(fiche.id)} className="bg-red-500 cursor-pointer hover:bg-red-700 text-white mt-1 p-2 rounded-md text-sm">  <FaTrashAlt /></span>
                                                                        <Modal show={id == fiche.id ? disable : false} onClose={closeModal}>
                                                                            <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                                                                            <div className="w-full mt-6 px-6 py-4 bg-white overflow-hidden rounded-lg shadow-md">
                                                                                <h2 className="text-lg font-medium text-gray-900">
                                                                                    Etês vous sûr de vouloir supprimer cette fiche?
                                                                                </h2>

                                                                                <div className="mt-6 flex justify-end">

                                                                                    <DangerButton className="ml-3" onClick={DeleteFiche}>
                                                                                        Supprimer
                                                                                    </DangerButton>

                                                                                </div>
                                                                            </div>
                                                                        </Modal>
                                                                    </> : ''
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
                                {fiches.links.map((link: { url: string; active: any; label: string; }) => (
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
            </div>
        </AuthenticatedLayout>
    );
}
