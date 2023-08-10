import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { FormEventHandler, useState } from 'react';
import { toast } from 'react-toastify';

export default function EditRdv({ edit } : any) {

    const [conclusion, setconclusion] = useState(edit.conclusion);   

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        let data = {conclusion}

        const id = toast.loading("Chargement...")
        axios.put('/admin/compte-rendu/' + edit.id, data)
            .then(() => {
                toast.update(id, {
                    render: "Compte rendu ajouté",
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
    };

    return (
        <div className="w-full mt-6 px-6 py-4 bg-white overflow-hidden rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 text-center w-full mb-4 pb-2">Ajouter un compte rendu</h2>

        <form onSubmit={submit}>
        <div className='mt-4'>
                        <InputLabel htmlFor="conclusion" value="Compte rendu*" />

                        <textarea name='conclusion' id="conclusion" value={conclusion} onChange={(e) => setconclusion(e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm h-32" placeholder="Écrivez ici..."></textarea>
                    </div>

            <div className="flex items-center justify-end mt-4">

                <PrimaryButton className="ml-4 bg-red-500">
                    Enregister
                </PrimaryButton>
            </div>
        </form>
    </div>
    );
}
