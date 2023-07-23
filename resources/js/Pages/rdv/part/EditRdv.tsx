import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { FormEventHandler } from 'react';
import { toast } from 'react-toastify';

export default function EditRdv({ edit }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        status: edit.status,
        date: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const id = toast.loading("Chargement...")
        axios.put('/admin/rendez-vous/' + edit.id, data)
            .then(() => {
                toast.update(id, {
                    render: "Rendez-vous modifié",
                    type: toast.TYPE.SUCCESS,
                    autoClose: 3000,
                    isLoading: false
                });
                reset()
            }).catch(() => {
                toast.update(id, {
                    render: "Oups, veillez récommencer",
                    type: toast.TYPE.ERROR,
                    autoClose: 3000,
                    isLoading: false
                });
            });
    };

    return (
        <div className="w-full mt-6 px-6 py-4 bg-white overflow-hidden rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 text-center w-full mb-4 pb-2">Statuez un rendez-vous</h2>

        <form onSubmit={submit}>
            <div className={data.status == 'reporte' ? 'grid grid-cols-2 gap-4' : 'grid grid-cols-1'}>

                <div>
                    <InputLabel htmlFor="status" value="Status*" />

                    <select name='status' id="status" value={data.status} onChange={(e) => setData('status', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                        <option selected>Choisir</option>
                        <option value="effectue">Effectué</option>
                        <option value="annule">Annulé</option>
                        <option value="repporte">Reporté</option>
                    </select>

                    <InputError message={errors.status} className="mt-2" />
                </div>
                {
                    data.status == 'repporte' ?
                        <div className='mt-3'>
                            <InputLabel htmlFor="date" value="Nouvelle date du rendez-vous*" />

                            <Calendar value={data.date} onChange={(e) => setData('date', e.target.value)} dateFormat="dd/mm/yy" className="mt-1 block w-full h-11" />

                            <InputError message={errors.date} className="mt-2" />
                        </div> :
                        ''
                }
            </div>

            <div className="flex items-center justify-end mt-4">

                <PrimaryButton className="ml-4 bg-red-500" disabled={processing}>
                    Enregister
                </PrimaryButton>
            </div>
        </form>
    </div>
    );
}
