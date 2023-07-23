import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Calendar } from 'primereact/calendar';
import { FormEventHandler, useState } from 'react';

export default function RemoveRdv() {

    const { data, setData, post, processing, errors, reset } = useForm({
        rdv_id: '',
        email: '',
    });
    

    const DeleteSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <div className="w-full mt-6 px-6 py-4 bg-white overflow-hidden rounded-lg shadow-md">
            <form onSubmit={DeleteSubmit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Etês vous sûr de vouloir supprimer ce rendez vous?
                </h2>

                <div className="mt-6 flex justify-end">

                    <DangerButton className="ml-3" disabled={processing}>
                        Supprimer
                    </DangerButton>

                </div>
            </form>
        </div>
    );
}

