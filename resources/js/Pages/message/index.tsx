import { AiOutlineClose } from "react-icons/ai";
import { FaEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { BiPlusMedical } from "react-icons/bi";
import { PageProps } from '@/types';
import { useEffect, useState } from 'react';
import 'reactjs-popup/dist/index.css';
import Modal from '@/Components/Modal';
import AddMessage from './part/AddMessage';
import axios from "axios";
import { toast } from "react-toastify";
import DangerButton from "@/Components/DangerButton";
import dayjs from "dayjs";


export default function Message({ auth, messages }: PageProps<{ messages: [] }>) {
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
        router.reload({ only: ['messages'] })

    };

    const [Users, setUsers] = useState([]);


    useEffect(() => {
        users()
    }, [])

    const users = async () => {
        axios.get(route('user.all'))
            .then(results => {
                setUsers(results.data)
            })
    }

    const DeleteUser = () => {
        const etat = toast.loading("Chargement...")
        axios.get('/admin/messages/delete/' + id)
            .then(() => {
                toast.update(etat, {
                    render: "Message supprimé",
                    type: toast.TYPE.SUCCESS,
                    autoClose: 3000,
                    isLoading: false
                });
                setDisable(false);
                router.reload({ only: ['messages'] })

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
            header={<h2 className="font-semibold text-xl text-white leading-tight">Messages</h2>}
        >
            <Head title="Messages" />

            <div className="py-12 px-4">
                <div className="flex flex-wrap items-center justify-between md:px-4 mb-10">
                    <div>
                        <Modal show={add} onClose={closeModal}>
                            <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                            <AddMessage />
                        </Modal>
                        <span onClick={Add} className="p-4 cursor-pointer rounded-md bg-red-500 text-white mr-5 text-sm"> <BiPlusMedical className="inline-flex mr-2" />Envoyez un message</span>
                    </div>
                    <div className="max-w-xs w-full">
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" id="search-dropdown" className="bg-white border-0 md:mt-0 mt-8 text-sm rounded-full w-full h-12" placeholder="Recherche..." />
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
                                                        Date
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Employé
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Objet
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Message
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                        Options
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {messages.data.filter((message: any) => {
                                                    return (search.toLowerCase() === "" ? message :
                                                        message.objet.toLowerCase().includes(search))
                                                }).map((message: any, index: any) => (
                                                    <tr key={index}>
                                                        <td className="p-4 text-sm font-medium text-gray-700 whitespace-nowrap text-center">
                                                            {index + 1}
                                                        </td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">
                                                            {dayjs(new Date(message.created_at)).format("dddd, MMMM D, YYYY")}

                                                        </td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center uppercase font-bold">
                                                            {Users.map((user: any, index) => (
                                                                message.user_id == user.id ?
                                                                    user.name : ''

                                                            ))}
                                                        </td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap text-center">{message.objet}</td>
                                                        <td className="p-4 text-sm text-gray-700  text-center">
                                                            <div className="w-96 md:w-full p-4 text-sm text-gray-700 text-center capitalize ">
                                                                {message.message}
                                                            </div>
                                                        </td>


                                                        <td className="flex items-center justify-center px-2 h-full">
                                                            <span onClick={() => Disable(message.id)} className="bg-red-500 cursor-pointer hover:bg-red-700 text-white mt-1 p-2 rounded-md text-sm">  <FaTrashAlt /></span>
                                                            <Modal show={id == message.id ? disable : false} onClose={closeModal}>
                                                                <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                                                                <div className="w-full mt-6 px-6 py-4 bg-white overflow-hidden rounded-lg shadow-md">
                                                                    <h2 className="text-lg font-medium text-gray-900">
                                                                        Etês vous sûr de vouloir supprimer ce message?
                                                                    </h2>

                                                                    <div className="mt-6 flex justify-end">

                                                                        <DangerButton className="ml-3" onClick={DeleteUser}>
                                                                            Supprimer
                                                                        </DangerButton>

                                                                    </div>
                                                                </div>
                                                            </Modal>
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
                                {messages.links.map((link: { url: string; active: any; label: string; }) => (
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
