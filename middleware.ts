import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Redirect authenticated users from auth/root pages to their dashboard
    if (token && pathname.startsWith("/auth")) { // Hapus "|| pathname === "/""
      if (token.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url))
      }
      if (token.role === "STUDENT") {
        return NextResponse.redirect(new URL("/student/dashboard", req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Public routes (handled by middleware function directly for redirects)
        if (pathname.startsWith("/auth")) { // Hapus "|| pathname === "/""
          return true
        }
        if (pathname === "/") { // Tambahkan kondisi terpisah untuk "/"
          return true;
        }

        // Admin routes
        if (pathname.startsWith("/admin")) {
          return token?.role === "ADMIN"
        }

        // Student routes
        if (pathname.startsWith("/student")) {
          return token?.role === "STUDENT"
        }

        // API routes
        if (pathname.startsWith("/api")) {
          return !!token
        }

        return !!token
      },
    },
  },
)

export const config = {
  matcher: ["/admin/:path*", "/student/:path*", "/api/admin/:path*", "/api/student/:path*"],
}
