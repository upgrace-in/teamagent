import { useState, useEffect } from "react"
import $ from 'jquery'
import './dashboard.css'

export default function Dashboard(props) {

    const [state, setDivState] = useState(0)
    const [Msg, setMsg] = useState('');
    let session

    if (props.session == null) {
        window.location.href = '/'
    } else {
        session = JSON.parse(props.session)
    }
    $('.hide_it').hide()

    useEffect(() => {
        fetch(props.endpoint + '/fetchLeads?emailAddress='+session['emailAddress'], {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            return response.json()
        }).then(function (val) {
            if (val['msg']) {
                // Fill leads
            } else {
                // No Leads
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
                        setDivState(0)
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
            <header className="sideCon">
                <button onClick={() => setDivState(1)} className="btn btn-primary sp">+ Add Lead</button>
                <button className="btn btn-primary sp"><a href="/logout" style={{color: 'white'}}>Logout</a></button>
            </header>

            <section
                className="elementor-section elementor-top-section elementor-element elementor-element-9c276d4 elementor-section-full_width elementor-section-height-default elementor-section-height-default"
                data-id="9c276d4" data-element_type="section" style={{marginTop: 0+'px'}}>
                <div className="elementor-container elementor-column-gap-no">
                    <div
                        className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-a3457b0"
                        data-id="a3457b0" data-element_type="column">
                        <div className="elementor-widget-wrap elementor-element-populated">
                            <div
                                className="elementor-element elementor-element-9aa5474 elementor-widget elementor-widget-qutiiz-contact-form"
                                data-id="9aa5474" data-element_type="widget" data-widget_type="qutiiz-contact-form.default">
                                <div className="elementor-widget-container">

                                    <section className={state == 1 ? 'show contact-page contact-page-two' : 'hide'}>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-xl-12">
                                                    <div className="contact-page__form">
                                                        <div role="form" className="wpcf7" id="wpcf7-f169-p592-o1" lang="en-US" dir="ltr">
                                                            <div className="mx-auto text-center">
                                                                <h1>Create Lead</h1>
                                                                <br />
                                                            </div>
                                                            <form className="wpcf7-form init">
                                                                <div className="comment-one__form ">
                                                                    <div className='row'>
                                                                        <div className="col-xl-6">
                                                                            <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                                                                                data-name="your-name"><input id="inputName" type="text" size="40"
                                                                                    className="wpcf7-form-control wpcf7-text"
                                                                                    aria-required="true" aria-invalid="false" placeholder="Lead Name" /></span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xl-6">
                                                                            <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                                                                                data-name="your-phone"><input id="inputloadAmt" type="number" size="40"
                                                                                    className="wpcf7-form-control wpcf7-text" aria-invalid="false"
                                                                                    placeholder="Loan Amount" /></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xl-12">
                                                                        <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                                                                            data-name="your-email"><input id="inputAddress" type="text"
                                                                                size="40"
                                                                                className="wpcf7-form-control wpcf7-text"
                                                                                aria-required="true" aria-invalid="false"

                                                                                placeholder="Address" /></span>
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
                                                                    <div className="wpcf7-response-output" style={{ display: 'block', color: 'red' }}>
                                                                        {Msg}
                                                                    </div>
                                                                    <div className="row">
                                                                        <button onClick={submitLeadData} type="submit" className="thm-btn comment-form__btn">Add Lead</button>
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
        </>
    )
}