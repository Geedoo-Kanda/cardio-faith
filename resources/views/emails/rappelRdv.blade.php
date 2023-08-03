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
        $photo = 'https://upformychurch.com/public/img/UMC.png';
    @endphp
    <div style="width: 100%; display: flex; justify-content: center;  align-items: center">
        <img src="{{ $photo }}" alt="icon" style=" height: 100px;  width: auto; background-size: cover">
    </div>

<div>
    {{$user}}
</div>

    <table>
        <tr>
            <th scope="col">Player</th>
            <th scope="col">Gloobles</th>
        </tr>
        <tr>
            <th scope="row">TR-7</th>
            <td>7</td>
        </tr>
    </table>

    <div
        style="font-size: 18px; line-height: 25px; color: rgb(55 65 81); font-weight: 600; margin-bottom: 1.25rem; margin-top: 1.25rem;">
        Ce message vous est envoyé car vous avez été enregistrer pour un rendez vous
    </div>

    <div
        style=" display: grid; grid-column: 50% 50%; font-size: 18px; line-height: 25px; color: rgb(55 65 81; font-weight: 600;">
        <p>Adresse : </p>
        <p><b>N° 443, 11 ème rue LIMETE Quartier Indistriel Kinshsa, République Democratique du Congo</b></p>
        <p>Telephone :</p>
        <p> <b><a href="tel:+243 82 83 11 735">+243 82 83 11 735</a></b></p>
        <p>Facebook : </p>
        <p><b><a href="https://web.facebook.com/Up-for-My-Church-110061315045828/?_rdc=1&_rdr">Up for my
                    church</a></b></p>
        <p>Instragram : </p>
        <p><b><a href="https://www.instagram.com/upformychurch/">upformychurch</a></b></p>
    </div>
</body>

</html>
