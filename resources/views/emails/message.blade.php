<!DOCTYPE html>
<html lang="en">
@php
    use DateTimeImmutable as DateTimeImmutable;
@endphp

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Newsletter | Cardio faith</title>
</head>

<body style=" width: 100%;">
    @php
        $photo = 'https://cardiofaith.com/storage/app/public/images/logo.png';
    @endphp
    <div style="width: 100%; display: flex; justify-content: center;  align-items: center">
        <img src="{{ $photo }}" alt="icon" style=" height: 100px;  width: auto; background-size: cover">
    </div>

    <p
        style=" text-align: justify; font-size: 18px; text-indent: 0.75rem; line-height: 25px; color: rgb(55 65 81); font-weight: 600; margin-bottom: 1.25rem; margin-top: 1.25rem; margin-top: 10px;">
        {{ $info['message'] }}
    </p>

    <div
        style="font-size: 18px; line-height: 25px; color: rgb(55 65 81); font-weight: 600; margin-bottom: 1.25rem; margin-top: 1.25rem;">
        Ce message vous est envoyé car vous avez eu à reserver au moins une fois un rendez vous dans notre cabinet
        médtical
    </div>

    <div style="font-size: 18px; line-height: 25px; color: rgb(55 65 81; font-weight: 600;">
        <p>Adresse : <b>25, Avenue de l'OUA, Q/Basoko, C/Ngaliema. Ville province de Kinshasa</b></p>
        <p>Telephone : <b><a href="tel:+243859039494">243 85 90 39 494</a></b></p>
    </div>
</body>

</html>
