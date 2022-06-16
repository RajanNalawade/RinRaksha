var formNumber = '',
    QUOT_NUMBER = '',
    CUST_NAME = '',
    CUST_MOBILE_NUMBER = '',
    SR_NAME = '',
    SR_CODE = '',
    PLAN_NAME = 'RinRaksha',
    CUST_EMAIL = '',
    strDocType = '',
    IS_ESIGN = '',
    consent3 = '',
    RD_LOAN_TYPE = '',
    RD_LOAN_ACCOUNT_NO = '';

var currentDate = '';
var mOnePagerIMG, mUserPhoto, mUserMobilePhoto, mUserEmailPhoto;
var isOnePageImgUploaded = false;
var mOnePagerPDF, mOnePgrMobEmailPDF;
var mOnePagerVID;
var IMG_USER_PHOTO = "img_USER_PIC_01";
var IMG_USER_MOB_PHOTO = "img_USER_PIC_02";
var IMG_USER_EMAIL_PHOTO = "img_USER_PIC_03";
var IMG_ONEPAGER = "img_CUSTDECL_01";
var PDF_ONEPAGER = "pdf_onepager_01";
var PDF_MOB_EMAIL_VALIDATION = "pdf_onepager_02";
var VID_ONEPAGER = "vid_custvideo_01";
var orgnisation_name = 'SBI Life Insurance Company Limited',
    orgnisation_name_a = 'SBI life';
var recorder; // globally accessible
var video;
var isNameValidated, isMobileValidated, isEmailValidated;

var video, canvas, photo, startbutton;

// Grab elements, create settings, etc.
var videoUser, videoMobile, videoEmail;
var canvasUser, canvasMobile, canvasEmail;
var contextUser, contextMobile, contextEmail;

window.onload = function () {
    this.ready();
}

function getURLParameter(name) {
    return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
}

function hideURLParams() {
    //Parameters to hide (ie ?success=value, ?error=value, etc)
    var hide = ['prop'];
    for (var h in hide) {
        if (getURLParameter(h)) {
            history.replaceState(null, document.getElementsByTagName("title")[0].innerHTML, window.location.pathname);
        }
    }
}

function ready() {

    let urlParm = new URLSearchParams(window.location.search.replace("&amp;", "&"));

    /* var data = urlParm.get('prop').split('|');
    formNumber = data[0]; */
    //formNumber = '7011401546';
    formNumber = '7011401642';

    hideURLParams();

    // When the user clicks anywhere outside of the modal, close it
    /* window.onclick = function(event) {
        if (event.target == document.getElementById('myModal')) {
            document.getElementById('myModal').style.display = "none";
        }
    } */

    document.getElementById('txtProposalNumer').innerText = `Electronic Form Number ${formNumber}`;

    document.getElementById('linkProposalPDF').href = SERVICE_HOST_NAME + 'tempproposalpdf.aspx?prop=' +
        formNumber;

    video = document.querySelector('video');

    currentDate = new Date();
    //document.getElementById('txtCustDeclarationDate').value = dateDDFullMonthYYYY(currentDate.toISOString().substr(0, 10));
    //document.getElementById('txtSalesRepreDate').value = dateDDFullMonthYYYY(currentDate.toISOString().substr(0, 10));

    //check chrome browser is available and Browser supports Camera Functionality
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    if (isChrome && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

        getProposalDetails();

        // Grab elements, create settings, etc.
        videoUser = document.getElementById('videoUser');
        canvasUser = document.getElementById('canvasUser');
        contextUser = canvasUser.getContext('2d');

        videoMobile = document.getElementById('videoMobile');
        canvasMobile = document.getElementById('canvasMobile');
        contextMobile = canvasMobile.getContext('2d');

        videoEmail = document.getElementById('videoEmail');
        canvasEmail = document.getElementById('canvasEmail');
        contextEmail = canvasEmail.getContext('2d');

    } else {

        self.hideLoader('loader');

        document.getElementById('divMainContainer').style.display = 'none';
        document.getElementById('divMainContainerError').style.display = 'block';
        document.getElementById('divMainContainerError1').innerHTML = 'Kindly use Google Chrome browser to open this link';
    }
}

function getMobEmailVadilationVal(radio, name) {

    switch (name) {
        case 'NameValidation':
            if (radio.value == 'No') {
                isNameValidated = false;
                alert('Form cannot be processed further in view of mismatch in Name. Please get in touch with your sales person.');
                document.getElementById('divNamePhoto').style.display = 'none';
            } else {
                isNameValidated = true;

                if (!CUST_EMAIL) {
                    // Get access to the camera!
                    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                        // Not adding `{ audio: true }` since we only want video now
                        navigator.mediaDevices.getUserMedia({
                            video: {
                                facingMode: 'user',
                            }
                        }).then(function (stream) {
                            //video.src = window.URL.createObjectURL(stream);
                            videoUser.srcObject = stream;
                            videoUser.play();
                        });
                    }
                    document.getElementById('divNamePhoto').style.display = 'block';
                } else {
                    document.getElementById('divNamePhoto').style.display = 'none';
                }
            }
            break;

        case 'MobileValidation':
            if (radio.value == 'No') {
                isMobileValidated = false;
                alert('Form cannot be processed further in view of mismatch in Mobile. Please get in touch with your sales person.');
                document.getElementById('divMobilePhoto').style.display = 'none';
            } else {
                isMobileValidated = true;

                // Get access to the camera!
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    // Not adding `{ audio: true }` since we only want video now
                    navigator.mediaDevices.getUserMedia({
                        video: {
                            facingMode: 'user',
                        }
                    }).then(function (stream) {
                        //video.src = window.URL.createObjectURL(stream);
                        videoMobile.srcObject = stream;
                        videoMobile.play();
                    });
                }
                document.getElementById('divMobilePhoto').style.display = 'block';
            }
            break;

        case 'EmailValidation':
            if (radio.value == 'No') {
                isEmailValidated = false;
                alert('Form cannot be processed further in view of mismatch in Email. Please get in touch with your sales person.');
            } else {
                isEmailValidated = true;

                if (CUST_EMAIL) {

                    // Get access to the camera!
                    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                        // Not adding `{ audio: true }` since we only want video now
                        navigator.mediaDevices.getUserMedia({
                            video: {
                                facingMode: 'user',
                            }
                        }).then(function (stream) {
                            //video.src = window.URL.createObjectURL(stream);
                            videoEmail.srcObject = stream;
                            videoEmail.play();
                        });
                    }
                    document.getElementById('divEmailPhoto').style.display = 'block';

                }
            }
            break;
    }
}

function onClickCapturePic(type) {

    if (type == 'name') {

        strDocType = IMG_USER_PHOTO;

        contextUser.drawImage(videoUser, 0, 0, 250, 250);
        canvasUser.style.display = "block";
        videoUser.style.display = 'none';

        mUserPhoto = canvasUser.toDataURL("image/png");
        //mUserPhoto = mUserPhoto.replace('data:image/png;base64,', '');

    } else if (type == 'mobile') {

        strDocType = IMG_USER_MOB_PHOTO;

        contextMobile.drawImage(videoMobile, 0, 0, 250, 250);
        canvasMobile.style.display = "block";
        videoMobile.style.display = 'none';

        mUserMobilePhoto = canvasMobile.toDataURL("image/png");
        //mUserMobilePhoto = mUserMobilePhoto.replace('data:image/png;base64,', '');
    } else if (type == 'email') {

        strDocType = IMG_USER_EMAIL_PHOTO;

        contextEmail.drawImage(videoEmail, 0, 0, 250, 250);
        canvasEmail.style.display = "block";
        videoEmail.style.display = 'none';

        mUserEmailPhoto = canvasEmail.toDataURL("image/png");
        //mUserEmailPhoto = mUserEmailPhoto.replace('data:image/png;base64,', '');
    }
}

function onClickRetakePic(type) {

    strDocType = "";

    if (type == 'name') {

        canvasUser.style.display = "none";

        videoUser.style.display = 'block';

        //contextUser.drawImage(null, 0, 0, 250, 250);
        mUserPhoto = undefined;
    } else if (type == 'mobile') {
        canvasMobile.style.display = "none";

        videoMobile.style.display = 'block';

        //contextMobile.drawImage(null, 0, 0, 250, 250);
        mUserMobilePhoto = undefined;
    } else if (type == 'email') {
        canvasEmail.style.display = "none";

        videoEmail.style.display = 'block';

        //contextEmail.drawImage(null, 0, 0, 250, 250);
        mUserEmailPhoto = undefined;
    }
}

function getProposalDetails(proposalNum) {

    var data, parser, xmlDoc;

    let SERVICE_NAME = 'getProposalDet_smrt';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', serviceURL + '?op=' + SERVICE_NAME, true);
    // build SOAP request
    var sr =
        `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <${SERVICE_NAME} xmlns="http://tempuri.org/">
              <strProposal>${formNumber}</strProposal>
            </${SERVICE_NAME}>
          </soap:Body>
        </soap:Envelope>`;
    //console.log(sr);
    self.showLoader('loader');
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4) {
            self.hideLoader('loader');
            //console.log(xmlhttp.readyState);
            if (xmlhttp.status == 200) {

                var temp2 = unescapeHTML(xmlhttp.responseText);
                console.log("res -" + temp2);

                if (window.DOMParser) {
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(temp2, "text/xml");
                } else {
                    xmlDoc = new ActiveXObject("MIcrosoft.XMLDOM");
                    xmlDoc.async = false;
                    xmlDoc.loadXML(text);
                }

                var errorResponse = xmlDoc.getElementsByTagName("getProposalDet_smrtResult")[0].textContent;
                if (errorResponse == '2') {

                    document.getElementById('divMainContainer').style.display = 'none';
                    document.getElementById('divMainContainerError').style.display = 'block';
                    document.getElementById('divMainContainerError1').innerHTML = 'RinRaksha already uploaded for given form number.';

                } else {
                    var temp4 = temp2.substr(temp2.indexOf('<Data>'),
                        temp2.length - temp2.indexOf('<Data>') - (temp2.length - temp2.indexOf('</Data>')));

                    json = self.parseToJson(temp4);

                    var valError = json.Data;
                    if (valError) {

                        document.getElementById('divMainContainer').style.display = 'block';
                        document.getElementById('divMainContainerError').style.display = 'none';
                        document.getElementById('divMainContainerError1').innerHTML = '';

                        var jsonArr = json.Data.Table;

                        if (!Array.isArray(jsonArr)) {
                            var temp = jsonArr;
                            jsonArr = new Array();
                            jsonArr.push(temp);
                        }

                        //var listXMLEFTPending = new Array();
                        for (var i = 0; i < jsonArr.length; i++) {

                            QUOT_NUMBER = jsonArr[i].QUOT_NUMBER;
                            if (QUOT_NUMBER == undefined) {
                                QUOT_NUMBER = '';
                            }

                            CUST_NAME = jsonArr[i].CUST_NAME;
                            if (CUST_NAME == undefined) {
                                CUST_NAME = '';
                            }

                            document.getElementById('paraNameValidation').innerHTML = `I confirm: My Name is ${CUST_NAME}`;

                            CUST_MOBILE_NUMBER = jsonArr[i].CUST_MOBILE_NUMBER;
                            if (CUST_MOBILE_NUMBER == undefined) {
                                CUST_MOBILE_NUMBER = '';
                            }
                            document.getElementById('paraMobileValidation').innerHTML = `My mobile number is ${CUST_MOBILE_NUMBER}`;

                            SR_NAME = jsonArr[i].SR_NAME;
                            if (SR_NAME == undefined) {
                                SR_NAME = '';
                            }

                            SR_CODE = jsonArr[i].SR_CODE;
                            if (SR_CODE == undefined) {
                                SR_CODE = '';
                            }

                            consent3 = ` I, <font color='blue'>${CUST_NAME}</font> hereby give my consent to ${orgnisation_name} to use my Mobile Number (<font color='blue'>${CUST_MOBILE_NUMBER}</font>) for sending One Time Password [OTP] for authentication purposes and I hereby agree and consent that the authentication through OTP verification will be considered as my signature on the Proposal Form and that there is no need for my physical signatures on these documents once OTP based authentication is done.${orgnisation_name} has informed me that this OTP would be used ${PLAN_NAME === 'Arogya Shield' ? `for processing my proposal for <font color='blue'>${PLAN_NAME}</font>. policy.` : `only for processing my SBI Life application form for <font color='blue'>SBI Life-${PLAN_NAME}</font>.`}`

                            document.getElementById('lebelConsent3').innerHTML = consent3;

                            CUST_EMAIL = jsonArr[i].CUST_EMAIL;
                            if (!CUST_EMAIL) {
                                CUST_EMAIL = '';
                                document.getElementById('divEmailValidation').style.display = 'none';
                            } else {
                                document.getElementById('divEmailValidation').style.display = 'block';
                            }

                            document.getElementById('paraEmailValidation').innerHTML = `My email ID is ${CUST_EMAIL}`;

                            document.getElementById('divMainEkyc').style.display = 'block';

                            //for whatsapp consent
                            IS_ESIGN = jsonArr[i].IS_ESIGN;
                            if (IS_ESIGN === 'N' || IS_ESIGN === 'n') {
                                document.getElementById('divWhatsAppConsent').style.display = 'block';
                            } else {
                                document.getElementById('divWhatsAppConsent').style.display = 'none';
                            }

                            RD_LOAN_TYPE = jsonArr[i].RD_LOAN_TYPE;
                            if (RD_LOAN_TYPE == undefined) {
                                RD_LOAN_TYPE = '';
                            }

                            RD_LOAN_ACCOUNT_NO = jsonArr[i].RD_LOAN_ACCOUNT_NO;
                            if (RD_LOAN_ACCOUNT_NO == undefined) {
                                RD_LOAN_ACCOUNT_NO = '';
                            }

                            document.getElementById('para_term_codition').innerHTML = `I/We <font color='cornflowerblue'>${CUST_NAME}</font> confirm that I/We have submitted the above referred electronic
                                    form to buy <font color='cornflowerblue'>${orgnisation_name_a} ${PLAN_NAME}</font> for my <font color='cornflowerblue'>${RD_LOAN_TYPE}</font> with loan account No. <font color='cornflowerblue'>${RD_LOAN_ACCOUNT_NO}</font> on my/our own accord.<br><br><p>I/We also confirm that bank staff bearing code no. 
                                    <font color='cornflowerblue'>${SR_CODE}</font> has explained the product features, benefits with documentation/information to me/us in my own language. I/We have also
                                    read and reviewed the custom including health questionnaire and understood/answered the
                                    same and I/We am/are satisfied with the product features.</p>`


                            //to check pdf
                            /* document.getElementById('divMainContainer').style.display = 'none';
                            document.getElementById('divViewPDF').style.display = 'block'; */

                        }
                    } else {
                        document.getElementById('divMainContainer').style.display = 'none';
                        document.getElementById('divMainContainerError').style.display = 'block';
                        document.getElementById('divMainContainerError1').innerHTML = 'No data found';
                    }
                }
            }
        }
    }
    //specify request headers
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    //send the SOAP request
    xmlhttp.send(sr);
}

function upload_docs(strDocType) {

    try {

        var fin = '',
            fileName = '';

        if (strDocType === IMG_ONEPAGER) {
            fin = mOnePagerIMG;
            fileName = formNumber + "_CUSTDECL_01.jpg";
        } else if (strDocType === PDF_ONEPAGER) {
            fin = getByteCode(mOnePagerPDF);

            if ((IS_ESIGN === 'N' || IS_ESIGN === 'n') && document.getElementById('rbWhatsAppY').checked) {
                fileName = formNumber + "_ONEPAGER_01.pdf|";
            } else {
                fileName = formNumber + "_ONEPAGER_01.pdf";
            }

        } else if (strDocType == PDF_MOB_EMAIL_VALIDATION) {
            fin = getByteCode(mOnePgrMobEmailPDF);
            fileName = formNumber + "_ONEPAGER_02.pdf";
        } else if (strDocType === VID_ONEPAGER) {
            fin = mOnePagerVID;
            fileName = formNumber + "_custvideo_01.mp4";
        }

        console.log("fin:" + fin + " FileName:" + fileName);
        if (fin === undefined || fin === '') {
            alert("Please Browse/Capture Document");
        } else {
            uploadCallService(fin, fileName);
        }

    } catch (error) {
        console.log(error);
        alert(error);
    }
}

async function uploadCallService(byteArray, fileName) {

    if (fileName == "This file Format cannot be uploaded") {
        console.log(fileName.error)

    } else {

        try {

            self.showLoader('loader');
            var xmlhttp = new XMLHttpRequest();
            var SERVICE_NAME = 'UploadFile';
            xmlhttp.open('POST', serviceURL + '?op=' + SERVICE_NAME, true);

            var sr = `<?xml version="1.0" encoding="utf-8"?>
                <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
                <soap12:Body>
                <${SERVICE_NAME} xmlns="http://tempuri.org/">
                <f>${byteArray}</f>
                <fileName>${fileName}</fileName>
                <qNo>${QUOT_NUMBER}</qNo>
                <agentCode>${SR_CODE}</agentCode>
                <strEmailId>${commonEmail}</strEmailId>
                <strMobileNo>${commonMobile}</strMobileNo>
                <strAuthKey>${strAuth}</strAuthKey>
                </${SERVICE_NAME}>
                </soap12:Body>
                </soap12:Envelope>`;
            console.log(sr);

            xmlhttp.onreadystatechange = function () {

                try {

                    self.hideLoader('loader');

                    if (xmlhttp.readyState == 4) {
                        if (xmlhttp.status == 200) {

                            data = unescapeHTML(xmlhttp.responseText);
                            //console.log(data);

                            if (window.DOMParser) {
                                parser = new DOMParser();
                                xmlDoc = parser.parseFromString(data, "text/xml");
                            } else {
                                xmlDoc = new ActiveXObject("MIcrosoft.XMLDOM");
                                xmlDoc.async = false;
                                xmlDoc.loadXML(text);
                            }

                            var response = xmlDoc.getElementsByTagName("UploadFileResult")[0].textContent;

                            //console.log("Upload:" + response + " fileName:" + fileName);

                            if (response == "1") {

                                if (strDocType == IMG_ONEPAGER) {
                                    isOnePageImgUploaded = true;

                                    document.getElementById('imgbtn_aob_auth_basic_qualification_uploadIMg').src = '../Assets/images/upload_check.png';

                                    alert('Image upload successfully.')
                                } else if (strDocType == PDF_ONEPAGER) {

                                    /* if (mOnePagerVID) {
                                        strDocType = VID_ONEPAGER;
                                        upload_docs(VID_ONEPAGER);
                                    } */
                                    if (mOnePgrMobEmailPDF) {
                                        strDocType = PDF_MOB_EMAIL_VALIDATION;
                                        upload_docs(PDF_MOB_EMAIL_VALIDATION);
                                    } else {
                                        //send email to customer and agent if email is present
                                        alert('RinRaksha pdf sync successfully..');
                                        strDocType = '';
                                        mOnePagerIMG = undefined;
                                        mOnePagerPDF = undefined;
                                        mOnePagerVID = undefined;
                                        isOnePageImgUploaded = false;

                                        document.getElementById('myModal').style.display = 'block';
                                    }
                                } else if (strDocType == PDF_MOB_EMAIL_VALIDATION) {
                                    //send email to customer and agent if email is present
                                    alert(`Mobile number ${CUST_MOBILE_NUMBER} and email id - ${CUST_EMAIL} has been verified by me with the proposer.`);
                                    strDocType = '';
                                    mOnePagerIMG = undefined;
                                    mOnePagerPDF = undefined;
                                    mOnePagerVID = undefined;
                                    mUserPhoto = undefined;
                                    mOnePgrMobEmailPDF = undefined;
                                    isOnePageImgUploaded = false;
                                    isNameValidated = false;
                                    isMobileValidated = false;
                                    isEmailValidated = false;

                                    document.getElementById('myModal').style.display = 'block';
                                }

                            } else {
                                if (strDocType == IMG_ONEPAGER) {
                                    alert("Upload Image failed! Please try again later...");
                                } else if (strDocType == PDF_ONEPAGER) {
                                    alert("Upload PDF failed! Please try again later...");
                                } else if (strDocType == PDF_MOB_EMAIL_VALIDATION) {
                                    alert("Upload Mobile and email validation pdf failed! Please try again later...");
                                } else if (strDocType == VID_ONEPAGER) {
                                    alert("Upload Video failed! Please try again later...");
                                }
                            }
                        }
                    }

                } catch (error) {
                    console.log(error);
                    alert(error);
                }
            }
            //specify request headers
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            //send the SOAP request
            xmlhttp.send(sr);

        } catch (error) {
            console.log(error);
            alert(error);
        }
    }
}

function startRecording() {
    this.disabled = true;
    captureCamera(function (camera) {
        video.muted = true;
        video.volume = 0;
        video.srcObject = camera;

        recorder = RecordRTC(camera, {
            type: 'video',
            timeSlice: 1000
        });


        /* BY MANISH SINGH ---------- START */
        //stop recording on basis of time
        recorder.setRecordingDuration(20 * 1000, function () {
            console.log("Inside Record Duration")

            recorder.stopRecording(stopRecordingCallback); // stop recording here
        });

        //stop recording on basis of file size
        (function looper() {
            console.log("INSIDE LOOPER")
            if (!recorder) {
                return;
            }
            var internal = recorder.getInternalRecorder();
            if (internal && internal.getArrayOfBlobs) {
                var blob = new Blob(internal.getArrayOfBlobs(), {
                    type: 'video',
                });

                if (blob.size > 2.5 * 1024 * 1024) { // if blob is greater than 2.5 MB
                    recorder.stopRecording(stopRecordingCallback); // stop recording here
                    return;
                }

            }
            setTimeout(looper, 20000);
        })();

        /* BY MANISH SINGH --------- END */

        recorder.startRecording();

        // release camera on stopRecording
        recorder.camera = camera;


        document.getElementById('btnStopRecord').disabled = false;
    });
}

function stopRecording() {
    this.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
}

function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    }).then(function (camera) {
        callback(camera);
    }).catch(function (error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
}


function stopRecordingCallback() {
    video.src = video.srcObject = null;
    video.muted = false;
    video.volume = 1;

    var blob = recorder.getBlob();
    console.log('stop record blob size - ' + blob.size);

    if (blob.size > 2.5 * 1024 * 1024) { // if blob is greater than 2.5 MB
        recorder.clearRecordedData();
        alert('Video size should be less than 2.5 MB.')
    } else {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            mOnePagerVID = reader.result;
            mOnePagerVID = mOnePagerVID.replace(/^data:.+;base64,/, '');
            //console.log(mOnePagerVID);
        }

        video.src = URL.createObjectURL(blob);
    }

    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}

function validateFields() {

    var error = '';
    var ischecktermConditionCheckd = document.getElementById('checktermCondition').checked;
    if (!ischecktermConditionCheckd) {
        error = 'Please read and check Term and Condition';
        return error;
    }

    var ischeckLebelConsent3Checked = document.getElementById('checkLebelConsent3').checked;
    if (!ischeckLebelConsent3Checked) {
        error = 'Please read and check customer declaration consent';
        return error;
    }


    if (!isNameValidated) {
        error = 'Form cannot be processed further in view of mismatch in Name. Please get in touch with your sales person.';
        return error;
    }

    if (!CUST_EMAIL && !mUserPhoto) {
        error = 'Form cannot be processed further in view of mismatch in Name. Please get in touch with your sales person.';
        return error;
    }

    if (!isMobileValidated || !mUserMobilePhoto) {
        error = 'Form cannot be processed further in view of mismatch in Mobile. Please get in touch with your sales person.';
        return error;
    }

    if (CUST_EMAIL && !mUserEmailPhoto) {
        error = 'Form cannot be processed further in view of mismatch in Email. Please get in touch with your sales person.';
        return error;
    }

    /* var otp = document.getElementById('txtProposalOTP').value;
    if (!otp) {
        error = 'Please enter your OTP';
        return error;
    } */

    return error;
}

function onClickSubmit() {

    var error = validateFields();

    if (error === '') {

        validateAnnexureOTP().then(validateOTPTrue => {

            createMobEmailValidationPDF().then(pdfMobEmailTrue => {

                mOnePgrMobEmailPDF = pdfMobEmailTrue;

                createAnnexurePDF().then(pdfCreatedAndServedTrue => {
                    //pdfCreatedAndServed(pdfCreatedAndServedTrue);

                    mOnePagerPDF = pdfCreatedAndServedTrue;

                    strDocType = PDF_ONEPAGER;
                    upload_docs(PDF_ONEPAGER);

                }, pdfCreatedAndServedFalse => {
                    someErrorHappenedAndRejected(pdfCreatedAndServedFalse);
                    alert('Error while creating pdf');
                });

            }, pdfMobEmailFalse => {
                someErrorHappenedAndRejected(pdfMobEmailFalse);
                alert('Error while creating mobile and email validation pdf');
            });

        }, validateOTPTrue => {
            alert('Invalid OTP')
        });

    } else {
        alert(error);
    }

}

let validateAnnexureOTP = () => {
    return new Promise((resolve, reject) => {
        try {

            self.showLoader('loader');
            var xmlhttp = new XMLHttpRequest();
            var SERVICE_NAME = 'ValidateOTP_SBIL';
            xmlhttp.open('POST', serviceURL + '?op=' + SERVICE_NAME, true);

            var strSourceVal = "";
            if (QUOT_NUMBER.includes("OL70")) {
                strSourceVal = "Connect Life";
            } else if (QUOT_NUMBER.includes("RN70")) {
                strSourceVal = "Parivartan";
            }

            var sr = `<?xml version="1.0" encoding="utf-8"?>
        <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
        <soap12:Body>
        <${SERVICE_NAME} xmlns="http://tempuri.org/">
        <ADHAR_NO></ADHAR_NO>
        <QUOT_NO>${QUOT_NUMBER}</QUOT_NO>
        <MOBILE_NO>${CUST_MOBILE_NUMBER}</MOBILE_NO>
        <OTP>${document.getElementById('txtProposalOTP').value}</OTP>
        <strSource>${strSourceVal}</strSource>
        </${SERVICE_NAME}>
        </soap12:Body>
        </soap12:Envelope>`;
            console.log(sr);

            xmlhttp.onreadystatechange = function () {

                self.hideLoader('loader');

                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {

                        data = unescapeHTML(xmlhttp.responseText);
                        //console.log(data);

                        if (window.DOMParser) {
                            parser = new DOMParser();
                            xmlDoc = parser.parseFromString(data, "text/xml");
                        } else {
                            xmlDoc = new ActiveXObject("MIcrosoft.XMLDOM");
                            xmlDoc.async = false;
                            xmlDoc.loadXML(text);
                        }

                        var response = xmlDoc.getElementsByTagName("ValidateOTP_SBILResult")[0].textContent;

                        //console.log("Upload:" + response + " fileName:" + fileName);

                        if (response == "1") {
                            resolve('1');
                        } else {
                            reject('0');
                        }
                    }
                }
            }
            //specify request headers
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            //send the SOAP request
            xmlhttp.send(sr);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

let createMobEmailValidationPDF = () => {

    self.showLoader('loader');

    return new Promise((resolve, reject) => {
        try {

            var options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            let doc = {
                pageSize: 'A4',

                pageOrientation: 'potrait',

                pageMargins: [10, 30, 10, 30],

                content: [
                    get2TLogopdfData(),
                    {
                        canvas: [{
                            type: 'line',
                            x1: 0,
                            y1: 5,
                            x2: 575,
                            y2: 5,
                            lineWidth: 1,
                            lineCap: 'round'
                        }]
                    },
                    {
                        margin: [0, 15, 0, 0],
                        text: [{
                            text: 'Mobile Number and email validation',
                            style: 'titleFont',
                            alignment: 'center'
                        }, ]
                    }, {
                        margin: [0, 15, 0, 0],
                        text: [{
                            text: `Dear Sir/Madam,\nWe request you to see the following details carefully and validate your mobile number and email id. This is an important process which will ensure you receive all communications effectively.`,
                            style: 'smallFontSize',
                            alignment: 'justify'
                        }, ],
                    },
                    getUserPdfData(mUserPhoto, `I confirm: My Name is ${CUST_NAME}`, getYesNO(isNameValidated)),
                    getUserPdfData(mUserMobilePhoto, `My mobile number is ${CUST_MOBILE_NUMBER}`, getYesNO(isMobileValidated)),
                    getUserPdfData(mUserEmailPhoto, `My email id is ${CUST_EMAIL}`, getYesNO(isEmailValidated)),
                ],
                images: {
                    sbiLogo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAWRXhpZgAASUkqAAgAAAAAAAAAAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCABLAJwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD33r2pjuFUlsKF6sTVXVNTt9I06S8un2xxjp3Y9gPevHNf8U6hr07ebI0dqD8kCH5QPf1NdOHwk6702PPxuYU8KtdW+h6vN4p0W3fZJqVsregkB/lVmz1jT9R/49LyGY/3UcE/lXgY46cU5HaORXjYo6nKspwQfY13yyyNtJHjwz6fN70FY+iQSe9OAwK828H+Npnnj03VpN+87Yrhuuewb/GvSFPFeXVoyoy5ZH0GGxVPEw54M5678YWMOvPodlbXOo6nEgkmhtVBEKnpvZiAufTOafZ+L9LutXXR5BNa6sxP+hTpiTbtzvGMgrgfeBx2rybw94lXwH8ZPEem+ISYYNXuBJDdv90ZJKZP90g4z2Ir1+TRbW48UWmvEgz29rJboR3DlTnP4frWZ0GR4h+JGkeFb6G01ay1OJ7hyluywB1mIIHykH3HXHWrU/jnS7C9tbbVre+0trttkEl7Dtjdv7u4EgH2OK858YuniP4/eHdHd1+y6VELibc2Bn75/kgq/wDGS8XxLpFn4U0Jf7R1W5ukkK2/ziBFz8zsOF5Pf3oA9P1LUhp1obgWd1dKM7ltlDMBjJOCRXOeGviRo/i2eSPRrLU51iYLNK1vtSIn1JP6Cl8Wai/hX4X3s80u64trAQh8/ekKhAfzNZnwU0P+x/hrYyOuJ79mu5DjkhuF/wDHQPzoA9D4IzXO+KPGNh4QtTd6naX32MYDXMMQdFJOADzn9K6OvHfj5eSXOl6J4atiTPql6vyj0BAH6sPyoA9F8N+KLbxRZre2Nlfx2ci7o57iIIsgz/Dzn9K2pZEiheWQ4RFLMfQCq+m2UWm6bbWMKhYraJYkA9FGKoeIPEen+HbUzXxlbKs4igiMjlVGWbaP4QOSelAB4Y8T6V4u0o6lpEryWwkaIl0KkMvXg/UVFqviux0vU00tYLi81BoTcG2tUDMkY/jbJAUenPPanWeq6PaeHoNT06E/2bOolj+x25bIbndtUce5rgvhRqia3rHiLxBPDctPql6UgkMLFFgjGFXfjA69M9qAPSdD1my8Q6Nbarp7M1rcLlN6lSOcEEdiCDWjXKXHjjQNNeSJXka1gnW3mubeAtBBIxwFZxxnJGcZxnmum3bu/wClAHl3xH1ZrjUINOQ4ihQSMAerEcfpXD44zW34tLnxNdl+pCf+gCsT2r6XCwUaSSPg8dUlUxEnLuKBk4FJXqPw3gsDo0rqsbXfmESlgCQO34Vx3jSOyi8T3K2OwR4BcJ0D96iliues6VtjStgfZ4aNfm36HPgkYIOCDkH0r2PQ/E8H/CIWupahIVxIltI2M5kLBB+ZIrxyu30Pwz/wl3gCbS5LyW0iOo+aZIgC/wAqqRjPT5sH8KxzKKdJS7M68inJYhx6NHSfED4f6f460ZoJlWLUIVJtboDlG/un1U9xXM/A3XtQvPD+o6LqrM02jT+SHY5ITn5SfYg/hXYNN4xtrAWqWGn3l2F2rem5McZOPvNHtJz3IB/GsHSfBGt+GPC99YaPLZXGq6oZJbzULl2QLI3GVQA5AyccivDPrTl/hhY23i/x/wCMfE19bRXNuZvs0AlQMMZ7Z9lX86sePb1fh14w8N3Ph1VtYdRmaO8sY+Ipl3KN23s3zHkVs/D/AMI+K/AWg3GlpDpF95kxmWX7RJGckAfMNhz0qRfh1qWseLYvFHiq9try5tB/oWn2yssERHIyx5PPPSgDJ+O93JdadoXhi3J87Vb5cqOu1SB/Nh+Ver2FpHYafb2cQAjgiWJQPRRj+leZ6t4J8X6x8Q9N8V3J0cx6cAsNj50mAOed+zrk56dhXqFuZTAhnRUlIG5VbcAe+DxmgCQ9K8X1H/iqP2kbC1zuttCtvNb0D43fzZfyr13UH1CO1J06CCa4zws8hRceuQCf0rzTwn4F8YeHPGGreI7mXR76bU8+agkkQpls/Kdp47fhQB6sTgeteV/FrULeLw+0OluJ9V1+RNLiZW3bUDfOB6c8H3PtXT64fHd3p8tvpNvo1nNIpUTyXMkhT3A2Dmucvfh9q9vq/hG9sDaXX9jWrROtzKygTMD++4B3fMc44JwKANbxNJF4I+D95DbuFNlp4tYznq5AT+Zrj9Q1C48AfAXR7KzLR6nqSLDGVzuVpcszD3AP61N8VLN49F8NeDoZmnudW1IPPI/3pMHLMR2G5untXYeOfB1xrtpokmm+SbjRrtLiKCYlUlVRgrkdDgDBoAwNN8H3esaNo2hvayab4a09o5pVmGLjUJQd2Sv8Cbsnnk+gr075gzDtnjp6VjW1jqeo6lBfaqqWsVuS0NlDKX+Y8b5GwMkdgOBnPNbTJlieaAPLPiPpbW2qQX6r+6njCMR2Zf8A61cT7V75rGlW+s6bJZXKko44I6qexFeNa54bv9BuWjnjLQ5+SdR8rD+hr28Bioygqct0fJZtgJU6jqwV4sn8JO6atcbWI/0Kfof9msHOQCetbvhPH9rXHP8Ay5T/APoNYSAttUAsx6Ack11xsqsvkefO7oQXm/0FxXtvg3S20rw1bQyDEr5lkHoW5x+WK5Dwf4Jmkni1LVIikSENFA3Vj6t6D2r0ieSO2tpJpG2RxoXZvQAZJrzMwxMZv2cXoj38mwUqV61RWb2J6K5fwFf6lqvhGz1PU7gyzXm6ZMoF2xljsHA/u4/OsLUPEmsw+JbjTVutltqT+VpcyxqTHLG4EqnjB4JYZ/umvMPePRaKoapNc2+k3LWrxi7ERWAzEBTIRhM/VsfnWP4J1W51fRnubuac3CymGaCeMK9vIoAdDjg/Nkg+hFAHT0Vxd5rV/wD8J1qVpHetHpum6Us80YReZnLbOcZ6Ln64rpNOa4g0eBr+4MkywhppWUKc4yeBxQBoUV5r4D8Ta7r2sRpcXJe2NvJcypNGqHy3kIgMeOSNqnJNdP4z8QP4f8PXVxa7WvjDIYAykgFVJ3EDsMfyoA6OsXxJf6rpunLc6Rpv9ozLMglgDYbyifmK+rAdBVrRLt77QNOu5G3ST2sUrN6llBP864qTxFrJ8TTaS10Uh1OYHSp0jXKiOTbMhyMHgFh7UAT2eg3niL4hx+KtTtJLWz06DyNNtpwBIzN96Vh/D1wB1rvq53xlrk/hzwzPfW0Sy3ReOCAP93fIwRS3sCcn6Vb0qG+t55kutV+27UQMpRVKPyWPHY8YHagDXphAya4XXdb1d/HX9k6dczxWcNmjXMkaIVhlkchGYt0UKrE+vHSu6jDiNQ7BmAGTjGT60AKaZJCkqFJEV1PVWGQak/GimLfdGPH4Z0iG5aeGxijkdGRigxlSMEVJY+H9K01gbSxhjYfxbckfia1KSnzy7mao01tFABgVV1KGO6sJreW1+1RyLtaAsBvB6jmrlJipNTHszNYWcVpaaK8MES7I41mTCr6DnpVeGzS3S3SLw8QLeVpof3qHY5ByRk9Tk/nXQ1x/i2LVZdTtrbT5biNb2Io0kZIERjPmZ9t33fegDXvGm1C1a3utEeWFiCUaZMEg5B6+uDTLJZNNt/ItdEeKPcWIEyck9SSTkk1zMF/rT2dvd7p7drmaC4kBjZjGjzlWTB6ALj6ZrZ8NXGrPE9pft5n+irLG5jKsCzONpJPJG0HPHWgCa50+G71FNQn8O77tAFEhlTJAOQDzzg8jPSrtxLc3dvJbz6NI8UilXQzJhgeo61yUWr6nFZwSW5mM9pYGO58+NiqzGRBznq2Axz09TXUWF1/bej+TK8sNzJbqZgqmN4ywOCBnjpnqaAKtnpdtYXMNxaeG/JmhhFvG6SoNsYOQvXoMn86lurUXssktzoDSvJCYHLTJ80Z6r16GuftNS16zaKa4cyT3Lf6swsyvsk8sIvPyHaC5J6lvQVch1jUtQa4LK8c1hBLOUWJlDSqzqqH1G0KcD1oA27Uz2VpHaW2iPFbxKEjjWZMKo7DmoILRbUWoh8PFBaljB+9Q+WW4bHPfNUbPWdcPiG00+6hjaF4VeSRYioYlSxYcnABwuD+dVdQuL6HxkXhNxMdwVIRvXYPLPOOUePOM9GBoA377zdRs5LS80NpreQYeN5YyCPzpljE+mxNFaaHJErHc2J0JY9Mkk5JrEtPEetX81ssECBT/AK3dbsMkQh2UZIwS+Vz/ADrV8J6pqWrWMk2owrG6uAoCbewJBGT0OR+FAEUmj2k15Ndy+Gt1xOytLIZly+3pnnnFdMDxS4ooAKKKKACiiigAooooAKTFLRQA3b70Yp1FADcdef8A61II1DFgME9T60+igBpHB5xQVz3p1FACY9KT606igBpXnP6UuKWigAooooA//9k='
                },
                styles: {
                    smallFontSize: {
                        fontSize: 10
                    },
                    titleFont: {
                        fontSize: 14,
                        margin: [0, 5, 0, 15]
                    },
                    titleSecondFont: {
                        fontSize: 12,
                        margin: [0, 5, 0, 15]
                    },
                    smallestFontSize: {
                        fontSize: 6
                    },
                    fontSizeEight: {
                        fontSize: 8
                    },
                    fontSizeNine: {
                        fontSize: 9
                    },
                    boldFontTen: {
                        fontSize: 10,
                        bold: true,
                    }
                }
            };

            var pdfDocument = pdfMake.createPdf(doc);

            pdfDocument.getDataUrl(function (dataUrl) {
                resolve(dataUrl);
            });

            //for view pdf
            /* saveBase64PDF(doc).then((base64pdf) => {

                document.getElementById('framePDF').src = `data:application/pdf;base64, ${encodeURI(base64pdf)}`;

                resolve(dataUrl);
            }); */
        } catch (error) {
            console.log(error)
        } finally {
            self.hideLoader('loader');
        }

    });
}

function getYesNO(boolValue) {
    if (boolValue)
        return 'Yes';
    else
        return 'No';
}

let createAnnexurePDF = () => {

    self.showLoader('loader');

    return new Promise((resolve, reject) => {
        try {

            var options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            let doc = {
                pageSize: 'A4',

                pageOrientation: 'potrait',

                pageMargins: [10, 30, 10, 30],

                content: [
                    get2TLogopdfData(),
                    {
                        canvas: [{
                            type: 'line',
                            x1: 0,
                            y1: 5,
                            x2: 575,
                            y2: 5,
                            lineWidth: 1,
                            lineCap: 'round'
                        }]
                    },
                    {
                        margin: [0, 15, 0, 0],
                        text: [{
                            text: 'Electronic Form Number ' + formNumber,
                            style: 'titleFont',
                            alignment: 'center'
                        }, ]
                    }, {
                        margin: [0, 15, 0, 0],
                        text: [{
                            text: `Dear Customer,\nPlaced below is the link to download your membership form along with Benefit Illustration. You are requested to download these documents and validate them by going through the process steps as given below.`,
                            style: 'smallFontSize',
                            alignment: 'justify'
                        }, ],
                    },
                    {
                        margin: [0, 15, 0, 0],
                        text: [{
                            text: `Customer Declaration\n`,
                            style: 'titleFont',
                            alignment: 'justify'
                        }, {
                            text: `\nI/We ${CUST_NAME} confirm that I/We have submitted the above referred electronic proposal to buy ${PLAN_NAME === 'Arogya Shield'? '' : 'SBI Life'} ${PLAN_NAME} (name of product) on my/our own accord.\n\nI/We also confirm that ${SR_NAME} (Name of Employee) bearing code no. ${SR_CODE} has explained the product features, benefits with documentation/information to me/us in my own language. I/We have also read and reviewed the custom benefit illustration including health questionnaire and understood/answered the same and I/We am/are satisfied with the product features.`,
                            style: 'smallFontSize',
                            alignment: 'justify',
                        }],
                    },
                    {
                        canvas: [{
                            type: 'line',
                            x1: 0,
                            y1: 5,
                            x2: 575,
                            y2: 5,
                            lineWidth: 1,
                            lineCap: 'round'
                        }]
                    },
                    {
                        canvas: [{
                            type: 'line',
                            x1: 0,
                            y1: 5,
                            x2: 575,
                            y2: 5,
                            lineWidth: 1,
                            lineCap: 'round'
                        }]
                    },
                    getWhatsAppConsent(),
                    {
                        style: 'smallFontSize',
                        margin: [0, 15, 0, 0],
                        table: {
                            widths: ['*', '*', '*'],
                            body: [
                                [{
                                        layout: 'noBorders',
                                        table: {
                                            widths: ['*', '*', '*'],
                                            body: [
                                                [{
                                                    text: `   `,
                                                    bold: true,
                                                    alignment: 'left',
                                                }, {}, {}],
                                                [{
                                                    text: `Authorised via OTP - ${document.getElementById('txtProposalOTP').value}, shared for form number ${formNumber} on ${dateDDFullMonthYYYY(currentDate.toISOString().substr(0, 10))}`,
                                                    alignment: 'center',
                                                    colSpan: 3,

                                                }, {}, {}],
                                                [{
                                                    text: `Signature of Member`,
                                                    bold: true,
                                                    alignment: 'center',
                                                    colSpan: 3,
                                                }, {

                                                }, {

                                                }]
                                            ]
                                        }
                                    }, {
                                        border: [false, false, false, false],
                                        table: {
                                            widths: ['*', '*', '*'],
                                            body: [
                                                [{
                                                    text: ``,
                                                    border: [false, false, false, false],
                                                    colSpan: 3,
                                                }, {

                                                }, {

                                                }],
                                                [{
                                                    text: ``,
                                                    border: [false, false, false, false],
                                                    colSpan: 3,
                                                }, {}, {}],
                                                [{
                                                    text: ``,
                                                    colSpan: 3,
                                                    border: [false, false, false, false],
                                                }, {

                                                }, {

                                                }]
                                            ]
                                        }
                                    },
                                    {
                                        layout: 'noBorders',
                                        table: {
                                            widths: ['*', '*', '*'],
                                            body: [
                                                [{
                                                    text: `   `,
                                                    bold: true,
                                                    alignment: 'center',
                                                }, {}, {}],
                                                [{
                                                    text: `${dateDDFullMonthYYYY(currentDate.toISOString().substr(0, 10))}`,
                                                    alignment: 'center',
                                                    colSpan: 3,

                                                }, {}, {}],
                                                [{
                                                    text: `Date`,
                                                    bold: true,
                                                    alignment: 'center',
                                                    colSpan: 3,
                                                }, {}, {}],
                                            ]
                                        }
                                    },
                                ]
                            ]
                        }
                    },
                ],
                images: {
                    sbiLogo: 'data:image/jpeg;base64,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'

                },
                styles: {
                    smallFontSize: {
                        fontSize: 10
                    },
                    titleFont: {
                        fontSize: 14,
                        margin: [0, 5, 0, 15]
                    },
                    titleSecondFont: {
                        fontSize: 12,
                        margin: [0, 5, 0, 15]
                    },
                    smallestFontSize: {
                        fontSize: 6
                    },
                    fontSizeEight: {
                        fontSize: 8
                    },
                    fontSizeNine: {
                        fontSize: 9
                    },
                    boldFontTen: {
                        fontSize: 10,
                        bold: true,
                    }
                }
            };

            var pdfDocument = pdfMake.createPdf(doc);

            pdfDocument.getDataUrl(function (dataUrl) {
                resolve(dataUrl);
            });

            //for view pdf
            /* saveBase64PDF(doc).then((base64pdf) => {

                document.getElementById('framePDF').src = `data:application/pdf;base64, ${encodeURI(base64pdf)}`;
            }); */
        } catch (error) {
            console.log(error)
        } finally {
            self.hideLoader('loader');
        }

    });
}

function getWhatsAppConsent() {

    let isWhatsAppConsent = [];

    if (IS_ESIGN == 'N' || IS_ESIGN == 'n') {

        var whatsAppConsentVal = document.getElementById('rbWhatsAppY').checked === true ? 'Yes' : 'No';

        isWhatsAppConsent.push({
            margin: [0, 15, 0, 0],
            text: [{
                text: `Do You want to receive all communication through Whatsapp? ${whatsAppConsentVal}`,
                style: 'titleFont',
                alignment: 'justify',
            }, ],
        }, {
            canvas: [{
                type: 'line',
                x1: 0,
                y1: 5,
                x2: 575,
                y2: 5,
                lineWidth: 1,
                lineCap: 'round'
            }]
        }, );
    }

    return isWhatsAppConsent;

}

function onClickThanks() {

    document.getElementById('myModal').style.display = 'none';
    //refresh the entire document
    document.location.reload();
}

function get2TLogopdfData() {

    return {
        margin: [0, 15, 0, 0],
        layout: 'noBorders',
        table: {
            widths: ['*', '*'],
            body: [
                [{},
                    {
                        image: `sbiLogo`,
                        width: 80,
                        alignment: 'right'
                    }
                ],
            ]
        }
    };
}

function getUserPdfData(imageData, textData, validateOrNot) {

    let multipleRowArray = [];

    if (imageData) {

        multipleRowArray.push({
            margin: [0, 15, 0, 0],
            style: 'tableExample',
            table: {
                widths: ['*', 'auto'],
                body: [
                    [`${textData}`, `${validateOrNot}`],
                ]
            }
        }, {
            margin: [0, 15, 0, 0],
            /* image: `data:image/png;base64,` + mUserPhoto, */
            /* image: `${canvasUser.toDataURL("image/png")}`, */
            image: `${imageData}`,
            fit: [150, 150],
            /* width: 150,
            height: 150, */
            alignment: 'center'
        });

    }

    return multipleRowArray;

}