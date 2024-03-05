/**
 * mx-space api接口
 */

import { allControllers, createClient } from "@mx-space/api-client";
import { umiAdaptor } from "@mx-space/api-client/dist/adaptors/umi-request";
import { apiConfig } from "~/config";

// mx-space api 对象，使用asio请求
const MXApi = createClient(umiAdaptor)(apiConfig.mx_api_url);

// const $umi = umiAdaptor.default;

MXApi.injectControllers(allControllers);

export { MXApi };
