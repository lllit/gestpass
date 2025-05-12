export const generateCustomPassword = (
    length: number,
    mayus: boolean,
    minus: boolean,
    numbers: boolean,
    specialCharacters: boolean
) => {
    const mayusCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const minusCharset = "abcdefghijklmnopqrstuvwxyz"
    const numberCharset = "0123456789"
    const specialCharset = "!@#$%^&*()_+~`|}{[]:;?><,./-="
    let charset = "";
    if (mayus) charset += mayusCharset;
    if (minus) charset += minusCharset;
    if (numbers) charset += numberCharset;
    if (specialCharacters) charset += specialCharset;

    let password = ""

    if (mayus) password += mayusCharset.charAt(
        Math.floor(Math.random() * mayusCharset.length)
    )
    if (minus) password += minusCharset.charAt(
        Math.floor(Math.random() * minusCharset.length)
    )
    if (numbers) password += numberCharset.charAt(
        Math.floor(Math.random() * numberCharset.length)
    )
    if (specialCharacters) password += specialCharset.charAt(
        Math.floor(Math.random() * specialCharset.length)
    )

    for (let i = password.length; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));

    }


    password = password.split("").sort(() => Math.random() - 0.5).join("");

    return password
}