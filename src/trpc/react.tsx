"use client"

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {httpBatchLink} from '@trpc/client';
import React, {useState} from 'react';
import {supabase} from "~/server/supabase/supabaseClient";
import {createTRPCReact} from "@trpc/react-query";
import type {AppRouter} from "~/server/api/root";
import {getUrl, transformer} from "~/trpc/shared";

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: {
    children: React.ReactNode;
    headers: Headers;
}) {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        api.createClient({
            links: [
                httpBatchLink({
                    url: getUrl(),
                    async headers() {
                        const heads = new Map(props.headers);
                        const {data} = await supabase().auth.getSession();

                        if (data.session) {
                            heads.set("authorization", data.session.access_token);
                        }

                        heads.set("x-trpc-source", "react");

                        return Object.fromEntries(heads);
                    },
                    transformer
                }),
            ],
        }),
    );

    return (
        <api.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </api.Provider>
    );
}