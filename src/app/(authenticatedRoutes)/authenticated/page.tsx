import {Suspense} from "react";
import {UserInfo} from "./_components/UserInfo";

const AuthenticatedExample = async () => {

    return (
        <>
            <div className="container flex flex-col items-center justify-center gap-12">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                    Authenticated Route Example
                </h1>
                <div className="flex max-w-xs flex-col gap-4 rounded-xl  p-4">
                    <Suspense fallback={
                        <>
                            <h3 className="text-2xl font-bo§ld">User Information</h3>
                            <div className="text-lg">Email: loading...</div>
                            <div className="text-lg">Name: loading...</div>
                        </>
                    }>
                        <UserInfo/>
                    </Suspense>
                </div>
                </div>
        </>
    );
};

export default AuthenticatedExample;
