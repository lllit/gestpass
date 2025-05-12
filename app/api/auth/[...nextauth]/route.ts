import NextAuth, { DefaultSession } from 'next-auth'
import { compare } from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from '@/lib/db'


declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & { id?: string };
    }

    interface JWT {
        id?: string;
    }
}



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
                try {
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

                } catch (error) {
                    console.error("Error en authorize:", error);
                    throw error;

                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = session.user || {}; // Asegura que `session.user` existe
            if (token.id && typeof token.id === 'string') {
                session.user.id = token.id;
            }
            return session;
        },
    },

})

export { handler as GET, handler as POST }