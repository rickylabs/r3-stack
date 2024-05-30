import { revalidatePath } from 'next/cache'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const path = request.nextUrl.searchParams.get('path')

    if (path) {
        revalidatePath(path)
        console.log("revalidated path", path)

        return Response.json({ revalidated: true, now: Date.now() })
    }

    console.error("failed revalidate path", path)

    return Response.json({
        revalidated: false,
        now: Date.now(),
        message: 'Missing path to revalidate',
    })
}