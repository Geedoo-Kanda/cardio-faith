@php
    use DateTimeImmutable as DateTimeImmutable;
@endphp
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Rendez-vous | Cardio faith</title>
</head>

<body style=" width: 100%;">
    @php
        $photo = 'https://cardiofaith.com/storage/app/public/images/logo.png';
        $date1 = new DateTimeImmutable($user->date);
        $date2 = $date1->format('d-m-Y');
    @endphp

    <div style="width: 100%; display: flex; justify-content: center;  align-items: center">
        <img src="{{ $photo }}" alt="icon" style=" height: 100px;  width: auto; background-size: cover">
    </div>

    <div
        style="font-size: 18px; line-height: 25px; color: rgb(55 65 81); font-weight: 600; margin-bottom: 1.25rem; margin-top: 1.25rem;">
        Bonjour Mr/Mme <b>{{ $user->nom }} {{ $user->postnom }} {{ $user->prenom }}</b>, nous esperons que ce mail vous trouvera en bonne santé.
        <br>
        <br>
        Nous vous rappellons votre rendez-vous de demain le <b>{{ $date2 }}</b> dans notre cabinet Cardio faith
        apropos de <b>{{ $user->objet }}</b>
        <br>
        <br>

    </div>

    <div
        style="font-size: 18px; line-height: 25px; color: rgb(55 65 81); font-weight: 600; margin-bottom: 1.25rem; margin-top: 1.25rem;">
        Ce message vous est envoyé car vous avez été enregistrer pour un rendez vous dans notre rendez-vous
    </div>

    <div
        style="font-size: 18px; line-height: 25px; color: rgb(55 65 81; font-weight: 600;">
        <p>Adresse : <b>25, Avenue de l'OUA, Q/Basoko, C/Ngaliema. Ville province de Kinshasa</b></p>
        <p>Telephone : <b><a href="tel:+243859039494">243 85 90 39 494</a></b></p>
    </div>
</body>

</html>
