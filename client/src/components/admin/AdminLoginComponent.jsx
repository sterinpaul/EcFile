import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setAdminToken } from '../../redux/adminSlice';
import { useState } from 'react';
import { adminLogin } from "../../api/apiConnections";

import {
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button
} from "@material-tailwind/react";


const AdminLoginComponent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .max(20, 'Must be less than 20 characters')
                .min(8, 'Must be 8 characters or more')
                .required('Required')
        }),
        onSubmit: async (values) => {
            const response = await adminLogin(values)
            if (response?.status) {
                dispatch(setAdminToken(response?.adminToken))
                navigate('/admin')
                toast.success(response?.message)
            } else {
                toast.error(response?.message)
            }
        }
    })


    return (
        <>
            <form onSubmit={formik.handleSubmit}>

                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-4 grid h-28 place-items-center"
                >

                    <Typography variant="h1" color="white" className="font-kaushan">
                        Admin
                    </Typography>

                </CardHeader>
                <CardBody className="flex flex-col gap-2">

                    <div>
                        <Input type="email" id="email" size="lg" label="E-mail" value={formik.values.email} 
                        {...formik.getFieldProps('email')}/>
                        <p className="h-4 ml-2 text-xs text-red-800">{formik.touched.email && formik.errors.email ?
                            formik.errors.email : null}</p>
                    </div>

                    <Input type="password" label="Password" size="lg" id="password" value={formik.values.mobile} maxLength={20}
                        {...formik.getFieldProps('password')} />
                    <p className="h-4 ml-2 text-xs text-red-800">{formik.touched.password && formik.errors.password ?
                        formik.errors.password : null}</p>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button type="submit" color="gray" variant="gradient" fullWidth>
                        Submit
                    </Button>

                </CardFooter>
            </form>
           
        </>
    )
}

export default AdminLoginComponent
