@php
    use DateTimeImmutable as DateTimeImmutable;
@endphp
<table>
    <thead>
        <tr class="font-bold">
            <th>#</th>
            <th><b>Date</b></th>
            <th><b>Operation</b></th>
            <th><b>Montant</b></th>
            <th><b>Solde</b></th>
            <th><b>Libele</b></th>
            <th><b>Employé</b></th>
        </tr>
    </thead>
    <tbody>
        @foreach ($caisse as $cais)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>
                    @php
                        $date1 = new DateTimeImmutable($cais->created_at);
                        $date2 = $date1->format('d-m-Y');
                    @endphp
                    {{ $date2 }}
                </td>
                <td>{{ $cais->operation }}</td>
                <td>{{ $cais->montant }} $</td>
                <td>{{ $cais->solde }} $</td>
                <td>{{ $cais->libele }}</td>
                <td>{{ $cais->name }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
