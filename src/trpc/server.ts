import {loggerLink,} from "@trpc/client";
import {cookies,} from "next/headers";
import {type AppRouter,} from "~/server/api/root";
import {getUrl,} from "./shared";
import {experimental_nextHttpLink} from '@trpc/next/app-dir/links/nextHttp';
import {experimental_createTRPCNextAppDirServer} from '@trpc/next/app-dir/server';
import superjson from "superjson";

export const api = experimental_createTRPCNextAppDirServer<AppRouter>({
    config() {
        return {
            links: [
                loggerLink({
                    enabled: (_) => true,
                }),
                experimental_nextHttpLink({
                    batch: true,
                    url: getUrl(),
                    transformer: superjson,
                    headers() {
                        return {
                            cookie: cookies().toString(),
                            'x-trpc-source': 'rsc-http',
                        };
                    },
                }),
            ],
        };
    },
});