import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { AiFillDollarCircle, AiOutlineBarChart } from "react-icons/ai";
import YearlyLineChartByRdv from '@/Components/YearlyLineChartByRdv';
import { useEffect, useState } from 'react';
import axios from 'axios';
import YearlyLineChartByCaisse from '@/Components/YearlyLineChartByCaisse';


export default function Dashboard({ auth, rdv_venir, rdv_annule, rdv_effectue, rdv_repporte, depot, retrait, solde }: PageProps<{ depot: number, retrait: number, solde: number, rdv_venir: number, rdv_annule: number, rdv_effectue: number, rdv_repporte: number }>) {
    const date = new Date();
    const anneeActuelle = date.getFullYear();
    const [selectedYear, setSelectedYear] = useState(anneeActuelle);
    const [years, setYears] = useState([]);
    const [rdvCountByMonth, setRdvCountByMonth] = useState([]);
    const [caisseCountByMonth, setCaisseCountByMonth] = useState([]);

    function formatNombre(nombreString: any) {
        const nombre = parseFloat(nombreString);

        if (isNaN(nombre)) {
            return "Invalid number";
        }

        if (nombre >= 1000000000) {
            return (nombre / 1000000000).toFixed(2) + ' B';
        } else if (nombre >= 1000000) {
            return (nombre / 1000000).toFixed(2) + ' M';
        } else {
            return nombre
        }
    }

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const response = await axios.get(route('rendez-vous.countByMonth', selectedYear))
                setRdvCountByMonth(response.data)

                const res = await axios.get(route('caisse.countByMonth', selectedYear))
                setCaisseCountByMonth(res.data)
            } catch (error) {
                console.error('Failed to fetch sieges:', error);
            }
        };

        fetchCounts();
    }, [selectedYear]);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const response = await axios.get(route('rendez-vous.getAllYears'))
                setYears(response.data)
            } catch (error) {
                console.error('Failed to fetch sieges:', error);
            }
        };

        fetchCounts();
    }, []);

    const handleYearChange = (event: { target: { value: any; }; }) => {
        setSelectedYear(Number(event.target.value));
    };

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
                                {formatNombre(rdv_annule + rdv_effectue + rdv_repporte + rdv_venir)}
                                <span className="text-sm rounded-md ml-2">
                                    Total
                                </span>
                            </p>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow-md">
                            <h2 className="font-bold text-xl text-gray-900"> <AiOutlineBarChart className='inline-flex text-red-500 text-3xl' /> Rendez-vous à venir</h2>
                            <p className="text-3xl mt-8 font-semibold text-gray-600 mb-4 text-right">
                                {formatNombre(rdv_venir)}
                                <span className="text-sm rounded-md ml-2">
                                    Total
                                </span>
                            </p>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow-md">
                            <h2 className="font-bold text-xl text-gray-900"><AiOutlineBarChart className='inline-flex text-red-500 text-3xl' /> Rendez-vous effectués</h2>
                            <p className="text-3xl mt-8 font-semibold text-gray-600 mb-4 text-right">
                                {formatNombre(rdv_effectue)}

                                <span className="text-sm rounded-md ml-2">
                                    Total
                                </span>
                            </p>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow-md">
                            <h2 className="font-bold text-xl text-gray-900"><AiOutlineBarChart className='inline-flex text-red-500 text-3xl' /> Rendez-vous repporté</h2>
                            <p className="text-3xl mt-8 font-semibold text-gray-600 mb-4 text-right">
                                {formatNombre(rdv_repporte)}
                                <span className="text-sm rounded-md ml-2">
                                    Total
                                </span>
                            </p>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow-md">
                            <h2 className="font-bold text-xl text-gray-900"> <AiOutlineBarChart className='inline-flex text-red-500 text-3xl' /> Rendez-vous annulés</h2>
                            <p className="text-3xl mt-8 font-semibold text-gray-600 mb-4 text-right">
                                {formatNombre(rdv_annule)}
                                <span className="text-sm rounded-md ml-2">
                                    Total
                                </span>
                            </p>
                        </div>

                    </div>
                    <div className='bg-white rounded-md p-4 shadow-md mt-4'>
                        <div className='my-5 flex items-center justify-between'>
                            <div className='uppercase text-xl text-gray-700 font-semibold'>
                                Representation graphique de l'année <span className='text-red-600 font-bold'>{selectedYear}</span>
                            </div>
                            <div>
                                <select onChange={handleYearChange} value={selectedYear} className='border-gray-300 rounded-md'>
                                    {Array.isArray(years) ? years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    )) : (
                                        <option value="">No years available</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <YearlyLineChartByRdv monthlyData={rdvCountByMonth} />
                    </div>

                    {
                        (auth.user.roles[0].name == "Administrateur" || auth.user.roles[0].name == "Caissier") &&
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-3 lg:grid-cols-4 gap-4 mt-28">
                                <div className="p-4">
                                    <h2 className="font-bold text-4xl text-gray-900">Statistiques sur les opérations à la <span className='text-red-500'>Caisse</span></h2>
                                </div>
                                <div className="bg-white rounded-md p-4 shadow-md">
                                    <h2 className="font-bold text-xl text-gray-900"><AiFillDollarCircle className='inline-flex text-red-500 text-3xl' /> Solde total</h2>
                                    <p className="text-3xl mt-8 font-semibold text-gray-600 mb-4 text-right">
                                        {formatNombre(solde)}

                                        <span className="text-sm rounded-md ml-2">
                                            Dollar
                                        </span>
                                    </p>
                                </div>
                                <div className="bg-white rounded-md p-4 shadow-md">
                                    <h2 className="font-bold text-xl text-gray-900"> <AiFillDollarCircle className='inline-flex text-red-500 text-3xl' />Somme debiter</h2>
                                    <p className="text-3xl mt-8 font-semibold text-gray-600 mb-4 text-right">
                                        {formatNombre(depot)}
                                        <span className="text-sm rounded-md ml-2">
                                            Dollar
                                        </span>
                                    </p>
                                </div>
                                <div className="bg-white rounded-md p-4 shadow-md">
                                    <h2 className="font-bold text-xl text-gray-900"><AiFillDollarCircle className='inline-flex text-red-500 text-3xl' /> Somme crediter</h2>
                                    <p className="text-3xl mt-8 font-semibold text-gray-600 mb-4 text-right">
                                        {formatNombre(retrait)}
                                        <span className="text-sm rounded-md ml-2">
                                            Dollar
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className='bg-white rounded-md p-4 shadow-md mt-4'>
                                <div className='my-5 flex items-center justify-between'>
                                    <div className='uppercase text-xl text-gray-700 font-semibold'>
                                        Representation graphique de l'année <span className='text-red-600 font-bold'>{selectedYear}</span>
                                    </div>
                                    <div>
                                        <select onChange={handleYearChange} value={selectedYear} className='border-gray-300 rounded-md'>
                                            {Array.isArray(years) ? years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            )) : (
                                                <option value="">No years available</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <YearlyLineChartByCaisse monthlyData={caisseCountByMonth} />
                            </div>
                        </div>
                    }
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
