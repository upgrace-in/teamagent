import { useState, useEffect } from "react"
import $ from 'jquery'
import './dashboard.css'

export default function Dashboard(props) {

    const [state, setDivState] = useState(1)
    const [Msg, setMsg] = useState('');
    let session

    if (props.session == null) {
        window.location.href = '/'
    } else {
        session = JSON.parse(props.session)
    }
    $('.hide_it').hide()

    const submitLeadData = (e) => {

        e.preventDefault()
        setMsg('')
        let name = $('#inputName').val()
        let loadAmt = $('#inputloadAmt').val()
        let inputAddress = $('#inputAddress').val()
        let selectedloadOfficer = $('#selectedloadOfficer').val()
        if ((name !== '') && (loadAmt !== '') && (inputAddress !== '') && (parseInt(selectedloadOfficer) !== 0)) {

            fetch(props.endpoint + '/addLead', {
                method: 'POST',
                body: JSON.stringify({
                    "name": name,
                    "loadAmt": loadAmt,
                    "inputAddress": inputAddress,
                    "selectedloadOfficer": selectedloadOfficer,
                    "emailAddress": session['emailAddress']
                }),
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                return response.json()
            }).then(function (val) {
                if (val['msg']) {
                    setMsg("Lead Submitted !!!")
                }else{
                    setMsg("Something went wrong...")
                }
            });

        } else {

            setMsg("Please enter valid data !!!")

        }
    }

    return (
        <>
            <header className="sideCon">
                <button onClick={() => setDivState(1)} className="btn btn-primary sp">+ Add Lead</button>
                <button className="btn btn-primary sp">Logout</button>
            </header>
            <div className={state == 1 ? 'show' : 'hide'}>
                <div className="mx-auto text-center col-md-6">
                    <div class="form-group">
                        <input id="inputName" type="text" class="form-control" placeholder="Name" />
                    </div>
                    <div class="form-group">
                        <input id="inputAddress" type="text" class="form-control" placeholder="Address" />
                    </div>
                    <div class="form-group">
                        <input id="inputloadAmt" type="text" class="form-control" placeholder="Loan Amount" />
                    </div>
                    <select class="form-select" id="selectedloadOfficer">
                        <option value="0" selected>Select your LEAD Officer</option>
                        <option value="Victor MacCliff">Victor MacCliff</option>
                        <option value="Sam Zepeda">Sam Zepeda</option>
                        <option value="Gabe Lozano">Gabe Lozano</option>
                    </select>
                    <div className="wpcf7-response-output" style={{ display: 'block', color: 'red' }}>
                        {Msg}
                    </div>
                    <button onClick={submitLeadData} class="btn btn-primary">ADD</button>
                </div>
            </div>
        </>
    )
}