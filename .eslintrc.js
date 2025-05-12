module.exports = {
    overrides: [
        {
            files: ["lib/generated/prisma/**/*.js"],
            rules: {
                "@typescript-eslint/no-require-imports": "off",
            },
        },
    ],
};