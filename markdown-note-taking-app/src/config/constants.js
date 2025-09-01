process.loadEnvFile();

export const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    languageTool: {
        lt_url: process.env.LT_URL,
        lt_lang: process.env.LT_LANG,
    }

};