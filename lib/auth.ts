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
          console.log("❌ Missing credentials")
          return null
        }

        try {
          const isNIS = validateNIS(credentials.identifier)
          let user

          if (isNIS) {
            console.log("🔍 Attempting NIS login:", credentials.identifier)
            // Login sebagai siswa dengan NIS
            const siswa = await prisma.siswa.findUnique({
              where: { nis: credentials.identifier },
              include: { user: true },
            })

            console.log("👤 Found siswa:", siswa ? "Yes" : "No")
            if (siswa) {
              console.log("📧 Siswa email:", siswa.email)
              console.log("🔗 Has user relation:", siswa.user ? "Yes" : "No")
            }

            if (!siswa?.user) {
              console.log("❌ No user found for siswa")
              return null
            }
            user = siswa.user
          } else {
            console.log("🔍 Attempting email login:", credentials.identifier)
            // Login sebagai admin dengan email
            user = await prisma.user.findUnique({
              where: { email: credentials.identifier },
            })
            console.log("👤 Found user:", user ? "Yes" : "No")
            if (user) {
              console.log("🏷️ User role:", user.role)
            }
          }

          if (!user) {
            console.log("❌ No user found in database")
            return null
          }

          console.log("🔐 Comparing passwords...")
          console.log("🔐 Stored hash length:", user.password.length)
          console.log("🔐 Input password length:", credentials.password.length)

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
          console.log("✅ Password valid:", isPasswordValid)

          if (!isPasswordValid) {
            console.log("❌ Invalid password")
            return null
          }

          console.log("🎉 Login successful for:", user.email)
          return {
            id: user.id,
            email: user.email,
            role: user.role,
          }
        } catch (error) {
          console.error("💥 Auth error:", error)
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
