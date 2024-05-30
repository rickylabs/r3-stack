import {api} from "~/trpc/server";

export const UserInfo = async () => {
    const data = await api.auth.getProfile.query();

    return (
        <>
            <h3 className="text-2xl font-bo§ld">User Information</h3>
            <div className="text-lg">Email: {data?.email}</div>
            <div className="text-lg">Name: {data?.fullName}</div>
        </>
    );
};