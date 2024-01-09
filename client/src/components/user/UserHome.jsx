import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { getUserDetails } from "../../api/apiConnections"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import {CLOUDINARY_PROFILE_PIC} from '../../constants/paths'

export const UserHome = () => {
    const userId = useSelector(store => store.user.userId)
    const [user, setUser] = useState({})
    const getUser = async () => {
        const response = await getUserDetails(userId)
        if (response) {
            setUser(response)
        }
    }

    useEffect(() => {
        getUser()
    }, [])
    return (
        <div className="flex justify-center w-screen mt-20">
            <Card className="w-96 shadow-2xl">
                <CardHeader floated={false} className="h-80">
                    <img className="w-full h-full object-cover" src={CLOUDINARY_PROFILE_PIC+user?.profilePic} alt="profile-picture" />
                </CardHeader>
                <CardBody className="text-center">
                    <Typography variant="h4" color="blue-gray" className="mb-2 capitalize">
                        Name: {user?.fullName}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium" textGradient>
                        E-mail: {user?.email}
                    </Typography>
                    <Typography color="gray" className="font-medium" textGradient>
                        Mobile: {user?.mobile}
                    </Typography>
                </CardBody>
                <CardFooter className="flex justify-center gap-7 pt-2">
                    <Tooltip content="Like">
                        <Typography
                            as="a"
                            href="#facebook"
                            variant="lead"
                            color="blue"
                            textGradient
                        >
                            <i className="fab fa-facebook" />
                        </Typography>
                    </Tooltip>
                    <Tooltip content="Follow">
                        <Typography
                            as="a"
                            href="#twitter"
                            variant="lead"
                            color="light-blue"
                            textGradient
                        >
                            <i className="fab fa-twitter" />
                        </Typography>
                    </Tooltip>
                    <Tooltip content="Follow">
                        <Typography
                            as="a"
                            href="#instagram"
                            variant="lead"
                            color="purple"
                            textGradient
                        >
                            <i className="fab fa-instagram" />
                        </Typography>
                    </Tooltip>
                </CardFooter>
            </Card>

        </div>
    )
}
