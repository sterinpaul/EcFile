import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import lodash from 'lodash'
import { signUp } from "../../api/apiConnections";
import { auth } from "../../api/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { XMarkIcon } from "@heroicons/react/20/solid";
import {
    Checkbox,
    Input,
    Button,
    Typography,
    Dialog,
    DialogBody,
    Avatar
} from "@material-tailwind/react";


const SignUpForm = ({setSignIn}) => {
    const navigate = useNavigate()
    const [otpError, setOtpError] = useState(false)
    const [otpVerificationContainer, setOtpVerificationContainer] = useState(true)
    const [open, setOpen] = useState(false)
    const [otp, setOtp] = useState('')
    const [proImage, setProImage] = useState(null)
    const [submitStatus, setSubmitStatus] = useState(false)
    const [imageStatus, setImageStatus] = useState(true)
    const profileImageRef = useRef(null)


    useEffect(() => {
        recaptchaRender()
    }, [])

    const recaptchaRender = async () => {
        try {
            auth.useDeviceLanguage()
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'captchaContainer', {
                'size': 'invisible',
                'callback': () => { }
            })
            
        } catch (error) {
            console.log('Error in captcha', error)
        }
    }

    const handleOpen = () => setOpen(!open)

    const sendOTP = () => {
        if (formik?.values?.mobile?.length === 10) {
            setOpen(true)
            setOtpError(false)
            const phoneNumber = `+91${formik?.values?.mobile}`
            const appVerifier = window.recaptchaVerifier

            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult
                }).catch((error) => {
                    console.log('Error; SMS not sent', error)
                }
                )
        }
    }

    const handleVerifyOTP = () => {
        if (otp.length === 6) {
            window.confirmationResult
                .confirm(otp)
                .then(() => {
                    setOtpVerificationContainer(false)
                    setTimeout(() => {
                        setOpen(false)
                    }, 2000);
                })
                .catch(() => {
                    setOtpError(true)
                })
        } else {
            console.log('otp length should be 6')
        }
    }

    const mobileNumberHandle = (e) => {
        let mobileValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
        if (/^[0-5]/.test(mobileValue)) {
            mobileValue = mobileValue.slice(1);
        }
        formik.setFieldValue('mobile', mobileValue)
    }
    const otpHandler = (e) => {
        const otpNumber = e.target.value.replace(/[^0-9]/g, '').slice(0, 6)
        setOtp(otpNumber)
    }

    const clearImage = () => {
        setProImage(null)
    }

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            rePassword: '',
            mobile: '',
            // agreeTerms: false
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .max(20, 'Must be less than 20 characters')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(8, 'Must be 8 characters or more')
                .required('Required'),
            rePassword: Yup.string()
                .oneOf([Yup.ref('password'), ''], 'Password not match')
                .required('Required'),
            mobile: Yup.string()
                .matches(/^[6-9][0-9]{9}$/, 'Invalid mobile number')
                .required('Required'),
            // agreeTerms: Yup.boolean()
            //     .oneOf([true], "You must agree to the terms and conditions")
        }),
        onSubmit: async (values) => {
            const data = lodash.omit(values, 'rePassword')
            if (proImage) {
                setSubmitStatus(true)
                const response = await signUp(data, proImage)
                if (response?.status) {
                    setSignIn(true)
                    toast.success('Registration success. Please verify your email')
                } else {
                    setSubmitStatus(false)
                    toast.error('User already exists')
                }
            } else {
                setImageStatus(false)
                setTimeout(() => {
                    setImageStatus(true)
                }, 2000)
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className="w-80">
            <Typography variant="h3" color="blue" className="text-center">
                Sign Up
            </Typography>

            <div className="mt-4">
                <div className="flex flex-col gap-2">

                    <div className="flex flex-col gap-1 items-center">

                        {proImage ? <div className="relative group"><Avatar className="w-20 h-20" src={URL.createObjectURL(proImage)} alt="avatar" />
                            <div onClick={clearImage} className="absolute justify-center items-center cursor-pointer hidden group-hover:flex bg-blue-gray-500 opacity-80 h-full w-full top-0 rounded-full">
                                <XMarkIcon className="w-10 h-10 text-black" />
                            </div>
                        </div> : <Button onClick={() => profileImageRef.current?.click()} variant="outlined" size="sm" className="capitalize rounded-full">Choose image<input ref={profileImageRef} type="file" accept=".jpg,.jpeg,.png" id="image" name="image" label="Profile Image" className="w-0"
                                onChange={(e) => setProImage(e.target.files[0])} /></Button>}

                        <p className="h-4 text-xs text-center text-red-800">{!imageStatus && 'Upload your profile photo'}</p>
                    </div>
                    <div>
                        <Input type="text" id="fullName" size="lg" label="Full Name"
                            {...formik.getFieldProps('fullName')} />
                        <p className="h-4 ml-2 text-xs text-red-800">{formik.touched.fullName && formik.errors.fullName ?
                            formik.errors.fullName : null}</p>
                    </div>

                    <div>
                        <Input type="email" id="email" size="lg" label="E-mail"
                            {...formik.getFieldProps('email')} />
                        <p className="h-4 ml-2 text-xs text-red-800">{formik.touched.email && formik.errors.email ?
                            formik.errors.email : null}</p>
                    </div>


                    <div>
                        <Input type="password" id="password" size="lg" label="Password"
                            {...formik.getFieldProps('password')} />
                        <p className="h-4 ml-2 text-xs text-red-800">{formik.touched.password && formik.errors.password ?
                            formik.errors.password : null}</p>
                    </div>

                    <div>
                        <Input type="password" id="rePassword" size="lg" label="Re-type Password"
                            {...formik.getFieldProps('rePassword')} />
                        <p className="h-4 ml-2 text-xs text-red-800">{formik.touched.rePassword && formik.errors.rePassword ?
                            formik.errors.rePassword : null}</p>
                    </div>

                    <div>
                        <Input type="text" id="mobile" size="lg" label="Mobile" disabled={!otpVerificationContainer} value={formik.values.mobile} onChange={mobileNumberHandle} />

                        <p className="h-4 ml-2 text-xs text-red-800">{formik.touched.mobile && formik.errors.mobile ?
                            formik.errors.mobile : null}</p>
                    </div>

                    <div id="captchaContainer"></div>

                    {otpVerificationContainer && <Button onClick={sendOTP} className="p-2 rounded-full w-28 ml-auto mr-auto capitalize" variant="outlined" >Send OTP</Button>}
                </div>


                <Dialog open={open} handler={handleOpen} className="w-1/2 h-56" size="xs">
                    <div className="flex items-center justify-end">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="m-3 h-5 w-5"
                            onClick={handleOpen}
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>


                    <div className="h-40">
                        {otpVerificationContainer ? (
                            <DialogBody className="flex flex-col items-center justify-center p-1">
                                <h1 className="text-lg text-black font-bold mb-1">OTP Sent</h1>
                                <div>
                                    <Input type="text" className="" value={otp} onChange={otpHandler} label="Enter otp" />

                                </div>
                                <p className="text-red-900 mt-1 text-xs h-4">{otpError ? 'Invalid OTP' : ''}</p>

                                <Button className="w-28 m-2 capitalize" size='sm' variant="gradient" color="green" onClick={handleVerifyOTP}>
                                    Verify
                                </Button>

                            </DialogBody>) : <div className="flex flex-col items-center justify-center pt-4">
                            <div className="w-16 h-16 bg-blue-400 rounded-full text-white text-4xl text-center flex justify-center items-center">✔</div>
                            <p className="p-2">OTP Verified</p>
                        </div>}
                    </div>


                </Dialog>


                {!otpVerificationContainer && <Button type="submit" disabled={submitStatus} className="mt-2" color="blue" variant="gradient" fullWidth>
                    Submit
                </Button>}

            </div>
        </form>
    )
}

export default SignUpForm