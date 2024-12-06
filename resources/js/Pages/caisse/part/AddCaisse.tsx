import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { FormEventHandler, useState } from 'react';
import { toast } from 'react-toastify';

export default function AddCaiise() {

    const [operation, setoperation] = useState('');
    const [montant, setmontant] = useState('');
    const [libele, setlibele] = useState('');
    const [date, setdate] = useState<any | null>(null);

    const AddSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        let data = {
            operation,
            montant,
            libele,
            date
        }
        const id = toast.loading("Chargement...")
        axios.post(route('caisse.store'), data)
            .then(() => {
                toast.update(id, {
                    render: "Operation ajoutée",
                    type: toast.TYPE.SUCCESS,
                    autoClose: 3000,
                    isLoading: false
                });
                setdate('')
                setlibele('')
                setmontant('')
                setoperation('')
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

                        <select name='operation' id="operation" value={operation} onChange={(e) => setoperation(e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                            <option selected>Choisir</option>
                            <option value="retrait">Retrait</option>
                            <option value="depot">Depot</option>
                        </select>

                    </div>
                    <div>
                        <InputLabel htmlFor="montant" value="Montant*" />

                        <TextInput
                            id="montant"
                            type="number"
                            name="montant"
                            value={montant}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setmontant(e.target.value)}
                            required
                        />

                    </div>
                    <div>
                        <InputLabel htmlFor="date" value="Date*" />

                        <Calendar value={date} onChange={(e) => setdate(e.target.value)} dateFormat="dd/mm/yy" className="mt-1 block w-full h-11" />

                    </div>
                    <div>
                        <InputLabel htmlFor="libele" value="Libele*" />

                        <textarea name='libele' id="libele" value={libele} onChange={(e) => setlibele(e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" placeholder="Écrivez ici..."></textarea>
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
