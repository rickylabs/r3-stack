import type {FetchCreateContextFnOptions} from '@trpc/server/adapters/fetch';
import {getServerUser} from "~/utils/auth";

export async function createContext(opts?: FetchCreateContextFnOptions) {
    const data = await getServerUser();

    return {
        ...data,
        headers: opts && Object.fromEntries(opts.req.headers),
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;