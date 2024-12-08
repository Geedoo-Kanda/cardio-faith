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
import FilterButtons from "@/Components/FilterButtons";
import TableLoader from "@/Components/TableLoader";


export default function Message({ auth, messages }: PageProps<{ messages: any }>) {
    const [add, setadd] = useState(false);
    const [id, setid] = useState('');
    const [disable, setDisable] = useState(false);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState<string>('today');
    const [loading, setLoading] = useState<boolean>(true);
    const [Messages, setMessages] = useState<any | any[]>([]);
    const handleFilterClick = (filterValue: string) => {
        setFilter(filterValue);
    };

    function Disable(p: any) {
        setDisable(true);
        setid(p)
    };
    const Add = () => {
        setadd(true);
    };

    const fetchRdv = async () => {
        setLoading(true); // Start loading
        try {
            const response = await axios.get(route('message', currentPage), {
                params: {
                    filter: filter,
                    search: search,
                }
            });
            setMessages(response.data);

        } catch (error: any) {
            console.error('Erreur lors de la création de la visite:', error)
        } finally {
            setLoading(false); // End loading
        }
    };

    const closeModal = () => {
        setadd(false);
        setDisable(false);
        fetchRdv()
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
                <div className="flex flex-wrap items-center justify-between md:px-4 mb-10 container mx-auto">
                    <div>
                        <Modal show={add} onClose={closeModal}>
                            <AiOutlineClose className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} />
                            <AddMessage />
                        </Modal>
                        <span onClick={Add} className="p-4 cursor-pointer rounded-md bg-red-600 text-white mr-5 text-sm"> <BiPlusMedical className="inline-flex mr-2" />Envoyez un message</span>
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
                <div>
                    <section className="container px-4 mx-auto mt-4">
                        {
                            loading ? (
                                <div className="mt-5">
                                    <TableLoader rows={15} columns={6} />
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
                                                                {
                                                                    auth.user.roles[0].name == "Administrateur" ?
                                                                        <th scope="col" className="px-4 py-3.5 text-sm text-center text-white font-bold">
                                                                            Options
                                                                        </th> : ''
                                                                }
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {Messages.data?.map((message: any, index: any) => (
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
                                                                    <td className="p-4 text-sm text-gray-700 text-center">{message.objet}</td>
                                                                    <td className="p-4 text-sm text-gray-700  text-center">
                                                                        <div className="w-96 md:w-full p-4 text-sm text-gray-700 text-center capitalize ">
                                                                            {message.message}
                                                                        </div>
                                                                    </td>
                                                                    {
                                                                        auth.user.roles[0].name == "Administrateur" ?
                                                                            <td className="flex items-center justify-center px-2 h-full">
                                                                                <span onClick={() => Disable(message.id)} className="bg-red-600 cursor-pointer hover:bg-red-700 text-white mt-1 p-2 rounded-md text-sm">  <FaTrashAlt /></span>
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
                                <span className="text-sm">{`Page ${currentPage} of ${Messages?.last_page}`}</span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === Messages?.last_page}
                                    className="px-3 py-2 bg-red-600 text-white rounded-md text-sm disabled:opacity-50 flex"
                                >
                                    Suivant
                                    <svg xmlns="http://www.w3.org/2000/svg" className='ml-1' width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z" /></svg>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div >
        </AuthenticatedLayout >
    );
}
