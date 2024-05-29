import Link from "next/link";
import {Suspense} from "react";
import {ServerDataStreaming} from "./_components/ServerDataStreaming";
import {ClientFetchTest} from "~/app/_components/ClientFetchTest";
import {Button} from "~/components/ui/button";
import {Card} from "~/components/ui/card";

const Homepage = async () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <div className="flex flex-col items-center gap-6">
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                        Nextjs 14 App router starter
                    </h1>
                    <p className="font-extrabold tracking-tight sm:text-[2rem]">
                        Based On
                    </p>
                    <p className="text-xl font-extrabold tracking-tight sm:text-[3rem]">
                        Create <span className="text-[hsla(167,8%,56%,.1)]">T3</span> App
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
                    <Link
                        className="flex max-w-xs flex-col gap-4 rounded-xl"
                        href="https://create.t3.gg/en/usage/first-steps"
                        target="_blank"
                    >
                        <Card className="p-4">
                            <h3 className="text-2xl font-bold">First Steps →</h3>
                            <div className="text-lg">
                                Just the basics - Everything you need to know to set up your
                                database and authentication.
                            </div>
                        </Card>
                    </Link>
                    <Link
                        className="flex max-w-xs flex-col gap-4 rounded-xl "
                        href="https://create.t3.gg/en/introduction"
                        target="_blank"
                    >
                        <Card className="p-4">
                            <h3 className="text-2xl font-bold">Documentation →</h3>
                            <div className="text-lg">
                                Learn more about Create T3 App, the libraries it uses, and how to
                                deploy it.
                            </div>
                        </Card>
                    </Link>
                </div>
                <div className="flex w-full flex-1 flex-col items-center gap-4">
                    <Link href="/login" className="text-lg">
                        <Button>
                            Login
                        </Button>
                    </Link>
                    <Link href="/authenticated" className="text-lg">
                        <Button variant="outline">
                            Authenticated Route Example
                        </Button>
                    </Link>
                </div>
                <Suspense fallback={
                    <p className="text-2xl">Streaming Client Query...</p>
                }
                >
                    <ClientFetchTest/>
                </Suspense>
                <Suspense
                    fallback={
                        <p className="text-2xl">Streaming TRPC Query...</p>
                    }
                >
                    <ServerDataStreaming/>
                </Suspense>
            </div>
        </main>
    );
};

export default Homepage;
