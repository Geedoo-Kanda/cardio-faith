@php
    use DateTimeImmutable as DateTimeImmutable;
@endphp
<table>
    <thead>
        <tr class="font-bold">
            <th>#</th>
            <th><b>N° dossier</b></th>
            <th><b>Nom</b></th>
            <th><b>Postnom</b></th>
            <th><b>Prenom</b></th>
            <th><b>Sexe</b></th>
            <th><b>Lieu et date de naissance</b></th>
            <th><b>Adresse</b></th>
            <th><b>Situation familiale</b></th>
            <th><b>Nbr enfants</b></th>
            <th><b>Nbr grosses</b></th>
            <th><b>N° secu</b></th>
            <th><b>Taille</b></th>
            <th><b>Poids</b></th>
            <th><b>Gourpe sanguin</b></th>
            <th><b>Medecin</b></th>
            <th><b>Fumeur</b></th>
            <th><b>Nbr cigarettes</b></th>
            <th><b>Antecedents familiaux</b></th>
            <th><b>Maladies infantiles contractées</b></th>
            <th><b>Antecedents medicaux</b></th>
            <th><b>Allergie</b></th>
            <th><b>Intolerence medicamenteuse</b></th>
            <th><b>Traitement regulier</b></th>
            <th><b>Vaccin</b></th>
            <th><b>Compte rendu</b></th>
            <th><b>Employé</b></th>
        </tr>
    </thead>
    <tbody>
        @foreach ($fiches as $fiche)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $fiche->num_dossier }}</td>
                <td>{{ $fiche->nom }}</td>
                <td>{{ $fiche->postnom }}</td>
                <td>{{ $fiche->prenom }}</td>
                <td>{{ $fiche->sexe }}</td>
                <td>{{ $fiche->lieu_naissance }},
                    @php
                        $date1 = new DateTimeImmutable($fiche->date_naissance);
                        $date2 = $date1->format('d-m-Y');
                    @endphp
                    {{ $date2 }}
                </td>
                <td>{{ $fiche->adresse }}</td>
                <td>{{ $fiche->situation_familliale }}</td>
                <td>{{ $fiche->nbr_enfants }}</td>
                <td>{{ $fiche->nbr_grosses }}</td>
                <td>{{ $fiche->num_secu }}</td>
                <td>{{ $fiche->taille }}</td>
                <td>{{ $fiche->poids }}</td>
                <td>{{ $fiche->groupe_saguin }}</td>
                <td>{{ $fiche->medecin_traitant }}</td>
                <td>{{ $fiche->fumeur }}</td>
                <td>{{ $fiche->nbr_cigarette }}</td>
                <td>{{ $fiche->antecedents_familiaux }}</td>
                <td>{{ $fiche->maladie_infatiles_contractees }}</td>
                <td>{{ $fiche->antecedent_medicaux }}</td>
                <td>{{ $fiche->allergies }}</td>
                <td>{{ $fiche->intolerance_medicamenteuse }}</td>
                <td>{{ $fiche->traitement_regulier }}</td>
                <td>{{ $fiche->vaccin }}</td>
                <td>{{ $fiche->conclusion }}</td>
                <td>{{ $fiche->name }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
