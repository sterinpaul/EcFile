import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setToken,setUser } from '../../redux/userSlice';
import { login } from "../../api/apiConnections";
import {
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button
} from "@material-tailwind/react";


const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const mobileNumberHandle = (e) => {
        let mobileValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
        if (/^[0-5]/.test(mobileValue)) {
            mobileValue = mobileValue.slice(1);
        }
        formik.setFieldValue('mobile', mobileValue)
    }


    const formik = useFormik({
        initialValues: {
            mobile: '',
            password: ''
        },
        validationSchema: Yup.object({
            mobile: Yup.string()
                .matches(/^[6-9][0-9]{9}$/, 'Invalid mobile number')
                .required('Required'),
            password: Yup.string()
                .max(20, 'Must be less than 20 characters')
                .min(8, 'Must be 8 characters or more')
                .required('Required')
        }),
        onSubmit: async (values) => {
            
            const response = await login(values)
            if (response?.status) {
                dispatch(setToken(response?.token))
                dispatch(setUser(response?.data?._id))
                navigate('/')
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
                    color="blue"
                    className="mb-4 grid h-28 place-items-center"
                >

                    <Typography variant="h1" color="white" className="font-kaushan">
                        Login
                    </Typography>

                </CardHeader>
                <CardBody className="flex flex-col gap-2">

                    <div>
                        <Input type="text" id="mobile" size="lg" label="Mobile" value={formik.values.mobile} onChange={mobileNumberHandle} />

                        <p className="h-4 ml-2 text-xs text-red-800">{formik.touched.mobile && formik.errors.mobile ?
                            formik.errors.mobile : null}</p>
                    </div>

                    <Input type="password" label="Password" size="lg" id="password" value={formik.values.mobile} maxLength={20}
                        {...formik.getFieldProps('password')} />
                    <p className="h-4 ml-2 text-xs text-red-800">{formik.touched.password && formik.errors.password ?
                        formik.errors.password : null}</p>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button type="submit" color="blue" variant="gradient" fullWidth>
                        Submit
                    </Button>

                </CardFooter>
            </form>
           
        </>
    )
}

export default LoginForm
