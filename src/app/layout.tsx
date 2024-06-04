import {TailwindIndicator} from "~/components/TailwindIndicator";
import {Providers} from "~/providers";
import {cn} from "~/utils/cn";
import {Roboto} from "next/font/google";
import {getServerUser} from "~/utils/auth";
import {AuthProvider} from "~/providers/AuthProvider/AuthProvider";
import {TRPCReactProvider} from "~/trpc/react";
import {cookies, headers} from "next/headers";
import CssBaseline from "@mui/material/CssBaseline";
import {ToastProvider} from "~/providers/ToastProvider/ToastProvider";
import ThemeProvider from "~/theme";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {ThemeProvider as NextThemeProvider} from "next-themes";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

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
    const theme = cookies().get("theme")

    return (
        <>
            <html id="mode-toggle" suppressHydrationWarning={true}>
            <head/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <body
                    id={"__next"}
                    className={cn(
                        "min-h-screen font-sans antialiased",
                        font.className,
                    )}
                >
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    <CssBaseline/>
                    <NextThemeProvider
                        attribute="theme"
                        defaultTheme={theme?.value ?? "system"}
                        enableSystem
                        //disableTransitionOnChange
                    >
                        <ThemeProvider mode={theme?.value}>
                            <TRPCReactProvider headers={headers()}>
                                <ToastProvider>
                                    <AuthProvider {...user}>
                                        <Providers>
                                            <Box component={"main"} pt={{xs: 8, sm: 10, lg: 12}} pb={6} position="relative" zIndex={1}>
                                                {children}
                                            </Box>
                                        </Providers>
                                    </AuthProvider>
                                </ToastProvider>
                            </TRPCReactProvider>
                        </ThemeProvider>
                    </NextThemeProvider>
                </AppRouterCacheProvider>
                <TailwindIndicator/>
                <div key="bg" className="bg-blur">
                    <div key="shape-1" id="shape-1" className="shape-blur"/>
                    <div key="shape-2" id="shape-2" className="shape-blur"/>
                    <div key="shape-3" id="shape-3" className="shape-blur"/>
                </div>
                <div key="bg" className="waves">
                    <div key="shape-1" id="vawe-1" className="wave"/>
                    <div key="shape-2" id="wave-2" className="wave"/>
                    <div key="shape-3" id="vawe-3" className="wave"/>
                    <div key="shape-4" id="vawe-4" className="wave"/>
                </div>
            </body>
            </html>
        </>
    );
}

export default RootLayout;
