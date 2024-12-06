<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="google-adsense-account" content="ca-pub-9563406415261822">
        
        <!-- SEO Meta Tags -->
        <meta name="description" content="Cardio Faith - Votre cabinet médical spécialisé en cardiologie. Nous offrons des soins personnalisés pour traiter et prévenir les maladies cardiovasculaires.">
        <meta name="keywords" content="cardiologie, soins cardiaques, prévention cardiovasculaire, maladies cardiaques, santé, Cardio Faith">
        <meta name="author" content="Cardio Faith">
        
        <!-- Open Graph Meta Tags -->
        <meta property="og:title" content="Cardio Faith - Cabinet médical en cardiologie">
        <meta property="og:description" content="Découvrez nos services dédiés à votre santé cardiaque. Cardio Faith est votre partenaire pour une meilleure santé cardiovasculaire.">
        <meta property="og:image" content="https://cardiofaith.com/storage/app/public/images/logo.png">
        <meta property="og:url" content="https://cardiofaith.com/">
        <meta property="og:type" content="website">
        
        <!-- Twitter Card Meta Tags -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Cardio Faith - Cabinet médical en cardiologie">
        <meta name="twitter:description" content="Profitez de soins cardiaques de qualité avec notre équipe d'experts.">
        <meta name="twitter:image" content="https://cardiofaith.com/storage/app/public/images/logo.png">
        
        <!-- Favicon -->
        <link rel="icon" href="/favicon.ico" type="image/x-icon">
        
        <!-- Title -->
        <title inertia>{{ config('app.name', 'Cardio Faith - Cabinet médical en cardiologie') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

