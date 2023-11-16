import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { FormEventHandler, useState } from 'react';
import { toast } from 'react-toastify';

export default function AddFiche() {

    const [nom, setnom] = useState('');
    const [postnom, setpostnom] = useState('');
    const [prenom, setprenom] = useState('');
    const [adresse, setadresse] = useState('');
    const [sexe, setsexe] = useState('');
    const [date_naissance, setdate_naissance] = useState<any | null>(null);
    const [lieu_naissance, setlieu_naissance] = useState('');
    const [situation_familliale, setsituation_familliale] = useState('');
    const [nbr_enfants, setnbr_enfants] = useState('');
    const [nbr_grosses, setnbr_grosses] = useState('');
    const [num_dossier, setnum_dossier] = useState('');
    const [num_telephone, setnum_telephone] = useState('');
    const [num_secu, setnum_secu] = useState('');
    const [taille, settaille] = useState('');
    const [poids, setpoids] = useState('');
    const [medecin_traitant, setmedecin_traitant] = useState('');
    const [fumeur, setfumeur] = useState('');
    const [nbr_cigarette, setnbr_cigarette] = useState('');
    const [groupe_saguin, setgroupe_saguin] = useState('');
    const [antecedents_familiaux, setantecedents_familiaux] = useState('');
    const [maladie_infatiles_contractees, setmaladie_infatiles_contractees] = useState('');
    const [antecedent_medicaux, setantecedent_medicaux] = useState('');
    const [allergies, setallergies] = useState('');
    const [intolerance_medicamenteuse, setintolerance_medicamenteuse] = useState('');
    const [traitement_regulier, settraitement_regulier] = useState('');
    const [vaccin, setvaccin] = useState('');


    const AddSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        let data = {
            nom, postnom, prenom, adresse, sexe, date_naissance, lieu_naissance, situation_familliale, nbr_enfants, nbr_grosses,
            num_secu, taille, poids, medecin_traitant, fumeur, nbr_cigarette, groupe_saguin, antecedents_familiaux, maladie_infatiles_contractees, 
            antecedent_medicaux, allergies, intolerance_medicamenteuse, traitement_regulier, vaccin, num_dossier, num_telephone
        }

        const id = toast.loading("Chargement...")
        axios.post(route('fiches.store'), data)
            .then(() => {
                toast.update(id, {
                    render: "Rendez-vous ajouté",
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
            <h2 className="text-2xl font-bold text-gray-700 text-center w-full mb-4 pb-2">Ajouter une fiche</h2>

            <form onSubmit={AddSubmit} method='post'>
                <div className='overflow-hidden overflow-y-scroll h-96'>
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
                            <InputLabel htmlFor="num_dossier" value="N° de dossier" />

                            <TextInput
                                id="num_dossier"
                                type="number"
                                name="num_dossier"
                                value={num_dossier}
                                className="mt-1 block w-full"
                                autoComplete="num_dossier"
                                onChange={(e) => setnum_dossier(e.target.value)}
                                
                            />

                        </div>
                        <div>
                            <InputLabel htmlFor="num_telephone" value="N° de téléphone" />

                            <TextInput
                                id="num_telephone"
                                type="number"
                                name="num_telephone"
                                value={num_telephone}
                                className="mt-1 block w-full"
                                autoComplete="num_telephone"
                                onChange={(e) => setnum_telephone(e.target.value)}
                                
                            />

                        </div>
                        <div>
                            <InputLabel htmlFor="adresse" value="Adresse" />

                            <TextInput
                                id="adresse"
                                name="adresse"
                                value={adresse}
                                className="mt-1 block w-full"
                                autoComplete="adresse"
                                onChange={(e) => setadresse(e.target.value)}
                                
                            />

                        </div>
                        <div>
                            <InputLabel htmlFor="situation_familliale" value="Situation familliale" />

                            <select name='situation_familliale' id="situation_familliale" value={situation_familliale} onChange={(e) => setsituation_familliale(e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                                <option selected>Choisir</option>
                                <option value="celibataire">Celibataire</option>
                                <option value="marie/e">Marie/e</option>
                                <option value="divorce/e">Divorce/e</option>
                                <option value="veuf/ve">Veuf/ve</option>
                            </select>

                        </div>
                        <div>
                            <InputLabel htmlFor="sexe" value="Sexe" />

                            <select name='sexe' id="sexe" value={sexe} onChange={(e) => setsexe(e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                                <option selected>Choisir</option>
                                <option value="M">Masculin</option>
                                <option value="F">Feminin</option>
                            </select>

                        </div>
                        <div>
                            <InputLabel htmlFor="lieu_naissance" value="Lieu de naissance" />

                            <TextInput
                                id="lieu_naissance"
                                type="text"
                                name="lieu_naissance"
                                value={lieu_naissance}
                                className="mt-1 block w-full"
                                autoComplete="lieu_naissance"
                                onChange={(e) => setlieu_naissance(e.target.value)}
                                
                            />

                        </div>
                        <div>
                            <InputLabel htmlFor="date_naissance" value="Date de naissance*" />

                            <Calendar value={date_naissance} onChange={(e) => setdate_naissance(e.target.value)} dateFormat="dd/mm/yy" className="mt-1 block w-full h-11" />

                        </div>
                        <div>
                            <InputLabel htmlFor="nbr_enfants" value="Nombre d'enfant/s" />

                            <TextInput
                                id="nbr_enfants"
                                type="number"
                                name="nbr_enfants"
                                value={nbr_enfants}
                                className="mt-1 block w-full"
                                autoComplete="nbr_enfants"
                                onChange={(e) => setnbr_enfants(e.target.value)}
                            />

                        </div>
                        <div>
                            <InputLabel htmlFor="nbr_grosses" value="Nombre de grosse/s" />

                            <TextInput
                                id="nbr_grosses"
                                type="number"
                                name="nbr_grosses"
                                value={nbr_grosses}
                                className="mt-1 block w-full"
                                autoComplete="nbr_grosses"
                                onChange={(e) => setnbr_grosses(e.target.value)}
                            />

                        </div>
                        <div>
                            <InputLabel htmlFor="num_secu" value="N° de Sécu" />

                            <TextInput
                                id="num_secu"
                                type="number"
                                name="num_secu"
                                value={num_secu}
                                className="mt-1 block w-full"
                                autoComplete="num_secu"
                                onChange={(e) => setnum_secu(e.target.value)}
                                
                            />

                        </div>
                        <div>
                            <InputLabel htmlFor="medecin_traitant" value="Medecin traitant" />

                            <TextInput
                                id="medecin_traitant"
                                type="text"
                                name="medecin_traitant"
                                value={medecin_traitant}
                                className="mt-1 block w-full"
                                autoComplete="medecin_traitant"
                                onChange={(e) => setmedecin_traitant(e.target.value)}
                                
                            />

                        </div>
                        <div>
                            <InputLabel htmlFor="poids" value="Poids" />

                            <TextInput
                                id="poids"
                                type="number"
                                name="poids"
                                value={poids}
                                className="mt-1 block w-full"
                                autoComplete="poids"
                                onChange={(e) => setpoids(e.target.value)}
                                
                            />

                        </div>
                        <div>
                            <InputLabel htmlFor="taille" value="Taille" />

                            <TextInput
                                id="taille"
                                type="number"
                                name="taille"
                                value={taille}
                                className="mt-1 block w-full"
                                autoComplete="taille"
                                onChange={(e) => settaille(e.target.value)}
                                
                            />

                        </div>
                        <div>
                            <InputLabel htmlFor="groupe_saguin" value="Groupe sanguin" />

                            <select name='groupe_saguin' id="groupe_saguin" value={groupe_saguin} onChange={(e) => setgroupe_saguin(e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                                <option selected>Choisir</option>
                                <option value="a">A</option>
                                <option value="b">B</option>
                                <option value="ab">AB</option>
                                <option value="o">O</option>
                            </select>

                        </div>
                        <div>
                            <InputLabel htmlFor="fumeur" value="Fumeur" />

                            <select name='fumeur' id="fumeur" value={fumeur} onChange={(e) => setfumeur(e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                                <option selected>Choisir</option>
                                <option value="oui">Oui</option>
                                <option value="non">Non</option>
                            </select>

                        </div>
                        {
                            fumeur == "oui" ?
                                <div>
                                    <InputLabel htmlFor="nbr_cigarette" value="Nombre de cigarette/jour" />

                                    <TextInput
                                        id="nbr_cigarette"
                                        type="number"
                                        name="nbr_cigarette"
                                        value={nbr_cigarette}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) => setnbr_cigarette(e.target.value)}
                                    />

                                </div> : ''
                        }
                        <div>
                            <InputLabel htmlFor="antecedents_familiaux" value="Antécédents familiaux" />

                            <TextInput
                                id="antecedents_familiaux"
                                type="text"
                                name="antecedents_familiaux"
                                value={antecedents_familiaux}
                                className="mt-1 block w-full"
                                autoComplete="antecedents_familiaux"
                                onChange={(e) => setantecedents_familiaux(e.target.value)}
                            />

                        </div>
                        <div>
                            <InputLabel htmlFor="maladie_infatiles_contractees" value="Maladie infatiles contractées" />

                            <TextInput
                                id="maladie_infatiles_contractees"
                                type="text"
                                name="maladie_infatiles_contractees"
                                value={maladie_infatiles_contractees}
                                className="mt-1 block w-full"
                                autoComplete="maladie_infatiles_contractees"
                                onChange={(e) => setmaladie_infatiles_contractees(e.target.value)}
                            />

                        </div>
                        <div>
                            <InputLabel htmlFor="antecedent_medicaux" value="Antécédents medicaux" />

                            <TextInput
                                id="antecedent_medicaux"
                                type="text"
                                name="antecedent_medicaux"
                                value={antecedent_medicaux}
                                className="mt-1 block w-full"
                                autoComplete="antecedent_medicaux"
                                onChange={(e) => setantecedent_medicaux(e.target.value)}
                            />

                        </div>
                        <div>
                            <InputLabel htmlFor="allergies" value="Allergies" />

                            <TextInput
                                id="allergies"
                                type="text"
                                name="allergies"
                                value={allergies}
                                className="mt-1 block w-full"
                                autoComplete="allergies"
                                onChange={(e) => setallergies(e.target.value)}
                            />

                        </div>
                        <div>
                            <InputLabel htmlFor="intolerance_medicamenteuse" value="Intolérance médicamenteuse" />

                            <TextInput
                                id="intolerance_medicamenteuse"
                                type="text"
                                name="intolerance_medicamenteuse"
                                value={intolerance_medicamenteuse}
                                className="mt-1 block w-full"
                                autoComplete="intolerance_medicamenteuse"
                                onChange={(e) => setintolerance_medicamenteuse(e.target.value)}
                            />

                        </div>
                        <div>
                            <InputLabel htmlFor="traitement_regulier" value="Traitement regulier" />

                            <TextInput
                                id="traitement_regulier"
                                type="text"
                                name="traitement_regulier"
                                value={traitement_regulier}
                                className="mt-1 block w-full"
                                autoComplete="traitement_regulier"
                                onChange={(e) => settraitement_regulier(e.target.value)}
                            />

                        </div>
                        <div>
                            <InputLabel htmlFor="vaccin" value="Vaccin" />

                            <TextInput
                                id="vaccin"
                                type="text"
                                name="vaccin"
                                value={vaccin}
                                className="mt-1 block w-full"
                                autoComplete="vaccin"
                                onChange={(e) => setvaccin(e.target.value)}
                            />

                        </div>
                    </div>
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
