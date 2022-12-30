import $ from 'jquery'

export default function Register(props) {

    const registerForm = (e) => {
        e.preventDefault()
        let userEmail = $('#useremail').val()
        let userPhone = $('#userphone').val()
        let userName = $('#username').val()
        let password = $('#password').val()
        let confirmPassword = $('#confirmPassword').val()

        if ((userEmail !== '') && (userPhone !== '') && (userName !== '') && (password !== '') && (confirmPassword !== '')) {
            if (password === confirmPassword) {
                props.setMsg("Processing...")
                // Send to backend
                fetch(props.endpoint+'/createuser', {
                    method: 'POST',
                    body: JSON.stringify({
                        "name": userName,
                        "phoneNumber": userPhone,
                        "emailAddress": userEmail,
                        "password": password
                    }),
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    return response.json()
                }).then(function (val) {
                    if (val['msg']) {
                        props.setMsg("User Already Exists Logging in...")
                        // user exists logged him in
                        props.loginUser(val['session'])
                    } else {
                        // if val is false thier may be two cases
                        if (val['session'] != null) {
                            props.setMsg("User Registered Logging in...")
                            // user registered logged him in
                            props.loginUser(val['session'])
                        } else {
                            props.setMsg("Something went wrong !!!")
                        }
                    }
                    // localStorage.setItem("session", JSON.stringify(val['session']))
                    // localStorage.removeItem("session")
                    // JSON.parse(localStorage.getItem("session")
                });


            } else {
                props.setMsg("Password unmatched !!!")
            }

        } else {
            props.setMsg("Please enter valid data !!!")
        }
    }

    return (
        <form className="wpcf7-form init">
            <div className="comment-one__form ">
                <div className='row'>
                    <div className="col-xl-6">
                        <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                            data-name="your-name"><input id="username" type="text" name="your-name" size="40"
                                className="wpcf7-form-control wpcf7-text"
                                aria-required="true" aria-invalid="false" placeholder="Your Name" /></span>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                            data-name="your-phone"><input id="userphone" type="number" name="your-phone" size="40"
                                className="wpcf7-form-control wpcf7-text" aria-invalid="false"
                                placeholder="Phone number" /></span>
                        </div>
                    </div>
                </div>
                <div className="col-xl-12">
                    <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                        data-name="your-email"><input id="useremail" type="email" name="your-email"
                            size="40"
                            className="wpcf7-form-control wpcf7-text"
                            aria-required="true" aria-invalid="false"
                            placeholder="Email Address" /></span>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-xl-6">
                        <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                            data-name="your-name"><input id="password" type="password" size="40"
                                className="wpcf7-form-control wpcf7-text"
                                aria-required="true" aria-invalid="false" placeholder="Password" /></span>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                            data-name="your-phone"><input id="confirmPassword" type="password" size="40"
                                className="wpcf7-form-control wpcf7-text" aria-invalid="false"
                                placeholder="Confirm Password" /></span>
                        </div>
                    </div>
                </div>
                <div className="wpcf7-response-output" style={{ display: 'block' }}>
                    {props.Msg}
                </div>
                <div className="row">
                    <button onClick={registerForm} type="submit" className="thm-btn comment-form__btn">Register Now</button>
                </div>
                <div className="row text-center mx-auto mt-4">
                    <a className='cr' onClick={() => { props.setformSwitch(() => !props.formSwitch); props.setMsg('') }}>Login Here</a>
                </div>
            </div>

        </form>
    )
}