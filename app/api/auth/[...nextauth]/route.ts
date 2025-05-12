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
                    throw new Error("Faltan datos: email y password son requeridos.")
                }

                const user = await db?.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!user) {
                    throw new Error("Usuario no encontrado en la base de datos.");
                }
                if (!user.hashedPassword) {
                    throw new Error("No se encontró contraseña almacenada para este usuario.");
                }

                const isCorrectPassword = await compare(
                    credentials.password,
                    user.hashedPassword
                )
                if (!isCorrectPassword) {
                    throw new Error("La contraseña ingresada es incorrecta.")
                }


                return user
            }
        })
    ]
})

export { handler as GET, handler as POST }