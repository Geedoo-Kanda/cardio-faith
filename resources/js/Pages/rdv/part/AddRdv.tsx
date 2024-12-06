import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { FormEventHandler, useState } from 'react';
import { toast } from 'react-toastify';

export default function AddRdv() {

    const [nom, setnom] = useState('');
    const [postnom, setpostnom] = useState('');
    const [prenom, setprenom] = useState('');
    const [phone, setphone] = useState('');
    const [email, setemail] = useState('');
    const [sexe, setsexe] = useState('');
    const [objet, setobjet] = useState('');
    const [date, setdate] = useState<any | null>(null);


    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;

    let minDate = new Date();

    minDate.setMonth(prevMonth);
    minDate.setFullYear(prevYear);

    const AddSubmit: FormEventHandler = (e) => {
        e.preventDefault();

       let data = {nom, postnom, prenom, phone, email, sexe, objet, date}

        const id = toast.loading("Chargement...")
        axios.post(route('rendez-vous.store'), data)
            .then(() => {
                toast.update(id, {
                    render: "Rendez-vous ajouté",
                    type: toast.TYPE.SUCCESS,
                    autoClose: 3000,
                    isLoading: false
                });
                setnom('')
                setpostnom('')
                setprenom('')
                setphone('')
                setemail('')
                setsexe('')
                setobjet('')
                setdate('')
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
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="nom" value="Nom*" />

                        <TextInput
                            id="nom"
                            name="nom"
                            value={nom}
                            className="mt-1 block w-full"
                            autoComplete="nom"
                            isFocused={true}
                            onChange={(e) => setnom(e.target.value)}
                            required
                        />

                    </div>
                    <div>
                        <InputLabel htmlFor="postnom" value="Postnom*" />

                        <TextInput
                            id="postnom"
                            name="postnom"
                            value={postnom}
                            className="mt-1 block w-full"
                            autoComplete="postnom"
                            onChange={(e) => setpostnom(e.target.value)}
                            required
                        />

                    </div>
                    <div>
                        <InputLabel htmlFor="prenom" value="Prenom*" />

                        <TextInput
                            id="prenom"
                            name="prenom"
                            value={prenom}
                            className="mt-1 block w-full"
                            autoComplete="prenom"
                            onChange={(e) => setprenom(e.target.value)}
                            required
                        />

                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email*" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setemail(e.target.value)}
                        />

                    </div>
                    <div>
                        <InputLabel htmlFor="phone" value="Phone*" />

                        <TextInput
                            id="phone"
                            name="phone"
                            value={phone}
                            className="mt-1 block w-full"
                            autoComplete="phone"
                            onChange={(e) => setphone(e.target.value)}
                            required
                        />

                    </div>
                    <div>
                        <InputLabel htmlFor="sexe" value="Sexe*" />

                        <select name='sexe' id="sexe" value={sexe} onChange={(e) => setsexe(e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                            <option selected>Choisir</option>
                            <option value="M">Masculin</option>
                            <option value="F">Feminin</option>
                        </select>

                    </div>
                    <div>
                        <InputLabel htmlFor="date" value="Date du rendez-vous*" />

                        <Calendar value={date} onChange={(e) => setdate(e.target.value)} minDate={minDate} dateFormat="dd/mm/yy" readOnlyInput className="mt-1 block w-full h-11" />

                    </div>
                    <div>
                        <InputLabel htmlFor="objet" value="Objet de la reunion*" />

                        <textarea name='objet' id="objet" value={objet} onChange={(e) => setobjet(e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" placeholder="Écrivez ici..."></textarea>
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
