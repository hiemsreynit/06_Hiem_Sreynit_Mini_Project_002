
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://homework-api.noevchanmakara.site";

export const proxyConfig = {
  auth: {
    login: `${API_BASE_URL}/auths/login`,
    register: `${API_BASE_URL}/auths/register`,
  },
};

export default proxyConfig;
