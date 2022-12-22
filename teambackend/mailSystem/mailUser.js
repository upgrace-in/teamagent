const Sendmail = require('./sendMail.js')

function mailToUser(toMail, subject, data, liveSiteAdd) {

    html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
            integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
        <link rel="stylesheet" href="`+liveSiteAdd+`/emailTemps/userEmail.css">
    </head>
    
    <body>
        <div class="container mx-auto text-center">
            <div class="card col-md-4 mx-auto text-center mt-4">
                <div class="col mt-4">
                    <img src="`+liveSiteAdd+`/emailTemps/greentick.png" alt="">
                </div>
                <p>
                    <span class="fw-7">`+data.fname+' '+data.lname+`</span>
                    <br/>
                    <span>Has been successfully uploaded</span>
                    <br /><br />
                    <span>If you need to edit lead info click below</span>
                </p>
                <a href="`+liveSiteAdd+`/user" target="_blank" class="col-md-6 mx-auto text-center btn btn-light">View lead</a>
                <div class="col mt-4">
                    <img src="`+liveSiteAdd+`/emailTemps/logoBlack.png" alt="">
                </div>
                <br/><br/>
            </div>
        </div>
    </body>
    
    </html>`

    Sendmail(toMail, subject, html)
}

module.exports = mailToUser
