import { useEffect, useState } from "react"
import Register from './Register'

export default function Account(props) {

    const [Msg, setMsg] = useState('')
    const [formSwitch, setformSwitch] = useState(-1)

    function loginUser(session) {
        console.log(session)
        localStorage.setItem("session", JSON.stringify(session))
        window.location.href = '/dashboard'
    }

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
            <Register session={props.session} endpoint={props.endpoint} Msg={Msg} setMsg={setMsg} formSwitch={formSwitch} setformSwitch={setformSwitch} loginUser={loginUser} />
        </div>
    )
}