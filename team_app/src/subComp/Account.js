import { useEffect, useState } from "react"

export default function Account(props) {


    useEffect(() => {
    }, [])

    return (
        <div className={props.formState === 'Account' ? 'show' : 'hide'}>
            <h1>My Account</h1>
            <br />
            <div className="row">
                <div className="col-md-6" style={{padding: 10+'px'}}>
                    <div className="row">
                        <div className="conw col-md-3">
                            <i class="fas fa-user"></i>
                        </div>
                        <div className="conw col-md-9">
                            <h3>My Account</h3>
                            <p>Edit your name or change your password</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="conw">
                        <h3>Settings</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}