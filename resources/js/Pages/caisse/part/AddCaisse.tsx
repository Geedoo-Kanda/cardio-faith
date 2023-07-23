import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Calendar } from 'primereact/calendar';
import { FormEventHandler } from 'react';

export default function AddCaiise() {

    const { data, setData, post, processing, errors, reset } = useForm({
        operation: '',
        devise: '',
        montant: '',
        libele: '',
    });

    const AddSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <div className="w-full mt-6 px-6 py-4 bg-white overflow-hidden rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-700 text-center w-full mb-4 pb-2">Ajouter une opération</h2>

            <form onSubmit={AddSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="operation" value="Opération*" />

                        <TextInput
                            id="operation"
                            name="operation"
                            value={data.operation}
                            className="mt-1 block w-full"
                            autoComplete="operation"
                            onChange={(e) => setData('operation', e.target.value)}
                            required
                        />

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
                    <div>
                        <InputLabel htmlFor="devise" value="Devise*" />

                        <select name='devise' id="devise" value={data.devise} onChange={(e) => setData('devise', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                            <option selected>Choisir</option>
                            <option value="usd">USD</option>
                            <option value="cdf">CDF</option>
                        </select>

                        <InputError message={errors.devise} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="libele" value="Libele*" />

                        <textarea name='libele' id="libele" value={data.libele} onChange={(e) => setData('libele', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" placeholder="Écrivez ici..."></textarea>
                        <InputError message={errors.libele} className="mt-2" />
                    </div>

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
