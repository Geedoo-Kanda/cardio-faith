import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Calendar } from 'primereact/calendar';
import { FormEventHandler } from 'react';

export default function AddFiche() {

    const { data, setData, post, processing, errors, reset } = useForm({
        nom: '',
        postnom: '',
        prenom: '',
        adresse: '',
        lieu: '',
        sexe: '',
        date: '',
        situation_familliale: '',
        nbr_enfant: '',
        nbr_grosses: '',
        secu_social: '',
        objet: '',
        taille: '',
        poids: '',
        medecin: '',
        fumeur: '',
        cigarette: '',
        groupe_saguin: '',
        antecedent_familiaux: '',
        maladie_infatiles_contractees: '',
        antecedent_medicaux: '',
        allergies: '',
        intolerance_medicamenteuse: '',
        traitement_regulier: '',
        vaccin: '',
        conclusion: '',
    });

    const AddSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <div className="w-full mt-6 px-6 py-4 bg-white overflow-hidden rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-700 text-center w-full mb-4 pb-2">Ajouter une fiche</h2>

            <form onSubmit={AddSubmit}>
                <div className='overflow-hidden overflow-y-scroll h-96'>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="nom" value="Nom*" />

                        <TextInput
                            id="nom"
                            name="nom"
                            value={data.nom}
                            className="mt-1 block w-full"
                            autoComplete="nom"
                            isFocused={true}
                            onChange={(e) => setData('nom', e.target.value)}
                            required
                        />

                        <InputError message={errors.nom} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="postnom" value="Postnom" />

                        <TextInput
                            id="postnom"
                            name="postnom"
                            value={data.postnom}
                            className="mt-1 block w-full"
                            autoComplete="postnom"
                            onChange={(e) => setData('postnom', e.target.value)}
                            required
                        />

                        <InputError message={errors.postnom} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="prenom" value="Prenom*" />

                        <TextInput
                            id="prenom"
                            name="prenom"
                            value={data.prenom}
                            className="mt-1 block w-full"
                            autoComplete="prenom"
                            onChange={(e) => setData('prenom', e.target.value)}
                            required
                        />

                        <InputError message={errors.prenom} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="adresse" value="Adresse*" />

                        <TextInput
                            id="adresse"
                            name="adresse"
                            value={data.adresse}
                            className="mt-1 block w-full"
                            autoComplete="adresse"
                            onChange={(e) => setData('adresse', e.target.value)}
                            required
                        />

                        <InputError message={errors.adresse} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="situation_familliale" value="Situation familliale*" />

                        <select name='situation_familliale' id="situation_familliale" value={data.situation_familliale} onChange={(e) => setData('situation_familliale', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                            <option selected>Choisir</option>
                            <option value="celibataire">Celibataire</option>
                            <option value="marie/e">Marie/e</option>
                            <option value="divorce/e">Divorce/e</option>
                            <option value="veuf/ve">Veuf/ve</option>
                        </select>

                        <InputError message={errors.situation_familliale} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="sexe" value="Sexe*" />

                        <select name='sexe' id="sexe" value={data.sexe} onChange={(e) => setData('sexe', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                            <option selected>Choisir</option>
                            <option value="M">Masculin</option>
                            <option value="F">Feminin</option>
                        </select>

                        <InputError message={errors.sexe} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="lieu" value="Lieu de naissance*" />

                        <TextInput
                            id="lieu"
                            type="text"
                            name="lieu"
                            value={data.lieu}
                            className="mt-1 block w-full"
                            autoComplete="lieu"
                            onChange={(e) => setData('lieu', e.target.value)}
                            required
                        />

                        <InputError message={errors.lieu} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="date" value="Date de naissance*" />

                        <Calendar value={data.date} onChange={(e) => setData('date', e.target.value)} dateFormat="dd/mm/yy" className="mt-1 block w-full h-11" />

                        <InputError message={errors.date} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="nbr_enfant" value="Nombre d'enfant/s" />

                        <TextInput
                            id="nbr_enfant"
                            type="number"
                            name="nbr_enfant"
                            value={data.nbr_enfant}
                            className="mt-1 block w-full"
                            autoComplete="nbr_enfant"
                            onChange={(e) => setData('nbr_enfant', e.target.value)}
                            required
                        />

                        <InputError message={errors.nbr_enfant} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="nbr_grosses" value="Nombre de grosse/s" />

                        <TextInput
                            id="nbr_grosses"
                            type="number"
                            name="nbr_grosses"
                            value={data.nbr_grosses}
                            className="mt-1 block w-full"
                            autoComplete="nbr_grosses"
                            onChange={(e) => setData('nbr_grosses', e.target.value)}
                            required
                        />

                        <InputError message={errors.nbr_grosses} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="secu_social" value="N° DE Sécu*" />

                        <TextInput
                            id="secu_social"
                            type="number"
                            name="secu_social"
                            value={data.secu_social}
                            className="mt-1 block w-full"
                            autoComplete="secu_social"
                            onChange={(e) => setData('secu_social', e.target.value)}
                            required
                        />

                        <InputError message={errors.lieu} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="medecin" value="Medecin traitant*" />

                        <TextInput
                            id="medecin"
                            type="text"
                            name="medecin"
                            value={data.medecin}
                            className="mt-1 block w-full"
                            autoComplete="medecin"
                            onChange={(e) => setData('medecin', e.target.value)}
                            required
                        />

                        <InputError message={errors.lieu} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="poids" value="Poids*" />

                        <TextInput
                            id="poids"
                            type="number"
                            name="poids"
                            value={data.poids}
                            className="mt-1 block w-full"
                            autoComplete="poids"
                            onChange={(e) => setData('poids', e.target.value)}
                            required
                        />

                        <InputError message={errors.lieu} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="taille" value="Taille*" />

                        <TextInput
                            id="taille"
                            type="number"
                            name="taille"
                            value={data.taille}
                            className="mt-1 block w-full"
                            autoComplete="taille"
                            onChange={(e) => setData('taille', e.target.value)}
                            required
                        />

                        <InputError message={errors.lieu} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="groupe_saguin" value="Groupe sanguin*" />

                        <select name='groupe_sanguin' id="groupe_sanguin" value={data.groupe_sanguin} onChange={(e) => setData('groupe_sanguin', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                            <option selected>Choisir</option>
                            <option value="a">A</option>
                            <option value="b">B</option>
                            <option value="ab">AB</option>
                            <option value="o">O</option>
                        </select>

                        <InputError message={errors.groupe_saguin} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="fumeur" value="Fumeur*" />

                        <select name='fumeur' id="fumeur" value={data.fumeur} onChange={(e) => setData('fumeur', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" aria-label="Default select example">
                            <option selected>Choisir</option>
                            <option value="oui">Oui</option>
                            <option value="non">Non</option>
                        </select>

                        <InputError message={errors.fumeur} className="mt-2" />
                    </div>
                    {
                        data.fumeur == "oui" ?
                            <div>
                                <InputLabel htmlFor="cigarette" value="Nombre de cigarette/jour" />

                                <TextInput
                                    id="cigarette"
                                    type="number"
                                    name="cigarette"
                                    value={data.cigarette}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) => setData('cigarette', e.target.value)}
                                />

                                <InputError message={errors.lieu} className="mt-2" />
                            </div> : ''
                    }
                    <div>
                        <InputLabel htmlFor="antecedent_familiaux" value="Antécédents familiaux" />

                        <TextInput
                            id="antecedent_familiaux"
                            type="text"
                            name="antecedent_familiaux"
                            value={data.antecedent_familiaux}
                            className="mt-1 block w-full"
                            autoComplete="antecedent_familiaux"
                            onChange={(e) => setData('antecedent_familiaux', e.target.value)}
                        />

                        <InputError message={errors.antecedent_familiaux} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="maladie_infatiles_contractees" value="Maladie infatiles contractées" />

                        <TextInput
                            id="maladie_infatiles_contractees"
                            type="text"
                            name="maladie_infatiles_contractees"
                            value={data.maladie_infatiles_contractees}
                            className="mt-1 block w-full"
                            autoComplete="maladie_infatiles_contractees"
                            onChange={(e) => setData('maladie_infatiles_contractees', e.target.value)}
                        />

                        <InputError message={errors.maladie_infatiles_contractees} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="antecedent_medicaux" value="Antécédents medicaux" />

                        <TextInput
                            id="antecedent_medicaux"
                            type="text"
                            name="antecedent_medicaux"
                            value={data.antecedent_medicaux}
                            className="mt-1 block w-full"
                            autoComplete="antecedent_medicaux"
                            onChange={(e) => setData('antecedent_medicaux', e.target.value)}
                        />

                        <InputError message={errors.antecedent_medicaux} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="allergies" value="Allergies" />

                        <TextInput
                            id="allergies"
                            type="text"
                            name="allergies"
                            value={data.allergies}
                            className="mt-1 block w-full"
                            autoComplete="allergies"
                            onChange={(e) => setData('allergies', e.target.value)}
                        />

                        <InputError message={errors.allergies} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="intolerance_medicamenteuse" value="Intolérance médicamenteuse" />

                        <TextInput
                            id="intolerance_medicamenteuse"
                            type="text"
                            name="intolerance_medicamenteuse"
                            value={data.intolerance_medicamenteuse}
                            className="mt-1 block w-full"
                            autoComplete="intolerance_medicamenteuse"
                            onChange={(e) => setData('intolerance_medicamenteuse', e.target.value)}
                        />

                        <InputError message={errors.intolerance_medicamenteuse} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="traitement_regulier" value="Traitement regulier" />

                        <TextInput
                            id="traitement_regulier"
                            type="text"
                            name="traitement_regulier"
                            value={data.traitement_regulier}
                            className="mt-1 block w-full"
                            autoComplete="traitement_regulier"
                            onChange={(e) => setData('traitement_regulier', e.target.value)}
                        />

                        <InputError message={errors.traitement_regulier} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="vaccin" value="Vaccin" />

                        <TextInput
                            id="vaccin"
                            type="text"
                            name="vaccin"
                            value={data.vaccin}
                            className="mt-1 block w-full"
                            autoComplete="vaccin"
                            onChange={(e) => setData('vaccin', e.target.value)}
                        />

                        <InputError message={errors.vaccin} className="mt-2" />
                    </div>
                </div>
                <div className='mt-4'>
                    <InputLabel htmlFor="conclusion" value="Compte rendu*" />

                    <textarea name='conclusion' id="conclusion" value={data.conclusion} onChange={(e) => setData('conclusion', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" placeholder="Écrivez ici..."></textarea>
                    <InputError message={errors.conclusion} className="mt-2" />
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
