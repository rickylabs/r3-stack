"use client";

import {type Provider} from "@supabase/supabase-js";
import {Icons} from "~/components/Icons";
import {Button} from "~/components/ui/button";
import {supabase} from "~/server/supabase/supabaseClient";
import {DevLoginButtons} from "../_components/DevLoginButtons";

const Page = () => {
    const signInWithOauth = async (provider: Provider) => {
        const response = await fetch(`/api/revalidate?path=/`, { cache: 'no-store' })
        const {revalidated} = await response.json()

        if(revalidated) {
            void supabase().auth.signInWithOAuth({
                provider: provider,
            });
        } else {
            console.error("failed to revalidate path")
        }

    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <div className="flex flex-col items-center gap-6">
                    <h1 className="text-3xl font-extrabold tracking-tight ">
                        Login
                    </h1>

                    <div className="flex max-w-xs flex-col gap-4 rounded-xl  p-4  ">
                        <Button
                            variant="outline"
                            className="flex flex-row gap-2"
                            onClick={async () => {
                                await signInWithOauth("google");
                            }}
                        >
                            <Icons.google width={16}/>
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            className="flex flex-row gap-2"
                            onClick={() => {
                                signInWithOauth("github");
                            }}
                        >
                            <Icons.gitHub width={16}/>
                            Github
                        </Button>
                    </div>
                </div>
            </div>
            {process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" && (
                <DevLoginButtons/>
            )}
        </main>
    );
};

export default Page;
