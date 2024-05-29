"use client"


import {api} from "~/trpc/react";

export const ClientFetchTest = () => {
    const [hello, _] = api.example.hello.useSuspenseQuery({text: "from tRPC"});


    return (
        <p className="text-2xl">{hello?.greeting} from client</p>
    );
};