import InputLabel from '@/Components/InputLabel';
import dayjs from 'dayjs';
import { Calendar } from 'primereact/calendar';
import { useState } from 'react';

export default function ExportRdv() {

    const [delai, setdelai] = useState('');
    const [mois, setmois] = useState<any | null>(null);
    const [annee, setannee] = useState<any | null>(null);

    return (
        <div className="w-full mt-6 px-6 py-4 bg-white overflow-hidden rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-700 text-center w-full mb-4 pb-2">Exportez les rendez-vous</h2>

            <form >
                <div>
                    <InputLabel htmlFor="delai" value="Tranche*" />

                    <select name='delai' id="delai" value={delai} onChange={(e) => setdelai(e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                        <option selected>Choisir</option>
                        <option value="annee">Année</option>
                        <option value="mois">Mois</option>
                    </select>

                </div>

                {
                    delai == 'mois' ?
                        <div className='mt-3'>
                            <InputLabel htmlFor="mois" value="Mois*" />

                            <Calendar value={mois} onChange={(e) => setmois(e.target.value)} view="month" dateFormat="mm/yy" className="mt-1 block w-full h-11" />

                        </div> : ''
                }

                {
                    delai == 'annee' ?
                        <div className='mt-3'>
                            <InputLabel htmlFor="annee" value="Année*" />

                            <Calendar value={annee} onChange={(e) => setannee(e.target.value)} view="year" dateFormat="yy" className="mt-1 block w-full h-11" />

                        </div>
                        : ''
                }
                <div className="flex items-center justify-end mt-4">
                    <a href={`/admin/rendez-vous/export/${delai}/${dayjs(new Date(mois)).format("YYYY-MM")}/${dayjs(new Date(annee)).format("YYYY-MM")}`} onClick={() => setTimeout(function () { setannee(''); setmois(''); setdelai('') }, 2000)}
                        className='inline-flex items-center px-4 py-2 bg-red-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'>
                             Exporter
                             </a>
                </div>
            </form>
        </div>
    );
}

