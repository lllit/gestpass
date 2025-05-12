import { generateRandomUsername } from "./generateRandomUser"

export const generateRandomEmail = () => {
    const domais = [
        "example.com",
        "test.com",
        "sample.com",
        "demo.com",
    ]
    const username = generateRandomUsername(8)
    const domain = domais[Math.floor(Math.random() * domais.length)]


    return `${username}@${domain}`
}