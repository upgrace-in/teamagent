import { useState, useEffect } from "react"
import $ from 'jquery'
import LeadTable from './subComp/LeadTable'
import './dashboard.css'

export default function Dashboard(props) {

    const [formState, setformState] = useState(0)
    const [leadData, setleadData] = useState('')
    const [Msg, setMsg] = useState('');
    let session

    if (props.session == null) {
        window.location.href = '/'
    } else {
        session = JSON.parse(props.session)
    }
    $('.hide_it').hide()

    useEffect(() => {
        fetch(props.endpoint + '/fetchLeads?emailAddress=' + session['emailAddress'], {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            return response.json()
        }).then(function (val) {
            if (val['msg']) {
                // Fill leads
                let leadData = []
                let count = 0
                val['data'].map(data => {
                    ++count
                    leadData.push(<LeadTable count={count} leadname={data['name']} leadamt={data['loadAmt']} leadstatus={data['approved'] === false ? "Waiting" : "Approved"} />);
                });
                setleadData(leadData)

            } else {
                // No Leads
                setleadData(<LeadTable leadname='...' leadamt='...' leadstatus='...' />)
            }
        });
    }, [])

    const submitLeadData = (e) => {

        e.preventDefault()
        setMsg('Processing...')
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
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)
                } else {
                    setMsg("Something went wrong...")
                }
            });

        } else {
            setMsg("Please enter valid data !!!")
        }
    }

    return (
        <>



            <main>
                <h1 className="visually-hidden">Sidebars examples</h1>


                <div className="flex-shrink-0 p-3 bg-white" style={{ "width": 220 + "px" }}>
                    <a href="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
                        style={{
                            background: '#000',
                            padding: '10px'
                        }}>

                        <img src="/static/wp-content/uploads/2022/11/aa-horizontal-logo-175x40-1.webp" />

                    </a>
                    <ul className="list-unstyled ps-0">
                        <li className="mb-1">
                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse"
                                data-bs-target="#home-collapse" aria-expanded="true">
                                Main
                            </button>
                            <div className="collapse show" id="home-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="/" className="link-dark rounded">Home</a></li>
                                    <li><a href="#" className="link-dark rounded">Leads</a></li>
                                    <li><a href="#" className="link-dark rounded">Account</a></li>
                                    <li><a href="/#calculator" className="link-dark rounded">Calculator</a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="mb-1">
                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse"
                                data-bs-target="#dashboard-collapse" aria-expanded="true">
                                Reciepts
                            </button>
                            <div className="collapse show" id="dashboard-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="#" className="link-dark rounded">Upload</a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="mb-1">
                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse"
                                data-bs-target="#orders-collapse" aria-expanded="false">
                                Support
                            </button>
                            <div className="collapse show" id="orders-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="#" className="link-dark rounded">Contact Us</a></li>
                                    <li><a href="#" className="link-dark rounded">FAQ</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="b-example-divider"></div>

            </main>

        </>
    )
}