import { useEffect, useState } from "react"

export default function Account(props) {

    useEffect(() => {
    }, [])

    return (
        <div className={props.formState === 'Account' ? 'show' : 'hide'}>
            <h1>My Account</h1>
            <br />
            <div className="row">
                <div className="col-md-4">
                    <div className="accCON">
                        <div className="row">
                            <div className="conw col-md-3">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="conw col-md-9">
                                <h3>My Account</h3>
                                <p>Edit your name or change your password</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="accCON">
                        <div className="row">
                            <div className="conw col-md-3">
                                <i className="fas fa-house-user"></i>
                            </div>
                            <div className="conw col-md-9">
                                <h3>Billing Address</h3>
                                <p>Setup your billing address</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Register endpoint={props.endpoint} Msg={Msg} setMsg={setMsg} formSwitch={formSwitch} setformSwitch={setformSwitch} loginUser={loginUser} /> */}
        </div>
    )
}