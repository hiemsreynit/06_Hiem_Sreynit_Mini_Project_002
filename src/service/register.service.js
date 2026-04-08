
import { proxyConfig } from "@/proxy";

export async function registerService(fullName, email, password) {
  try {
    const response = await fetch(proxyConfig.auth.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error.message || "Registration failed",
        status: response.status,
      };
    }

    const result = await response.json();
    return {
      success: true,
      message: "Registration successful",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Registration request failed",
    };
  }
}