import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Calendar } from 'primereact/calendar';

export default function ExportFiche() {

    const { data, setData, post, processing, errors, reset } = useForm({
        delai: '',
        mois: '',
        annee: '',
    });

    return (
        <div className="w-full mt-6 px-6 py-4 bg-white overflow-hidden rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-700 text-center w-full mb-4 pb-2">Exportez les fiches</h2>

            <form >
                <div>
                    <InputLabel htmlFor="delai" value="Tranche*" />

                    <select name='delai' id="delai" value={data.delai} onChange={(e) => setData('delai', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                        <option selected>Choisir</option>
                        <option value="annee">Année</option>
                        <option value="mois">Mois</option>
                    </select>

                    <InputError message={errors.delai} className="mt-2" />
                </div>

                {
                    data.delai == 'mois' ?
                        <div className='mt-3'>
                            <InputLabel htmlFor="mois" value="Mois*" />

                            <Calendar value={data.mois} onChange={(e) => setData('mois', e.target.value)} view="month" dateFormat="mm/yy" className="mt-1 block w-full h-11" />

                            <InputError message={errors.mois} className="mt-2" />
                        </div> : ''
                }

                {
                    data.delai == 'annee' ?
                        <div className='mt-3'>
                            <InputLabel htmlFor="annee" value="Année*" />

                            <Calendar value={data.annee} onChange={(e) => setData('annee', e.target.value)} view="year" dateFormat="yy" className="mt-1 block w-full h-11" />

                            <InputError message={errors.annee} className="mt-2" />
                        </div>
                        : ''
                }
                <div className="flex items-center justify-end mt-4">
                    <a href={`/admin/fiches/export/${data.delai}/${dayjs(new Date(data.mois)).format("YYYY-MM")}/${dayjs(new Date(data.annee)).format("YYYY-MM")}`} onClick={() => setTimeout(function () { reset() }, 2000)}
                        className='inline-flex items-center px-4 py-2 bg-red-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'>
                             Exporter
                             </a>
                </div>
            </form>
        </div>
    );
}
