import NextAuth from 'next-auth'
import { compare } from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from '@/lib/db'

const handler = NextAuth({
    session: {
        strategy: 'jwt'

    },
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Credenciales erroneas")
                }

                const user = await db?.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!user || !user?.hashedPassword) {
                    throw new Error("Credenciales erroneas")
                }
                const isCorrectPassword = await compare(
                    credentials.password,
                    user.hashedPassword
                )
                if (!isCorrectPassword) {
                    throw new Error("Credenciales erroneas")
                }


                return user
            }
        })
    ]
})

export { handler as GET, handler as POST }