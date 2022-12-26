import { useEffect, useState } from "react"

export default function Account(props) {


    useEffect(() => {
    }, [])

    return (
        <div className={props.formState === 'Account' ? 'show' : 'hide'}>
            <h1>My Account</h1>
            <br />
            <div className="row">
                <div className="col-md-6">
                    <div className="conw">
                        <h3>Contact Info.</h3>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="conw">
                        <h3>Settings</h3>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="conw">
                        <h3>Billing</h3>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="conw">
                        <h3>Contact Info.</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}