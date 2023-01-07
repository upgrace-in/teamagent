import { useState, useEffect } from "react"
import $ from 'jquery'
import LeadTable from '../subComp/LeadTable'
import '../dashboard.css'
import Receipts from "./Receipts"
import Leads from "./Leads"

export default function Dashboard(props) {

    const [formState, setformState] = useState('Leads')

    const [disableBtn, setdisableBtn] = useState(true)

    const [leadData, setleadData] = useState('')
    const [receiptsData, setreceiptsData] = useState('')
    const [Msg, setMsg] = useState('')

    let session;

    // Chekcing is the users session is their   
    if (props.session === null) {
        window.location.href = '/'
    } else {
        session = props.session
    }
    $('.hide_it').hide()

    async function fetchLeads() {
        fetch(props.endpoint + '/fetchAllLeads', {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            return response.json()
        }).then(function (val) {
            if (val['msg']) {
                // Fill leads
                let leadData = []
                val['data'].map(data => {
                    leadData.push(<Leads 
                        useremailAddress={data.emailAddress} 
                        deleteLead={deleteLead} 
                        key={data['uid']} 
                        uid={data['uid']} 
                        transaction={data['transaction']} 
                        leadname={data['fname']} 
                        leadmail={data['inputEmail']} 
                        phone={data['inputPhone']} 
                        leadamt={data['loanAmt']} 
                        leadstatus={data['offerAcceptedStatus'] === false ? "Not Yet" : "Approved"} />);
                });
                setleadData(leadData)
            } else {
                // No Leads
                setleadData('')
            }
        });
    }

    async function deleteLead(uid, emailAddress, leadMailAddress) {
        fetch(props.endpoint + '/deleteLead', {
            method: 'POST',
            body: JSON.stringify({ uid, emailAddress, leadMailAddress }),
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            return response.json()
        }).then(function (val) {
            console.log(val);
            if (val['msg']) {
                alert("Lead Deleted !!!")
                fetchLeads()
            } else {
                alert("Something went wrong !!!")
            }
        });
    }

    async function fetchReceipts() {
        fetch(props.endpoint + '/fetchAllReceipts', {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            return response.json()
        }).then(function (val) {
            console.log(val);
            if (val['msg']) {
                // Fill leads
                let receiptsData = []
                val['data'].map(data => {
                    receiptsData.push(<Receipts endpoint={props.endpoint} key={data['uid']} uid={data['uid']} leadUID={data['leadUID']} emailAddress={data['emailAddress']} imageFile={data['imageFile']} inputRecAmt={data['inputRecAmt']} inputtxnAdd={data.inputtxnAdd} />);
                });
                setreceiptsData(receiptsData)
            } else {
                // No Leads
                setreceiptsData('')
            }
        });
    }

    useEffect(() => {
        fetchLeads()
        fetchReceipts()
        setTimeout(() => {
            props.checkUserExists(props.session)
        }, 1000)
    }, [''])


    return (
        <>

            <div className="sideCon">
                <button className="thm-btn sp">Welcome: <span className="username"></span></button>
            </div>

            <main>
                <div className="flex-shrink-0 p-3 bg-white" style={{ "width": 15 + "%", height: 100 + 'vh' }}>
                    <a href="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
                        style={{
                            background: '#000',
                            padding: '10px'
                        }}>

                        <img className="mx-auto text-center" src="/static/wp-content/uploads/2022/11/aa-horizontal-logo-175x40-1.webp" />

                    </a>
                    <ul className="list-unstyled ps-0">
                        <li className="mb-1">
                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse"
                                data-bs-target="#home-collapse" aria-expanded="true">
                                Main
                            </button>
                            <div className="collapse show" id="home-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a onClick={() => setformState('Leads')} className="cur link-dark rounded">Leads</a></li>
                                    <li><a onClick={() => setformState('Receipts')} className="cur link-dark rounded">Receipts</a></li>
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
                                    <li><a href="/logout" className="link-dark rounded">Logout</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="sideTop" style={{ "width": 100 + "%" }}>

                    <div className="padTop">
                        {/* Leads Table */}
                        <div id="leadTableCon" className={formState == 'Leads' ? 'show mx-auto col-md-12' : 'hide'}>
                            <h1>Leads</h1>
                            <br />
                            <table className="table table-stripe">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Lead Name</th>
                                        <th scope="col">Lead Email</th>
                                        <th scope="col">Lead Phone</th>
                                        <th scope="col">Loan Amount</th>
                                        <th scope="col">Credits</th>
                                        <th scope="col">Offer Accepted</th>
                                        <th scope="col">Transaction</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="leadData">
                                    {leadData !== '' ? leadData :
                                        <tr>
                                            <th scope="col">...</th>
                                            <th scope="col">...</th>
                                            <th scope="col">...</th>
                                            <th scope="col">...</th>
                                            <th scope="col">...</th>
                                            <th scope="col">...</th>
                                            <th scope="col">...</th>
                                            <th scope="col">...</th>
                                        </tr>}
                                </tbody>
                            </table>
                        </div>

                        <div id="leadTableCon" className={formState == 'Receipts' ? 'show mx-auto col-md-12' : 'hide'}>
                            <h1>Receipts</h1>
                            <br />
                            <table className="table table-stripe">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Lead ID</th>
                                        <th scope="col">User's Email</th>
                                        <th scope="col">Receipt</th>
                                        <th scope="col">Receipt Amount</th>
                                        <th scope="col">Transaction Address</th>
                                    </tr>
                                </thead>
                                <tbody id="leadData">
                                    {receiptsData !== '' ? receiptsData :
                                        <tr>
                                            <th scope="col">...</th>
                                            <th scope="col">...</th>
                                            <th scope="col">...</th>
                                            <th scope="col">...</th>
                                            <th scope="col">...</th>
                                            <th scope="col">...</th>
                                        </tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </main>

        </>
    )
}
