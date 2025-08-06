import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    role?: string
    nis?: string // Add nis property
  }
  interface Session {
    user: User & {
      role?: string
    }
  }
}
