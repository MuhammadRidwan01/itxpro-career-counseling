import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"
import { validateNIS } from "./utils"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "Email/NIS", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          process.env.NODE_ENV !== "production" && console.log("❌ Missing credentials")
          return null
        }

        try {
          const isNIS = validateNIS(credentials.identifier)
          let user

          if (isNIS) {
            process.env.NODE_ENV !== "production" && console.log("🔍 Attempting NIS login:", credentials.identifier)
            // Login sebagai siswa dengan NIS
            const siswa = await prisma.siswa.findUnique({
              where: { nis: credentials.identifier },
              include: { user: true },
            })

            process.env.NODE_ENV !== "production" && console.log("👤 Found siswa:", siswa ? "Yes" : "No")
            if (siswa) {
              process.env.NODE_ENV !== "production" && console.log("📧 Siswa email:", siswa.email)
              process.env.NODE_ENV !== "production" && console.log("🔗 Has user relation:", siswa.user ? "Yes" : "No")
            }

            if (!siswa?.user) {
              process.env.NODE_ENV !== "production" && console.log("❌ No user found for siswa")
              return null
            }
            user = siswa.user
          } else {
            process.env.NODE_ENV !== "production" && console.log("🔍 Attempting email login:", credentials.identifier)
            // Login sebagai admin dengan email
            user = await prisma.user.findUnique({
              where: { email: credentials.identifier },
            })
            process.env.NODE_ENV !== "production" && console.log("👤 Found user:", user ? "Yes" : "No")
            if (user) {
              process.env.NODE_ENV !== "production" && console.log("🏷️ User role:", user.role)
            }
          }

          if (!user) {
            process.env.NODE_ENV !== "production" && console.log("❌ No user found in database")
            return null
          }

          process.env.NODE_ENV !== "production" && console.log("🔐 Comparing passwords...")
          process.env.NODE_ENV !== "production" && console.log("🔐 Stored hash length:", user.password.length)
          process.env.NODE_ENV !== "production" && console.log("🔐 Input password length:", credentials.password.length)

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
          process.env.NODE_ENV !== "production" && console.log("✅ Password valid:", isPasswordValid)

          if (!isPasswordValid) {
            process.env.NODE_ENV !== "production" && console.log("❌ Invalid password")
            return null
          }

          process.env.NODE_ENV !== "production" && console.log("🎉 Login successful for:", user.email)
          return {
            id: user.id,
            email: user.email,
            role: user.role,
          }
        } catch (error) {
          process.env.NODE_ENV !== "production" && console.error("💥 Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/admin",
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
}
