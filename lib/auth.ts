import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

const authSecret =
  process.env.NEXTAUTH_SECRET ||
  (process.env.NODE_ENV !== "production" ? "dev-secret-fallback" : undefined)

if (process.env.NODE_ENV === "production" && !process.env.NEXTAUTH_SECRET) {
  console.warn("[auth] NEXTAUTH_SECRET est requis en production")
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: authSecret,
  pages: {
    signIn: "/connexion",
    error: "/connexion",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase()
        const hasPassword = Boolean(credentials?.password)

        console.log('[auth][credentials] tentative de connexion', {
          email,
          hasPassword,
        })

        if (!email || !credentials?.password) {
          console.error('[auth][credentials] email ou mot de passe manquant')
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          })

          if (!user || !user.passwordHash) {
            console.error('[auth][credentials] utilisateur introuvable ou sans mot de passe', {
              email,
              hasUser: Boolean(user),
            })
            return null
          }

          const passwordValid = await bcrypt.compare(
            credentials.password,
            user.passwordHash
          )

          if (!passwordValid) {
            console.error('[auth][credentials] mot de passe invalide', { email })
            return null
          }

          console.log('[auth][credentials] connexion réussie', {
            email: user.email,
            userId: user.id,
            role: user.role,
          })

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('[auth][credentials] erreur interne', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
  },
}
