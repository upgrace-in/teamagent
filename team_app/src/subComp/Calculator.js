import { useEffect, useState } from "react"
import $ from 'jquery'

export default function Calculator(props) {


    useEffect(() => {
        props.calculator($('.loanAmount3'), $('.credits'))
    }, [])

    return (
        <div className={props.formState === 'Calculator' ? 'show' : 'hide'}>
            <form className="wpcf7-form init">
                <div className="comment-one__form row">
                    <div className="col-xl-6">
                        <div className="comment-form__input-box">
                            <span className="wpcf7-form-control-wrap" data-name="your-name">
                                <input className="loanAmount3"
                                    style={{ fontSize: 1.5 + 'rem', borderRadius: 10 + 'px', padding: 10 + 'px', color: '#000' }} type="number"
                                    value="100000" placeholder="Enter Amount" />
                            </span>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="comment-form__input-box">
                            <span className="wpcf7-form-control-wrap" data-name="your-name">
                                <h3>Credits: </h3>
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}