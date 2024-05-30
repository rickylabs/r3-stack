"use client"

import {Button} from "~/components/ui/button";
import Link from "next/link";
import {useUser} from "~/providers/AuthProvider/AuthProvider";

export const AuthButton = () => {
    const {session, isLoading, logout} = useUser();

    if(isLoading) {
        return (
            <Link href="#" className="text-lg">
                <Button disabled variant="outline">Loading</Button>
            </Link>
        );
    }

    return (
        <>
            {session ?
                <Link href="/logout" className="text-lg">
                    <Button variant="outline" onClick={() => logout()}>Logout</Button>
                </Link>
                :
                <Link href="/login" className="text-lg">
                    <Button>Login</Button>
                </Link>
            }
        </>
    )
}