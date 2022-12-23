ssh root@167.86.127.254
wJ3aJedHbSQqc

To deploy:
change endpoint 
npm run build
kill the process

lsof -i:7070
kill -9 PID

TODO:
1) Write the css ffor each tempaltes
2) Users phone address on the talk first template

<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;800&display=swap" rel="stylesheet"/>
    <style>
        body {
            font-family: 'Roboto';
            background: #825ea7;
            color: #fff;
            margin: 0;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
        }

        .table {
            color: #fff;
        }

        .fw-7 {
            font-weight: 700;
            font-size: 1.5rem;
        }

        .btn {
            font-weight: 600;
            color: #2a084d !important;
        }


        * {
            margin: auto;
            padding: auto;
        }

        .container {
            width: 80%;
        }

        .text-center {
            text-align: center;
        }

        .mx-auto {
            margin-right: auto;
            margin-left: auto;
        }

        .mt-4 {
            margin-top: 20px;
        }

        td {
            background: #79559d;
            color: #fff;
            border-top: 1px solid #dee2e6;
        }

        .btn {
            border-radius: 10px;
            padding: 15px;
            background: #fff9;
            text-decoration: none;
        }
    </style>