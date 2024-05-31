    "use client"

import Button from "@mui/material/Button";
import Link from "next/link";
import {useUser} from "~/providers/AuthProvider/AuthProvider";

export const AuthButton = () => {
    const {session, isLoading, logout} = useUser();

    if(isLoading) {
        return (
            <Link href="#" className="text-lg">
                <Button disabled color="primary" variant="outlined">Loading</Button>
            </Link>
        );
    }

    return (
        <>
            {session ?
                <Link href="/logout" className="text-lg">
                    <Button color="primary" variant="outlined" onClick={() => logout()}>Logout</Button>
                </Link>
                :
                <Link href="/login" className="text-lg">
                    <Button color="primary" variant="contained">Login</Button>
                </Link>
            }
        </>
    )
}