/// <reference types="@solidjs/start/env" />

interface ImportMetaEnv {
    readonly VITE_MX_API_URL: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv,
}