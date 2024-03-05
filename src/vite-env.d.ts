// vite-env.d.ts
/// <reference types="vite-plugin-pages/client-solid" />

interface ImportMetaEnv {
    readonly VITE_MX_API_URL: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv,
}