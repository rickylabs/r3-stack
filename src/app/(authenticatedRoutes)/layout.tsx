import {type PropsWithChildren} from "react";

export default function Layout({children}: PropsWithChildren) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            {children}
        </main>
    );
}
