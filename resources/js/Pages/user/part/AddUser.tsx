import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function AddUser() {

    const { data, setData, post, processing, errors, reset } = useForm({
        nom: '',
        role: '',
    });

    const [Users, setUsers] = useState([]);


    useEffect(() => {
        users()
    }, [])

    const users = async () => {
        axios.get(route('user.index'))
            .then(results => {
                setUsers(results.data)
            })
    }

    const AddSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const id = toast.loading("Chargement...")
        axios.post(route('user.store'), data)
            .then(() => {
                toast.update(id, {
                    render: "Rendez-vous ajouté",
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
            <h2 className="text-2xl font-bold text-gray-700 text-center w-full mb-4 pb-2">Ajouter un rendez-vous</h2>

            <form onSubmit={AddSubmit}>

                <div>
                    <InputLabel htmlFor="nom" value="Utilisateur*" />

                    <select name='nom' id="nom" value={data.nom} onChange={(e) => setData('nom', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                        <option selected>Choisir</option>
                        {Users.map((user: any, index) => (
                            <option value={user.id} key={index} className="uppercase">{user.name}</option>
                        ))}
                    </select>

                    <InputError message={errors.nom} className="mt-2" />
                </div>
                <div className='mt-3'>
                    <InputLabel htmlFor="role" value="Role*" />

                    <select name='role' id="role" value={data.role} onChange={(e) => setData('role', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                        <option selected>Choisir</option>
                        <option value="manager">Manager</option>
                            <option value="secretaire">Secretaire</option>
                            <option value="docteur">Docteur/Infirmier</option>
                    </select>

                    <InputError message={errors.role} className="mt-2" />
                </div>
                <div className="flex items-center justify-end mt-4">

                    <PrimaryButton className="ml-4 bg-red-600" disabled={processing}>
                        Enregister
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
