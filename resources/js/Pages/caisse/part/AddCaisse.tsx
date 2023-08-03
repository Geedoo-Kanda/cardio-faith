import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { FormEventHandler } from 'react';
import { toast } from 'react-toastify';

export default function AddCaiise() {

    const { data, setData, post, processing, errors, reset } = useForm({
        operation: '',
        montant: '',
        libele: '',
    });

    const AddSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        
        const id = toast.loading("Chargement...")
        axios.post(route('caisse.store'), data)
            .then(() => {
                toast.update(id, {
                    render: "Operation ajoutée",
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
            <h2 className="text-2xl font-bold text-gray-700 text-center w-full mb-4 pb-2">Ajouter une opération</h2>

            <form onSubmit={AddSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="operation" value="Opération*" />

                        <select name='operation' id="operation" value={data.operation} onChange={(e) => setData('operation', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                            <option selected>Choisir</option>
                            <option value="retrait">Retrait</option>
                            <option value="depot">Depot</option>
                        </select>

                        <InputError message={errors.operation} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="montant" value="Montant*" />

                        <TextInput
                            id="montant"
                            type="number"
                            name="montant"
                            value={data.montant}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('montant', e.target.value)}
                            required
                        />

                        <InputError message={errors.montant} className="mt-2" />
                    </div>

                </div>
                <div className='mt-3'>
                    <InputLabel htmlFor="libele" value="Libele*" />

                    <textarea name='libele' id="libele" value={data.libele} onChange={(e) => setData('libele', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" placeholder="Écrivez ici..."></textarea>
                    <InputError message={errors.libele} className="mt-2" />
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
