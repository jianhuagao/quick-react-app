// 开发环境
const devBaseURL = "XXX";
// 正式环境
const proBaseURL = "XXX";

export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;

//超时配置
export const TIMEOUT = 5000;
