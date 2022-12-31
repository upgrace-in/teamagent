import { useEffect, useState } from "react"
import $ from 'jquery'
import axios from 'axios';

export default function Upload(props) {

    const [Msg, setMsg] = useState('')
    const [disableBtn, setdisableBtn] = useState(false)

    const [file, setFile] = useState();

    const submitReceiptData = async (e) => {
        e.preventDefault()

        const receiptData = new FormData();

        // setdisableBtn(true)
        setMsg('Processing...')

        let inputRecAmt = $('#inputRecAmt').val()
        let inputtxnAdd = $('#inputtxnAdd').val()
        let leadUID = $('#leadUID').val()
        let imgTag = $('#imgTag').val()

        try {
            if ((inputRecAmt !== '') && (inputtxnAdd !== '') && (leadUID !== 0) && (imgTag !== '')) {


                receiptData.append("img", file);
                receiptData.append("inputRecAmt", inputRecAmt)
                receiptData.append("inputtxnAdd", inputtxnAdd)
                receiptData.append("leadUID", leadUID)
                receiptData.append("emailAddress", props.emailAddress)
                receiptData.append("uid", Math.random().toString(36).slice(2))

                await axios
                    .post(props.endpoint + '/uploadReceipt', receiptData, { headers: { 'Content-Type': 'multipart/form-data' } })
                    .then((val) => {
                        if (val['msg']) {
                            setMsg("Receipt Uploaded !!!")
                            // Changed
                            setTimeout(() => {
                                window.location.reload()
                            }, 1000)
                        } else {
                            setMsg("Something went wrong...")
                        }
                    })
                    .catch((error) => console.log(error.message));

            } else {
                throw new Error;
            }
        } catch (e) {
            console.log(e)
            setMsg("Please enter valid data!!!")
            setdisableBtn(false)
        }

    }

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <div className={props.formState === 'Upload' ? 'show' : 'hide'}>
            <h1>Upload Receipts</h1>
            <br />
            <div className="row" style={{ padding: 10 + 'px' }}>
                {/* <div className="drag-area col-md-6">
                    <div className="icon"><i className="fas fa-cloud-upload-alt"></i></div>
                    <header className="drapHeader">Drag & Drop to Upload File</header>
                    <span className="drapOR">OR</span>
                    <input onChange={handleChange} id="imgTag" type="file"/>
                </div> */}
                <div className="col-md-6">
                    <form className="wpcf7-form init">
                        <div className="comment-one__form ">
                            <div className="col-xl-12">
                                <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap">
                                    <select className="form-select" id="leadUID">
                                        <option value="0" defaultValue>Select Lead</option>
                                        {
                                            props.leadNames !== undefined ?
                                                props.leadNames.map(data => {
                                                    return <option key={data.uid} value={data.uid}>{data.fname + ' ' + data.lname + ' (' + data.uid + ')'}</option>
                                                })
                                                : () => { return null }
                                        }
                                    </select>
                                </span>
                                </div>

                            </div>
                            <div className="col-xl-12">
                                <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                                    data-name="your-name">
                                    <input onChange={handleChange} id="imgTag" type="file" />
                                </span>
                                </div>
                            </div>
                            <div className="col-xl-12">
                                <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                                    data-name="your-name"><input id="inputtxnAdd" type="text" size="40"
                                        className="wpcf7-form-control wpcf7-text"
                                        aria-required="true" aria-invalid="false" placeholder="Transaction Address" /></span>
                                </div>
                            </div>
                            <div className="col-xl-12">
                                <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                                    data-name="your-name"><input id="inputRecAmt" type="number" size="40"
                                        className="wpcf7-form-control wpcf7-text"
                                        aria-required="true" aria-invalid="false" placeholder="Receipt Amount" /></span>
                                </div>
                            </div>
                            <div className="wpcf7-response-output" style={{ display: 'block', color: 'red' }}>
                                {Msg}
                            </div>
                            <div className="row mx-auto text-left" style={{ marginBottom: 20 + 'px' }}>
                                <div className="col-md-12">
                                    <button onClick={submitReceiptData} type="submit" disabled={disableBtn === true ? true : false} className="tb thm-btn">Upload Receipt</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}