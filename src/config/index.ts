/**
 * 一些配置
 */

export const apiConfig = {
    mx_api_url: import.meta.env.VITE_MX_API_URL || "http://localhost:2333/api/v2",
    auth_storage_key: "token_key",
}