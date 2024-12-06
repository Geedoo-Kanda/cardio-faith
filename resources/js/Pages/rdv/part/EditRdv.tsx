import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { FormEventHandler, useState } from 'react';
import { toast } from 'react-toastify';

export default function EditRdv({ edit }: any) {

    const [status, setstatus] = useState(edit.status);
    const [date, setdate] = useState<any | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        let data = { status, date }
        const id = toast.loading("Chargement...")
        if (status == 'repporte' && date == null) {
            toast.update(id, {
                render: "Oups, veillez entrer une date (Double cliquer sur le calendrier)",
                type: toast.TYPE.ERROR,
                autoClose: 3000,
                isLoading: false
            });
        } else {

            axios.put('/admin/rendez-vous/' + edit.id, data)
                .then(() => {
                    toast.update(id, {
                        render: "Rendez-vous modifié",
                        type: toast.TYPE.SUCCESS,
                        autoClose: 3000,
                        isLoading: false
                    });
                }).catch(() => {
                    toast.update(id, {
                        render: "Oups, veillez récommencer",
                        type: toast.TYPE.ERROR,
                        autoClose: 3000,
                        isLoading: false
                    });
                });
        }
    };

    return (
        <div className="w-full mt-6 px-6 py-4 bg-white overflow-hidden rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-700 text-center w-full mb-4 pb-2">Statuez un rendez-vous</h2>

            <form onSubmit={submit}>
                <div className={status == 'reporte' ? 'grid grid-cols-2 gap-4' : 'grid grid-cols-1'}>

                    <div>
                        <InputLabel htmlFor="status" value="Status*" />

                        <select name='status' id="status" value={status} onChange={(e) => setstatus(e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                            <option selected>Choisir</option>
                            <option value="effectue">Effectué</option>
                            <option value="annule">Annulé</option>
                            <option value="repporte">Reporté</option>
                        </select>
                    </div>
                    {
                        status == 'repporte' ?
                            <div className='mt-3'>
                                <InputLabel htmlFor="date" value="Nouvelle date du rendez-vous*" />

                                <Calendar value={date} onChange={(e) => setdate(e.target.value)} dateFormat="dd/mm/yy" className="mt-1 block w-full h-11" />
                            </div> :
                            ''
                    }
                </div>

                <div className="flex items-center justify-end mt-4">

                    <PrimaryButton className="ml-4 bg-red-600">
                        Enregister
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
