@php
    use DateTimeImmutable as DateTimeImmutable;
@endphp
<table>
    <thead>
        <tr class="font-bold">
            <th>#</th>
            <th><b>Nom</b></th>
            <th><b>Postnom</b></th>
            <th><b>Prenom</b></th>
            <th><b>Sexe</b></th>
            <th><b>Telephone</b></th>
            <th><b>Email</b></th>
            <th><b>Objet</b></th>
            <th><b>Status</b></th>
            <th><b>Date</b></th>
            <th><b>Employé</b></th>
        </tr>
    </thead>
    <tbody>
        @foreach ($rendezVous as $rdv)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $rdv->nom }}</td>
                <td>{{ $rdv->postnom }}</td>
                <td>{{ $rdv->prenom }}</td>
                <td>{{ $rdv->sexe }}</td>
                <td>{{ $rdv->phone }}</td>
                <td>{{ $rdv->email }}</td>
                <td>{{ $rdv->objet }}</td>
                <td>{{ $rdv->status }}</td>
                <td>
                    @php
                        $date1 = new DateTimeImmutable($rdv->date);
                        $date2 = $date1->format('d-m-Y');
                    @endphp
                    {{ $date2 }}</td>
                <td>{{ $rdv->name }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
