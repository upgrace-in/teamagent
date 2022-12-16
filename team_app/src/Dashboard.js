import { useState, useEffect } from "react"
import $ from 'jquery'
import LeadTable from './subComp/LeadTable'
import './dashboard.css'

export default function Dashboard(props) {

    const [formState, setformState] = useState(1)

    const [clientReadyMsg, setclientReadyMsg] = useState(0)

    const [clientReadyStatus, setclientReadyStatus] = useState(-1)
    const [clientActively, setclientActively] = useState(-1)
    const [offerAcceptedStatus, setofferAcceptedStatus] = useState(-1)

    const [disableBtn, setdisableBtn] = useState(false)

    const [leadData, setleadData] = useState('')
    const [Msg, setMsg] = useState('')

    let session;
    let leadInfo = {};

    if (props.session === null) {
        window.location.href = '/'
    } else {
        session = JSON.parse(props.session);
        let uname = (session['emailAddress']).split('@')[0]
        $('.username').html(uname);
        props.calculator($('.loanAmount2'), $('.credits'))
    }
    $('.hide_it').hide()

    // useEffect(() => {
    //     fetch(props.endpoint + '/fetchLeads?emailAddress=' + session['emailAddress'], {
    //         method: 'GET',
    //         headers: { "Content-Type": "application/json" }
    //     }).then(function (response) {
    //         return response.json()
    //     }).then(function (val) {
    //         if (val['msg']) {
    //             // Fill leads
    //             let leadData = []
    //             let count = 0
    //             val['data'].map(data => {
    //                 ++count
    //                 leadData.push(<LeadTable count={count} leadname={data['name']} leadamt={data['loanAmt']} leadstatus={data['approved'] === false ? "Waiting" : "Approved"} />);
    //             });
    //             setleadData(leadData)

    //         } else {
    //             // No Leads
    //             setleadData(<LeadTable leadname='...' leadamt='...' leadstatus='...' />)
    //         }
    //     });
    // }, [])

    function submitIt(leadInfo) {
        fetch(props.endpoint + '/addLead', {
            method: 'POST',
            body: JSON.stringify(leadInfo),
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            return response.json()
        }).then(function (val) {
            if (val['msg']) {
                setMsg("Awesome! You are all set. See you at closing!")
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else {
                setMsg("Something went wrong...")
            }
        });
    }

    const submitLeadData = (e) => {

        e.preventDefault()
        setdisableBtn(true)
        setMsg('Processing...')

        leadInfo.length = 0;

        let fname = $('#inputfirstName').val()
        let lname = $('#inputlastName').val()
        let loanAmt = $('#inputloanAmt').val()
        let inputEmail = $('#inputEmail').val()
        let inputPhone = $('#inputPhone').val()

        let inputAddress = $('#inputAddress').val()
        let selectedloadOfficer = $('#selectedloadOfficer').val()
        let inputclosingdate = $('#inputclosingdate').val()

        try {
            if ((fname !== '') &&
                (lname !== '') &&
                (loanAmt !== '') &&
                (inputEmail !== '') &&
                (inputPhone !== '') &&
                (clientActively != -1) &&
                (clientReadyStatus != -1) &&
                (offerAcceptedStatus != -1)) {

                leadInfo.fname = fname
                leadInfo.lname = lname
                leadInfo.loanAmt = loanAmt
                leadInfo.inputEmail = inputEmail
                leadInfo.inputPhone = inputPhone
                leadInfo.emailAddress = session['emailAddress']

                // Checking client ready status 
                let dateTime = $('#dateTime').val()
                if (dateTime != '') {
                    if (clientReadyStatus === 1) {
                        leadInfo.clientReady = dateTime;
                    } else {
                        leadInfo.talkFirst = dateTime;
                    }
                } else {
                    throw new Error;
                }

                // Checking client actively yes or no
                if (clientActively === 1) {
                    leadInfo.clientActivelyLooking = true
                } else if (clientActively === 0) {
                    leadInfo.clientActivelyLooking = false
                } else {
                    throw new Error;
                }

                // Checking client accepted yes or no + fields
                if (offerAcceptedStatus === 1) {
                    if ((inputAddress != '') &&
                        (selectedloadOfficer != '') &&
                        (inputclosingdate != '')) {
                        leadInfo.offerAcceptedStatus = {
                            "selectedloadOfficer": selectedloadOfficer,
                            "inputAddress": inputAddress,
                            "inputclosingdate": inputclosingdate
                        }
                    } else {
                        throw new Error;
                    }
                } else if (offerAcceptedStatus === 0) {
                    leadInfo.offerAccepted = false
                } else {
                    throw new Error;
                }

                console.log(leadInfo)

                submitIt(leadInfo)

            } else {
                throw new Error;
            }
        } catch (e) {
            setMsg("Please enter valid data !!!")
            setdisableBtn(false)
        }
    }

    return (
        <>

            <div className="sideCon">
                <button className="thm-btn sp">Welcome: <span className="username"></span></button>
                <button className="thm-btn sp"><a href="#" style={{ color: 'white' }}>Credits: $2750</a></button>
            </div>

            <main>
                <div className="flex-shrink-0 p-3 bg-white" style={{ "width": 15 + "%" }}>
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
                                    <li><a href="/logout" className="link-dark rounded">Logout</a></li>
                                    <li><a href="#" className="link-dark rounded">Contact Us</a></li>
                                    <li><a href="#" className="link-dark rounded">FAQ</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="padTop">
                    <div className={formState === 1 ? "show popup col-md-12" : "hide"}>
                        <section className='popDiv col-md-12 elementor-section elementor-top-section elementor-element elementor-element-9c276d4 elementor-section-full_width elementor-section-height-default elementor-section-height-default'
                            data-id="9c276d4" data-element_type="section" style={{ marginTop: 0 + 'px' }}>
                            <div className="elementor-container elementor-column-gap-no">
                                <div
                                    className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-a3457b0"
                                    data-id="a3457b0" data-element_type="column">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                        <div
                                            className="elementor-element elementor-element-9aa5474 elementor-widget elementor-widget-qutiiz-contact-form"
                                            data-id="9aa5474" data-element_type="widget" data-widget_type="qutiiz-contact-form.default">
                                            <div className="elementor-widget-container">

                                                <section className='contact-page contact-page-two cpa'>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-xl-12">
                                                                <div className="contact-page__form">
                                                                    <div role="form" className="wpcf7" id="wpcf7-f169-p592-o1" lang="en-US" dir="ltr">
                                                                        <div className="mx-auto text-left">
                                                                            <h1>Lead Info</h1>
                                                                            <br />
                                                                        </div>
                                                                        <form className="wpcf7-form init">
                                                                            <div className="comment-one__form ">
                                                                                <div className='row'>
                                                                                    <div className="col-xl-6">
                                                                                        <div className="comment-form__input-box">
                                                                                            <span className="wpcf7-form-control-wrap"
                                                                                                data-name="your-name">
                                                                                                <input id="inputfirstName" type="text" size="40"
                                                                                                    className="wpcf7-form-control wpcf7-text"
                                                                                                    aria-required="true" aria-invalid="false" placeholder="First Name" /></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-xl-6">
                                                                                        <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                                                                                            data-name="your-name"><input id="inputlastName" type="text" size="40"
                                                                                                className="wpcf7-form-control wpcf7-text"
                                                                                                aria-required="true" aria-invalid="false" placeholder="Last Name" /></span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='row'>
                                                                                    <div className="col-xl-6">
                                                                                        <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                                                                                            data-name="your-phone"><input id="inputloanAmt" type="number" size="40"
                                                                                                className="loanAmount2 wpcf7-form-control wpcf7-text" aria-invalid="false"
                                                                                                placeholder="Loan Amount" /></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-xl-6">
                                                                                        <div className="comment-form__input-box creditText">
                                                                                            Credits: <b className="credits">$0</b>
                                                                                            <h6>Estimated Credits Upon Closing</h6>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-xl-6">
                                                                                        <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                                                                                            data-name="your-email"><input id="inputEmail" type="email"
                                                                                                size="40"
                                                                                                className="wpcf7-form-control wpcf7-text"
                                                                                                aria-required="true" aria-invalid="false"

                                                                                                placeholder="Email" /></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-xl-6">
                                                                                        <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                                                                                            data-name="your-email"><input id="inputPhone" type="number"
                                                                                                size="40"
                                                                                                className="wpcf7-form-control wpcf7-text"
                                                                                                aria-required="true" aria-invalid="false"

                                                                                                placeholder="Phone" /></span>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                                <div className="row pd-left">
                                                                                    <div className="col-xl-6">
                                                                                        <div className="comment-form__input-box">
                                                                                            <span className="wpcf7-form-control-wrap">
                                                                                                <div onClick={() => { setclientReadyStatus(1); setclientReadyMsg(1) }} className="custom-control custom-radio custom-control-inline">
                                                                                                    <input type="radio" id="clientReadyStatus" name="clientReadyStatus" className="input2 custom-control-input" />
                                                                                                    <label className="custom-control-label" htmlFor="clientReadyStatus">My Client is Ready for a Call</label>
                                                                                                </div>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-xl-6">
                                                                                        <div className="comment-form__input-box">
                                                                                            <span className="wpcf7-form-control-wrap">
                                                                                                <div onClick={() => { setclientReadyStatus(1); setclientReadyMsg(0) }} className="custom-control custom-radio custom-control-inline">
                                                                                                    <input type="radio" id="clientReadyStatus2" name="clientReadyStatus" className="input2 custom-control-input" />
                                                                                                    <label className="custom-control-label" htmlFor="clientReadyStatus2">Let's Talk First</label>
                                                                                                </div>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={clientReadyStatus === 1 ? "show col-xl-12" : "hide col-xl-12"} style={{ background: '#fff', borderRadius: '10px' }}>
                                                                                        <div className="comment-form__input-box" style={{ padding: 20 + 'px' }}>
                                                                                            <p>{clientReadyMsg === 1 ? "Awesome! Please confirm your client is expecting our call. Please give us the best day and time to contact your client" : "We won't contact your client until you give us the green light. What's the best time to connect with you?"}</p>
                                                                                            <span className="wpcf7-form-control-wrap"
                                                                                                data-name="your-email">
                                                                                                <input id="dateTime" type="datetime-local" size="40" className="wpcf7-form-control wpcf7-text" />
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row pd-left">
                                                                                    <label>Is your client actively looking?</label>
                                                                                    <div className="col-xl-6">
                                                                                        <div className="comment-form__input-box">
                                                                                            <span className="wpcf7-form-control-wrap">
                                                                                                <div onClick={() => setclientActively(1)} className="custom-control custom-radio custom-control-inline">
                                                                                                    <input type="radio" id="customRadioInline3" name="customRadioInline3" className="input2 custom-control-input" />
                                                                                                    <label className="custom-control-label" htmlFor="customRadioInline3">Yes</label>
                                                                                                </div>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-xl-6">
                                                                                        <div className="comment-form__input-box">
                                                                                            <span className="wpcf7-form-control-wrap">
                                                                                                <div onClick={() => setclientActively(0)} className="custom-control custom-radio custom-control-inline">
                                                                                                    <input type="radio" id="customRadioInline4" name="customRadioInline3" className="input2 custom-control-input" />
                                                                                                    <label className="custom-control-label" htmlFor="customRadioInline4">No</label>
                                                                                                </div>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row pd-left">
                                                                                    <label>Has offer been Accepted?</label>
                                                                                    <div className="col-xl-6">
                                                                                        <div className="comment-form__input-box">
                                                                                            <span className="wpcf7-form-control-wrap">
                                                                                                <div onClick={() => setofferAcceptedStatus(1)} className="custom-control custom-radio custom-control-inline">
                                                                                                    <input type="radio" id="customRadioInline5" name="customRadioInline5" className="input2 custom-control-input" />
                                                                                                    <label className="custom-control-label" htmlFor="customRadioInline5">Yes</label>
                                                                                                </div>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-xl-6">
                                                                                        <div className="comment-form__input-box">
                                                                                            <span className="wpcf7-form-control-wrap">
                                                                                                <div onClick={() => setofferAcceptedStatus(0)} className="custom-control custom-radio custom-control-inline">
                                                                                                    <input type="radio" id="customRadioInline6" name="customRadioInline5" className="input2 custom-control-input" />
                                                                                                    <label className="custom-control-label" htmlFor="customRadioInline6">No</label>
                                                                                                </div>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={offerAcceptedStatus === 1 ? "show shownCon col-xl-12" : "hide shownCon col-xl-12"}>
                                                                                        <label>Great Job!!!</label>
                                                                                        <div className="col-xl-12">
                                                                                            <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                                                                                                data-name="your-name"><input id="inputAddress" type="text" size="40"
                                                                                                    className="wpcf7-form-control wpcf7-text"
                                                                                                    aria-required="true" aria-invalid="false" placeholder="Address" /></span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-xl-12">
                                                                                            <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                                                                                                data-name="your-name">
                                                                                                <select className="form-select" id="selectedloadOfficer">
                                                                                                    <option value="0" defaultValue>Select your LEAD Officer</option>
                                                                                                    <option value="Victor MacCliff">Victor MacCliff</option>
                                                                                                    <option value="Sam Zepeda">Sam Zepeda</option>
                                                                                                    <option value="Gabe Lozano">Gabe Lozano</option>
                                                                                                </select>
                                                                                            </span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-xl-12">
                                                                                            <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                                                                                                data-name="your-name">
                                                                                                <label>Expected Closing Date:</label>
                                                                                                <input id="inputclosingdate" type="date" size="40"
                                                                                                    className="wpcf7-form-control wpcf7-text" placeholder="Expected Closing Date" /></span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={offerAcceptedStatus === 0 ? "show shownCon col-xl-12" : "hide shownCon col-xl-12"}>
                                                                                        <div className="offerNotAccepted mx-auto text-center col-md-8">
                                                                                            <p style={{ padding: 5 + 'px' }}>No problem. You can wait to get your offer accepted or add a credit card so not to delay your marketing campaign.</p>
                                                                                            <button onClick={submitLeadData} type="submit" className="tb thm-btn">Add Credit Card</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-xl-12 pd-left">
                                                                                    <div className="comment-form__input-box">
                                                                                        <span className="wpcf7-form-control-wrap">
                                                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                                                <input onClick={() => { setdisableBtn(!disableBtn); console.log(!disableBtn) }} type="checkbox" id="accept" name="accept" className="input2 custom-control-input" />
                                                                                                <label className="custom-control-label">I accept to lead generation <a target="_blank" style={{ color: 'blue' }} href="https://docs.google.com/document/d/1rwrycIQmI2_m5CXppq6IVmafzJtIF3Wo/">terms & conditions</a></label>
                                                                                            </div>
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="wpcf7-response-output" style={{ display: 'block', color: 'red' }}>
                                                                                    {Msg}
                                                                                </div>
                                                                                <div className="row mx-auto text-left" style={{ marginBottom: 20 + 'px' }}>
                                                                                    <div className="col-md-12">
                                                                                        {/* <button onClick={submitLeadData} type="submit" disabled={disableBtn == true ? true : false} className="tb thm-btn">Add Lead</button> */}
                                                                                        <button onClick={submitLeadData} type="submit" className="tb thm-btn">Add Lead</button>
                                                                                    </div>
                                                                                    {/* <div className="col-md-6">
                                                                                        <button type="button" onClick={() => setformState(0)} className="tb thm-btn">Go Back</button>
                                                                                    </div> */}
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </main>

        </>
    )
}