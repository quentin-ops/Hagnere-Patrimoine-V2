import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Protection des routes /backoffice
  if (pathname.startsWith("/backoffice")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET || "default-dev-secret-minimum-32-caracteres-pour-dev",
    })

    if (!token) {
      const url = new URL("/connexion", request.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/backoffice/:path*"],
}