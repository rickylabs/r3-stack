import {api} from "~/trpc/server";

const AuthenticatedExample = async () => {
    const data = await api.auth.getProfile.query();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="container flex flex-col items-center justify-center gap-12">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                    Authenticated Route Example
                </h1>
                <div className="flex max-w-xs flex-col gap-4 rounded-xl  p-4">
                    <h3 className="text-2xl font-bo§ld">User Information</h3>
                    <div className="text-lg">Email: {data?.email}</div>
                    <div className="text-lg">Name: {data?.fullName}</div>
                </div>
            </div>
        </main>
    );
};

export default AuthenticatedExample;
