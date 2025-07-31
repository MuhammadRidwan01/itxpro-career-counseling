import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Public routes
        if (pathname.startsWith("/auth") || pathname === "/") {
          return true
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
