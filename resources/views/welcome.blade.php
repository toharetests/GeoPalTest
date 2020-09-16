<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
        <title>GeoPal Techtest</title>
    </head>
    <body class="antialiased">
        <div id="app" class="container-fluid">
            <div style="height: 100%" id="map-container">
                <div id="leaflet-map"></div>
            </div>
        </div>
        <script src="{{ mix('/js/app.js') }}"></script>

    </body>
</html>
