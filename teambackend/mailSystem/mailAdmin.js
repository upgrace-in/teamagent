const Sendmail = require('./sendMail.js')

function mailToAdmin(toMail, subject, data, liveSiteAdd) {
    if (data.clientReady !== undefined) {
        clientActivelyMsg = `<p>
            <span>Best date and time to call is</span>
            <br />
            <span class="fw-7">On `+data.clientReady+`</span>
        </p>`
    } else {
        clientActivelyMsg = `<p class="fw-7">
            <span id="userFname">Lorenna</span>, would like you to call her first
        </p>`
    }
    html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
            integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
        <link rel="stylesheet" href="`+liveSiteAdd+`/emailTemps/main.css">
    </head>
    
    <body>
        <div class="container mx-auto text-center">
            <div class="col mt-4">
                <img src="`+liveSiteAdd+`/emailTemps/logoWhite.png" alt="">
            </div>
            <div class="col mt-4">
                <img src="`+liveSiteAdd+`/emailTemps/tick.png" alt="">
            </div>
            <p>
                On <span id="dateTime">Jun 30, 2022 @ 6:30 PM</span>
                <br />
                <span id="userName">`+data.name+`'s</span>
                &lt;<span id="emailAddress">`+data.emailAddress+`</span>&gt;
                registered a new lead.
            </p>
            <table class="table table-striped">
                <tr>
                    <td id="leadName">`+data.fname+' '+data.lname+`</td>
                    <td id="leadEmail">`+data.inputEmail+`</td>
                    <td id="leadPhone">`+data.inputPhone+`</td>
                    <td id="loanAmount">$`+data.loanAmt+`</td>
                    <td id="credits">`+data.credits+`</td>
                </tr>
            </table>
            <br />
            <!-- My Client is Ready for Call -->
            `+ clientActivelyMsg + `
            <br />
            <a href="`+liveSiteAdd+`/user" target="_blank" class="btn btn-light">View lead</a>
        </div>
    </body>
    
    </html>`

    Sendmail(toMail, subject, html)
}

module.exports = mailToAdmin
