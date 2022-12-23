const Sendmail = require('./sendMail.js')

function signupMail(toMail, subject, liveSiteAdd) {

    
    html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
        <style>
        body {
            background: #e5e1e1;
            color: rgb(80, 80, 80);
        }
        
        .fw-7 {
            font-weight: 700;
            font-size: 1.7rem;
        }
        
        .btn:focus,
        .btn:active {
            outline: none;
            border: none;
            box-shadow: none;
        }
        
        .btn {
            outline: none;
            border: none;
            background: #5f1cb7 !important;
            font-weight: 600;
            color: #fff !important;
        }
        
        .card {
            border-radius: 20px;
        }
        </style>
    </head>
    
    <body>
        <div class="container mx-auto text-center">
            <div class="card col-md-4 mx-auto text-center mt-4">
                <div class="col mt-4">
                    <img src="`+ liveSiteAdd + `/emailTemps/greentick.png" alt="">
                </div>
                <p>
                    <span class="fw-7">Thanks for signing up.</span>
                    <br/>
                    <span>We are excited to get you going</span>
                    <br /><br />
                    <span>Don't forget to upload your leads</span>
                </p>
                <a href="`+ liveSiteAdd + `/user" target="_blank" class="col-md-6 mx-auto text-center btn btn-primary">Upload leads now</a>
                <div class="col mt-4">
                    <img src="`+ liveSiteAdd + `/emailTemps/logoBlack.png" alt="">
                </div>
                <br/><br/>
            </div>
        </div>
    </body>
    
    </html>`

    Sendmail(toMail, subject, html)
}

module.exports = signupMail
