import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { AiFillDollarCircle, AiOutlineBarChart } from "react-icons/ai";


export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="mt-10">
                <section className="container px-4 mx-auto py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-3 lg:grid-cols-4 gap-4">
                        <div className="p-4">
                            <h2 className="font-bold text-4xl text-gray-900">Statistiques sur les status des <span className='text-red-500'>Rendez-vous</span></h2>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow-md">
                            <h2 className="font-bold text-xl text-gray-900"><AiOutlineBarChart className='inline-flex text-red-500 text-3xl' /> Tous les rendez-vous</h2>
                            <p className="text-3xl mt-8 font-semibold text-gray-600 mb-4 text-right">
                                50
                                <span className="text-sm rounded-md ml-2">
                                    Total
                                </span>
                            </p>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow-md">
                            <h2 className="font-bold text-xl text-gray-900"> <AiOutlineBarChart className='inline-flex text-red-500 text-3xl' /> Rendez-vous à venir</h2>
                            <p className="text-3xl mt-8 font-semibold text-gray-600 mb-4 text-right">
                                50
                                <span className="text-sm rounded-md ml-2">
                                    Total
                                </span>
                            </p>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow-md">
                            <h2 className="font-bold text-xl text-gray-900"><AiOutlineBarChart className='inline-flex text-red-500 text-3xl' /> Rendez-vous effectués</h2>
                            <p className="text-3xl mt-8 font-semibold text-gray-600 mb-4 text-right">
                                50
                                <span className="text-sm rounded-md ml-2">
                                    Total
                                </span>
                            </p>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow-md">
                            <h2 className="font-bold text-xl text-gray-900"><AiOutlineBarChart className='inline-flex text-red-500 text-3xl' /> Rendez-vous manqués</h2>
                            <p className="text-3xl mt-8 font-semibold text-gray-600 mb-4 text-right">
                                50
                                <span className="text-sm rounded-md ml-2">
                                    Total
                                </span>
                            </p>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow-md">
                            <h2 className="font-bold text-xl text-gray-900"> <AiOutlineBarChart className='inline-flex text-red-500 text-3xl' /> Rendez-vous annulés</h2>
                            <p className="text-3xl mt-8 font-semibold text-gray-600 mb-4 text-right">
                                50
                                <span className="text-sm rounded-md ml-2">
                                    Total
                                </span>
                            </p>
                        </div>
                        
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-3 lg:grid-cols-4 gap-4 mt-28">
                        <div className="p-4">
                            <h2 className="font-bold text-4xl text-gray-900">Statistiques sur les opérations à la <span className='text-red-500'>Caisse</span></h2>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow-md">
                            <h2 className="font-bold text-xl text-gray-900"><AiFillDollarCircle className='inline-flex text-red-500 text-3xl' /> Solde total</h2>
                            <p className="text-3xl mt-8 font-semibold text-gray-600 mb-4 text-right">
                                50
                                <span className="text-sm rounded-md ml-2">
                                    Dollar
                                </span>
                            </p>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow-md">
                            <h2 className="font-bold text-xl text-gray-900"> <AiFillDollarCircle className='inline-flex text-red-500 text-3xl' />Somme debiter</h2>
                            <p className="text-3xl mt-8 font-semibold text-gray-600 mb-4 text-right">
                                50
                                <span className="text-sm rounded-md ml-2">
                                    Dollar
                                </span>
                            </p>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow-md">
                            <h2 className="font-bold text-xl text-gray-900"><AiFillDollarCircle className='inline-flex text-red-500 text-3xl' /> Somme crediter</h2>
                            <p className="text-3xl mt-8 font-semibold text-gray-600 mb-4 text-right">
                                50
                                <span className="text-sm rounded-md ml-2">
                                    Dollar
                                </span>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
