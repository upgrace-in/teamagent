import { useEffect, useState } from "react"

export default function Upload(props) {

    const [Msg, setMsg] = useState('')
    const [disableBtn, setdisableBtn] = useState(false)

    const submitLeadData = (e) => {
        e.preventDefault()
        setdisableBtn(true)
    }

    const setupDrag = () => {
        //selecting all required elements
        const dropArea = document.querySelector(".drag-area"),
            dragText = dropArea.querySelector("header"),
            button = dropArea.querySelector("button"),
            input = dropArea.querySelector("input");
        let file; //this is a global variable and we'll use it inside multiple functions

        button.onclick = () => {
            input.click(); //if user click on the button then the input also clicked
        }

        input.addEventListener("change", function () {
            //getting user select file and [0] this means if user select multiple files then we'll select only the first one
            file = this.files[0];
            dropArea.classList.add("active");
            showFile(); //calling function
        });


        //If user Drag File Over DropArea
        dropArea.addEventListener("dragover", (event) => {
            event.preventDefault(); //preventing from default behaviour
            dropArea.classList.add("active");
            dragText.textContent = "Release to Upload File";
        });

        //If user leave dragged File from DropArea
        dropArea.addEventListener("dragleave", () => {
            dropArea.classList.remove("active");
            dragText.textContent = "Drag & Drop to Upload File";
        });

        //If user drop File on DropArea
        dropArea.addEventListener("drop", (event) => {
            event.preventDefault(); //preventing from default behaviour
            //getting user select file and [0] this means if user select multiple files then we'll select only the first one
            file = event.dataTransfer.files[0];
            showFile(); //calling function
        });

        function showFile() {
            let fileType = file.type; //getting selected file type
            let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
            if (validExtensions.includes(fileType)) { //if user selected file is an image file
                let fileReader = new FileReader(); //creating new FileReader object
                fileReader.onload = () => {
                    let fileURL = fileReader.result; //passing user file source in fileURL variable
                    // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
                    let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
                    dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
                }
                fileReader.readAsDataURL(file);
            } else {
                alert("This is not an Image File!");
                dropArea.classList.remove("active");
                dragText.textContent = "Drag & Drop to Upload File";
            }
        }

    }

    useEffect(() => {
        setupDrag()
    }, [props.leadNames])

    return (
        <div className={props.formState === 'Upload' ? 'show' : 'hide'}>
            <h1>Upload Receipts</h1>
            <br />
            <div className="row" style={{ padding: 10 + 'px' }}>
                <div className="drag-area col-md-6">
                    <div className="icon"><i className="fas fa-cloud-upload-alt"></i></div>
                    <header>Drag & Drop to Upload File</header>
                    <span>OR</span>
                    <button>Browse File</button>
                    <input type="file" hidden />
                </div>
                <div className="col-md-6">
                    <form className="wpcf7-form init">
                        <div className="comment-one__form ">
                            <div className="col-xl-12">
                                <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                                    data-name="your-name">
                                    <select className="form-select" id="leadName">
                                        <option value="0" defaultValue>Select Lead</option>
                                        {props.leadNames.join('')}
                                    </select>
                                </span>
                                </div>
                            </div>
                            <div className="col-xl-12">
                                <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                                    data-name="your-name"><input id="inputlastName" type="text" size="40"
                                        className="wpcf7-form-control wpcf7-text"
                                        aria-required="true" aria-invalid="false" placeholder="Receipt Address" /></span>
                                </div>
                            </div>
                            <div className="col-xl-12">
                                <div className="comment-form__input-box"><span className="wpcf7-form-control-wrap"
                                    data-name="your-name"><input id="inputlastName" type="number" size="40"
                                        className="wpcf7-form-control wpcf7-text"
                                        aria-required="true" aria-invalid="false" placeholder="Receipt Amount" /></span>
                                </div>
                            </div>
                            <div className="wpcf7-response-output" style={{ display: 'block', color: 'red' }}>
                                {Msg}
                            </div>
                            <div className="row mx-auto text-left" style={{ marginBottom: 20 + 'px' }}>
                                <div className="col-md-12">
                                    <button onClick={submitLeadData} type="submit" disabled={disableBtn === true ? true : false} className="tb thm-btn">Upload Receipt</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}