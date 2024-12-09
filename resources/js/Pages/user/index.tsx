import { AiOutlineClose } from "react-icons/ai";
import { FaEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { BiPlusMedical } from "react-icons/bi";
import { PageProps } from '@/types';
import { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import Modal from '@/Components/Modal';
import AddUser from './part/AddUser';
import axios from "axios";
import { toast } from "react-toastify";
import DangerButton from "@/Components/DangerButton";


export default function User({ auth, users }: PageProps<{ users: any }>) {
    const [add, setadd] = useState(false);
    const [id, setid] = useState('');
    const [disable, setDisable] = useState(false);
    const [search, setSearch] = useState("");

    function Disable(p: any) {
        setDisable(true);
        setid(p)
    };
    const Add = () => {
        setadd(true);
    };

    const closeModal = () => {
        setadd(false);
        setDisable(false);
        router.reload({ only: ['users'] })
    };

    const DeleteUser = () => {
        const etat = toast.loading("Chargement...")
        axios.get('/admin/users/delete/' + id)
            .then(() => {
                toast.update(etat, {
                    render: "Rendez-vous supprimé",
                    type: toast.TYPE.SUCCESS,
                    autoClose: 3000,
                    isLoading: false
                });
                setDisable(false);
                router.reload({ only: ['users'] })

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
            header={<h2 className="font-semibold text-xl text-white leading-tight">Agents</h2>}
        >
            <Head title="Agents" />

            <div className="py-12 px-4">
                <div className="flex flex-wrap items-center justify-between md:px-4 mb-10 container mx-auto">
                    <div>
                        <Modal show={add} onClose={closeModal}>
                            <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                            <AddUser />
                        </Modal>
                        <span onClick={Add} className="p-4 cursor-pointer rounded-md bg-red-600 text-white mr-5 text-sm"> <BiPlusMedical className="inline-flex mr-2" />Ajouter un utilisateur</span>
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
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder='Recherchez...'
                                        className="outline-none text-xs px-2 py-1 w-full bg-inherit border-0 ring-0 border-transparent focus:ring-0"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    // onClick={handleSubmitSearch}
                                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13M2 10.5a8.5 8.5 0 1 1 15.176 5.262l3.652 3.652a1 1 0 0 1-1.414 1.414l-3.652-3.652A8.5 8.5 0 0 1 2 10.5M9.5 7a1 1 0 0 1 1-1a4.5 4.5 0 0 1 4.5 4.5a1 1 0 1 1-2 0A2.5 2.5 0 0 0 10.5 8a1 1 0 0 1-1-1" /></g></svg>
                                </button>
                            </div>
                        </div>
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
                                                        Noms complets
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Téléphones
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Adresse
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Email
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Fonction
                                                    </th>
                                                    {
                                                        auth.user.roles[0].name == "Administrateur" ?
                                                            <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                                Options
                                                            </th> : ''
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {users.data.filter((user: any) => {
                                                    return (search.toLowerCase() === "" ? user :
                                                        user.name.toLowerCase().includes(search))
                                                }).map((user: any, index: any) => (
                                                    <tr key={index}>
                                                        <td className="p-4 text-sm font-medium text-gray-700 whitespace-nowrap text-center">
                                                            {index + 1}
                                                        </td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center uppercase font-bold">{user.name}</td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">{user.phone}</td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">{user.adresse}</td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">{user.email}</td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">
                                                            {
                                                                user.roles[0].name
                                                            }
                                                        </td>
                                                        {
                                                            auth.user.roles[0].name == "Administrateur" ?
                                                                <td className="flex items-center justify-center px-2 h-full">
                                                                    <span onClick={() => Disable(user.id)} className="bg-red-600 cursor-pointer hover:bg-red-700 text-white mt-1 p-2 rounded-md text-sm">  <FaTrashAlt /></span>
                                                                    <Modal show={id == user.id ? disable : false} onClose={closeModal}>
                                                                        <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                                                                        <div className="w-full mt-6 px-6 py-4 bg-white overflow-hidden rounded-lg shadow-md">
                                                                            <h2 className="text-lg font-medium text-gray-900">
                                                                                Etês vous sûr de vouloir supprimer cet utilisateur?
                                                                            </h2>

                                                                            <div className="mt-6 flex justify-end">

                                                                                <DangerButton className="ml-3" onClick={DeleteUser}>
                                                                                    Supprimer
                                                                                </DangerButton>

                                                                            </div>
                                                                        </div>
                                                                    </Modal>
                                                                </td> : ''
                                                        }
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
                                {users.links.map((link: { url: string; active: any; label: string; }) => (
                                    <Link
                                        key={link.url}
                                        href={link.url}
                                        className={link.active ? 'text-white bg-red-600 py-2 px-3 rounded-sm' : 'text-gray-800 py-2 px-3 m-2 rounded-sm bg-gray-50'}
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
