import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { FormEventHandler, useState } from 'react';
import { toast } from 'react-toastify';

export default function EditUser({ edit }: any) {

    const [role, setrole] = useState(edit.role);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        let data = { role }
        const id = toast.loading("Chargement...")


        axios.put('/admin/users/' + edit.id, data)
            .then(() => {
                toast.update(id, {
                    render: "Role modifié",
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
            <h2 className="text-2xl font-bold text-gray-700 text-center w-full mb-4 pb-2">Modifiez le role</h2>

            <form onSubmit={submit}>
                <div className={'grid grid-cols-1'}>

                    <div>
                        <InputLabel htmlFor="role" value="Role*" />

                        <select name='role' id="role" value={role} onChange={(e) => setrole(e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                            <option selected>Choisir</option>
                            <option value="Administrateur">Administrateur</option>
                            <option value="Caissier">Caissier</option>
                            <option value="Docteur">Docteur</option>
                            <option value="Secretaire">Secretaire</option>
                        </select>
                    </div>
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
