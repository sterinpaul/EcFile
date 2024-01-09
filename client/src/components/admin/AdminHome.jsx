import { useState, useEffect } from "react"
import { getUserData } from "../../api/apiConnections"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { CLOUDINARY_PROFILE_PIC } from '../../constants/paths'

export const AdminHome = () => {
    const [users, setUsers] = useState([])
    const getUsers = async () => {
        const response = await getUserData()
        if (response) {
            setUsers(response)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    const TABLE_HEAD = ["Users", "E-mail", "Mobile", "Status"];

    return (
        <div className="flex justify-center mt-20 p-4">


            <Card className="h-full w-full shadow-xl">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className=" flex items-center justify-between gap-8">
                        
                        <Typography variant="h5" color="blue-gray">
                            User list
                        </Typography>
                        
                    </div>
                    {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>
                    </div> */}
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map(
                                ({ profilePic, fullName, email, mobile, isValid }, index) => {
                                    const isLast = index === users.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={mobile}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={CLOUDINARY_PROFILE_PIC + profilePic} alt={mobile} size="sm" />
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal capitalize"
                                                        >
                                                            {fullName}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70 lowercase"
                                                >
                                                    {email}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {mobile}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                    <Chip
                                                        variant="ghost"
                                                        size="sm"
                                                        value={isValid ? "Verified" : "Unverified"}
                                                        color={isValid ? "green" : "blue-gray"}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    {/* <Typography variant="small" color="blue-gray" className="font-normal">
                        Page 1 of 10
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm">
                            Previous
                        </Button>
                        <Button variant="outlined" size="sm">
                            Next
                        </Button>
                    </div> */}
                </CardFooter>
            </Card>
        </div>
    )
}
