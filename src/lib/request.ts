/**
 * mx-space api接口
 */

import {
    allControllers,
    createClient
} from "@mx-space/api-client";
import { axiosAdaptor } from "@mx-space/api-client/dist/adaptors/axios";
import { apiConfig } from "~/config";

// mx-space api 对象，使用asio请求
const MXApi = createClient(axiosAdaptor)(apiConfig.mx_api_url);

const $axios = axiosAdaptor.default;

$axios.defaults.timeout = 5000;
$axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(apiConfig.auth_storage_key) || "";
        if (token.length) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        if (import.meta.env.DEV) {
            console.log(error?.message);
        }
        return Promise.reject(error);
    }
);
$axios.interceptors.response.use(
    (config) => {
        const token : string | undefined = config.headers["Authorization"];
        if (token && token.length) {
            localStorage.setItem(apiConfig.auth_storage_key, token);
        }
        return config;
    },
    (error) => {
        if (import.meta.env.DEV) {
            console.log(error?.message);
        }
        return Promise.reject(error);
    }
);

MXApi.injectControllers(allControllers);

export { MXApi };