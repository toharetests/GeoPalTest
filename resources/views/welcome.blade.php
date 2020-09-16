<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css" />
        <link rel="stylesheet" href="https://cdn.datatables.net/1.10.21/css/dataTables.bootstrap4.min.css" />

        <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
        <title>GeoPal Techtest</title>
    </head>
    <body class="antialiased">
        <div id="app" class="container-fluid">
            <div id="leaflet-map">
                <div class="leaflet-top leaflet-right">
                    @include('partials.top-right-buttons')
                </div>
            </div>
            @include('partials.upload-modal')
            @include('partials.colour-picker-modal')
            @include('partials.data-table-modal')
        </div>
        <script src="{{ mix('/js/app.js') }}"></script>
        <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"></script>
    </body>
</html>
