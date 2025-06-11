# 🔐 Gestión Segura de Contraseñas  

Este proyecto es una aplicación de **gestión segura de contraseñas**, desarrollada con **Next.js** y **React**, siguiendo el patrón de diseño **MVC** para mantener una **estructura modular y eficiente**. Su objetivo es permitir a los usuarios **almacenar, gestionar y encriptar contraseñas** de manera segura, además de generar claves robustas que incluyan caracteres especiales.  

## 🌟 Características Principales  

- **Gestión de Contraseñas** – Los usuarios pueden almacenar y administrar sus contraseñas de forma segura.  
- **Cifrado** – Las contraseñas se encriptan para garantizar la **seguridad de los datos**.  
- **Generación de Claves Seguras** – La aplicación incluye un generador de **contraseñas robustas**.  
- **Autenticación** – Utiliza **NextAuth** con un proveedor de credenciales para manejar el **inicio de sesión** de los usuarios.  
- **Base de Datos** – Se utiliza **Prisma** como ORM para interactuar con la base de datos.  

## 🛠️ Tecnologías Utilizadas  

- **Next.js** – Framework para construir **aplicaciones web modernas**.  
- **React** – Biblioteca para construir **interfaces de usuario interactivas**.  
- **Prisma** – ORM para la **gestión de la base de datos**.  
- **bcrypt** – Para **encriptar y comparar contraseñas**.  
- **Radix UI** – Para componentes accesibles y estilizados.  
- **Sonner** – Para **notificaciones en la interfaz**.  

## 🏗️ Estructura del Proyecto  

- **`app/`** – Contiene las rutas y componentes principales de la aplicación.  
- **`components/`** – Componentes reutilizables para la interfaz de usuario.  
- **`prisma/`** – Configuración y generación del cliente **Prisma**.  
- **`lib/`** – Funciones auxiliares, como la conexión a la **base de datos**.  
- **`middleware.ts`** – Middleware para manejar solicitudes específicas.  
- **`next-auth/`** – Configuración de autenticación en `route.ts`.  

## 🚀 Ejecución  

Para iniciar el proyecto en modo de desarrollo, usa uno de los siguientes comandos:  

~~~bash
npm run dev
# or
yarn dev
# or
pnpm dev
~~~~


## 🔒 Seguridad

El proyecto prioriza la seguridad mediante:

- Encriptación de contraseñas con bcrypt.
- Uso de JWT para manejar sesiones de usuario.
- Mejores prácticas en el manejo de datos sensibles.

