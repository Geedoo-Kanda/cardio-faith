import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function AddMessage() {

    const { data, setData, post, processing, errors, reset } = useForm({
        objet: '',
        message: '',
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
        axios.post(route('message.store'), data)
            .then(() => {
                toast.update(id, {
                    render: "Message envoyé",
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
            <h2 className="text-2xl font-bold text-gray-700 text-center w-full mb-4 pb-2">Envoyez un message</h2>

            <form onSubmit={AddSubmit}>

                <div>
                    <InputLabel htmlFor="objet" value="Objet*" />

                    <TextInput
                        id="objet"
                        type="text"
                        name="objet"
                        value={data.objet}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('objet', e.target.value)}
                        required
                    />

                    <InputError message={errors.objet} className="mt-2" />
                </div>

                <div className='mt-3'>
                    <InputLabel htmlFor="message" value="Message*" />

                    <textarea name='message' id="message" value={data.message} onChange={(e) => setData('message', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" placeholder="Écrivez ici..."></textarea>
                    <InputError message={errors.message} className="mt-2" />
                </div>
                <div className="flex items-center justify-end mt-4">

                    <PrimaryButton className="ml-4 bg-red-500" disabled={processing}>
                        Envoyez
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
