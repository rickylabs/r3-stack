import {TailwindIndicator} from "~/components/TailwindIndicator";
import {Providers} from "~/providers";
import {cn} from "~/utils/cn";
import {Roboto} from "next/font/google";
import {getServerUser} from "~/utils/auth";
import {AuthProvider} from "~/providers/AuthProvider/AuthProvider";
import {TRPCReactProvider} from "~/trpc/react";
import {headers} from "next/headers";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import theme from "~/theme";
import {CssVarsProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {ToastProvider} from "~/providers/ToastProvider/ToastProvider";

export const metadata = {
    title: "t3-app-dir-supabase",
    description: "Boilerplate for t3-app-dir-supabase.",
};

const font = Roboto({
    weight: ["100", "300", "400", "500", "700", "900"],
    subsets: ["latin"],
});

async function RootLayout({children}: { children: React.ReactNode }) {
    const user = await getServerUser();

    return (
        <>
            <html suppressHydrationWarning={true}>
            <head/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <body
                id={"__next"}
                className={cn(
                    "min-h-screen font-sans antialiased background-default",
                    font.className,
                )}
            >
                <CssBaseline />
                <AppRouterCacheProvider options={{ enableCssLayer: true, prepend:true }}>
                    <CssVarsProvider theme={theme}>
                        <TRPCReactProvider headers={headers()}>
                            <ToastProvider>
                                <AuthProvider {...user}>
                                    <Providers>
                                        {children}
                                    </Providers>
                                </AuthProvider>
                            </ToastProvider>
                        </TRPCReactProvider>
                    </CssVarsProvider>
                </AppRouterCacheProvider>
                <TailwindIndicator/>
            </body>
            </html>
        </>
    );
}

export default RootLayout;
