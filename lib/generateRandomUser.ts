export const generateRandomUsername = (length = 8) => {
    const adjectives = [
        "Quick",
        "Bright",
        "Funny",
        "Silent",
        "Clever",
        "Brave",
        "Happy",
        "Sly",
        "Wise",
        "Bold",
    ]
    const nouns = [
        "Lion",
        "Tiger",
        "Bear",
        "Eagle",
        "Shark",
        "Wolf",
        "Hawk",
        "Dragon",
        "Panther",
        "Falcon",
    ]

    const randomItem = (array: string[]) => array[Math.floor(Math.random() * array.length)];

    let username = ""
    username += randomItem(adjectives)
    username += randomItem(nouns)
    username += Math.floor(Math.random() * 10000)
    if (username.length > length) {
        username = username.substring(0, length)
    }
    return username;
}