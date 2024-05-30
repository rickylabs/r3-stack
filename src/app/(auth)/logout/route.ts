import {supabase} from "~/server/supabase/supabaseClient";
import {cookies} from "next/headers";
import {type NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    const { error } = await supabase().auth.signOut()

    if(!error) {
        cookies().delete("access-token");
        cookies().delete("refresh-token");
    }

    return NextResponse.redirect(new URL('/login', request.url))
}