
export async function loginService(email, password) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error.message || "Login failed",
        status: response.status,
      };
    }

    const result = await response.json();
    
    if (!result.success) {
      return {
        success: false,
        message: result.message || "Login failed",
      };
    }

    return {
      success: true,
      message: "Login successful",
      data: result,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.message || "Login request failed",
    };
  }
}

