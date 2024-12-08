import { AiOutlineClose } from "react-icons/ai";
import { FaEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { BiPlusMedical } from "react-icons/bi";
import { PageProps } from '@/types';
import { useEffect, useState } from 'react';
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
import AddCompteRendu from "./part/AddCompteRendu";
import FilterButtons from "@/Components/FilterButtons";
import TableLoader from "@/Components/TableLoader";


export default function Fiche({ auth, fiches, compteRendus }: PageProps<{ fiches: any, compteRendus: any }>) {
    const [view, setview] = useState(false);
    const [add, setadd] = useState(false);
    const [disable, setDisable] = useState(false);
    const [exporter, setexporter] = useState(false);
    const [edit, setedit] = useState(false);
    const [addCr, setaddCr] = useState(false);
    const [id, setid] = useState('');
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState<string>('today');
    const [loading, setLoading] = useState<boolean>(true);
    const [Fiches, setFiches] = useState<any | any[]>([]);
    const handleFilterClick = (filterValue: string) => {
        setFilter(filterValue);
    };

    function Show(p: any) {
        setview(true);
        setid(p)
    };

    function Edit(p: any) {
        setedit(true);
        setid(p)
    };

    function AddCR(p: any) {
        setaddCr(true);
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

    const fetchRdv = async () => {
        setLoading(true); // Start loading
        try {
            const response = await axios.get(route('fiches', currentPage), {
                params: {
                    filter: filter,
                    search: search,
                }
            });
            setFiches(response.data);

        } catch (error: any) {
            console.error('Erreur lors de la création de la visite:', error)
        } finally {
            setLoading(false); // End loading
        }
    };

    const closeModal = () => {
        setview(false);
        setedit(false);
        setaddCr(false);
        setadd(false);
        setexporter(false);
        setDisable(false);
        router.reload({ only: ['compteRendus'] })
        fetchRdv()
    };

    const DeleteFiche = () => {
        const etat = toast.loading("Chargement...")
        axios.get('/admin/fiches/delete/' + id)
            .then(() => {
                toast.update(etat, {
                    render: "Fiche supprimée",
                    type: toast.TYPE.SUCCESS,
                    autoClose: 3000,
                    isLoading: false
                });
                router.reload({ only: ['fiches'] })
                setDisable(false);
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

    useEffect(() => {
        fetchRdv();
    }, [filter, currentPage]);

    const handleSubmitSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        fetchRdv()
    };


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Fiches medicales</h2>}
        >
            <Head title="Fiches medicales" />

            <div className="py-12 px-4 container mx-auto">
                <div className="flex flex-wrap items-center justify-between md:px-4 mb-10">
                    <div>
                        <Modal show={add} onClose={closeModal}>
                            <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                            <AddFiche />
                        </Modal>
                        <span onClick={Add} className="p-4 cursor-pointer rounded-md bg-red-600 text-white mr-5 text-sm"> <BiPlusMedical className="inline-flex mr-2" />Ajouter une fiche</span>
                    </div>
                    <div>
                        <Modal show={exporter} onClose={closeModal}>
                            <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                            <ExportFiche />
                        </Modal>
                        <span onClick={Exporter} className="p-4 md:mt-0 mt-8 cursor-pointer rounded-md bg-green-600 text-white mr-5 text-sm"> <RiFileExcel2Line className="inline-flex text-2xl mr-2" />Exporter les données</span>
                    </div>
                    <div className='max-w-md w-full'>
                        <div className='flex items-center space-x-1'>
                            <div className="border w-full bg-white rounded-md py-2 border-gray-300 px-3">
                                <div className='flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" className='text-gray-500' height="20" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13M2 10.5a8.5 8.5 0 1 1 15.176 5.262l3.652 3.652a1 1 0 0 1-1.414 1.414l-3.652-3.652A8.5 8.5 0 0 1 2 10.5M9.5 7a1 1 0 0 1 1-1a4.5 4.5 0 0 1 4.5 4.5a1 1 0 1 1-2 0A2.5 2.5 0 0 0 10.5 8a1 1 0 0 1-1-1" /></g></svg>
                                    <input
                                        type="search"
                                        name="search"
                                        value={search}
                                        onChange={handleSearchChange}
                                        placeholder='Recherchez...'
                                        className="outline-none text-xs px-2 py-1 w-full bg-inherit border-0 ring-0 border-transparent focus:ring-0"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={handleSubmitSearch}
                                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13M2 10.5a8.5 8.5 0 1 1 15.176 5.262l3.652 3.652a1 1 0 0 1-1.414 1.414l-3.652-3.652A8.5 8.5 0 0 1 2 10.5M9.5 7a1 1 0 0 1 1-1a4.5 4.5 0 0 1 4.5 4.5a1 1 0 1 1-2 0A2.5 2.5 0 0 0 10.5 8a1 1 0 0 1-1-1" /></g></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" flex gap-2 justify-between flex-wrap items-center container mx-auto">
                    <div></div>
                    <FilterButtons filter={filter} handleFilterClick={handleFilterClick} />
                </div>
                <div className="mt-4">
                    <section className="container px-4 mx-auto">
                        {
                            loading ? (
                                <div className="mt-5">
                                    <TableLoader rows={15} columns={9} />
                                </div>
                            ) : (
                                <>
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
                                                                    Telephone
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
                                                            {Fiches.data?.map((fiche: any, index: any) => (
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
                                                                        {fiche.num_telephone}
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
                                                                        <span onClick={() => Show(fiche.id)} className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white mt-1 p-2 rounded-md text-sm">  <FaEye /></span>
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
                                                                                        <span className="col-span-4 font-semibold">Telephone </span> <span className="col-span-1">:</span> <span className="col-span-7">{fiche.num_telephone}</span>
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

                                                                        <span onClick={() => Edit(fiche.id)} className="bg-green-500 hover:bg-green-700 text-white mt-1 ml-1 p-2 rounded-md text-sm">   <FaRegEdit /></span>
                                                                        <Modal show={id == fiche.id ? edit : false} onClose={closeModal}>
                                                                            <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                                                                            <EditFiche edit={{
                                                                                'id': fiche.id,
                                                                                'nom': fiche.nom,
                                                                                'postnom': fiche.postnom,
                                                                                'prenom': fiche.prenom,
                                                                                'num_dossier': fiche.num_dossier,
                                                                                'num_telephone': fiche.num_telephone,
                                                                                'adresse': fiche.adresse,
                                                                                'situation_familliale': fiche.situation_familliale,
                                                                                'sexe': fiche.sexe,
                                                                                'lieu_naissance': fiche.lieu_naissance,
                                                                                'date_naissance': fiche.date_naissance,
                                                                                'nbr_enfants': fiche.nbr_enfants,
                                                                                'nbr_grosses': fiche.nbr_grosses,
                                                                                'num_secu': fiche.num_secu,
                                                                                'medecin_traitant': fiche.medecin_traitant,
                                                                                'poids': fiche.poids,
                                                                                'taille': fiche.taille,
                                                                                'groupe_saguin': fiche.groupe_saguin,
                                                                                'fumeur': fiche.fumeur,
                                                                                'nbr_cigarette': fiche.nbr_cigarette,
                                                                                'antecedents_familiaux': fiche.antecedents_familiaux,
                                                                                'antecedent_medicaux': fiche.antecedent_medicaux,
                                                                                'maladie_infatiles_contractees': fiche.maladie_infatiles_contractees,
                                                                                'allergies': fiche.allergies,
                                                                                'intolerance_medicamenteuse': fiche.intolerance_medicamenteuse,
                                                                                'traitement_regulier': fiche.traitement_regulier,
                                                                                'vaccin': fiche.vaccin,
                                                                            }} />
                                                                        </Modal>

                                                                        {
                                                                            auth.user.roles[0].name == "Administrateur" || auth.user.acces == 3 ?
                                                                                <>
                                                                                    <span onClick={() => AddCR(fiche.id)} className="bg-blue-500 hover:bg-blue-700 text-white mt-1 p-2 mx-1 rounded-md text-sm"><BiPlusMedical /></span>
                                                                                    <Modal show={id == fiche.id ? addCr : false} onClose={closeModal}>
                                                                                        <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                                                                                        <AddCompteRendu edit={{
                                                                                            'id': fiche.id,
                                                                                        }} />
                                                                                    </Modal>
                                                                                </> : ''
                                                                        }

                                                                        {
                                                                            auth.user.roles[0].name == "Administrateur" ?
                                                                                <>
                                                                                    <span onClick={() => Disable(fiche.id)} className="bg-red-600 cursor-pointer hover:bg-red-700 text-white mt-1 p-2 rounded-md text-sm">  <FaTrashAlt /></span>
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

                                </>
                            )}
                        <div className="w-full flex justify-center">
                            <div className="pagination flex justify-center items-center gap-2 mt-4">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 bg-red-600 text-white rounded-md text-sm disabled:opacity-50 flex"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className='mr-1' width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12t-.288.713T19 13z" /></svg>
                                    Précédent
                                </button>
                                <span className="text-sm">{`Page ${currentPage} of ${Fiches?.last_page}`}</span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === Fiches?.last_page}
                                    className="px-3 py-2 bg-red-600 text-white rounded-md text-sm disabled:opacity-50 flex"
                                >
                                    Suivant
                                    <svg xmlns="http://www.w3.org/2000/svg" className='ml-1' width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z" /></svg>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
