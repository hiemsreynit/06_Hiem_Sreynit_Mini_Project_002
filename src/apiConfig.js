
export const API_BASE_URL = process.env.API_BASE_URL || "https://homework-api.noevchanmakara.site";

export const proxyConfig = {
  auth: {
    login: `${API_BASE_URL}/auths/login`,
    register: `${API_BASE_URL}/auths/register`,
  },
};

export default proxyConfig;
