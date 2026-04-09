import { auth } from "@/app/auth";

export async function getJWTToken() {
  try {
    const session = await auth();
    const token = session?.user?.accessToken;

    if (!token) {
      return null;
    }

    return token;
  } catch (error) {
    return null;
  }
}

export function decodeJWT(token) {
  try {
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const decoded = JSON.parse(
      Buffer.from(parts[1], "base64").toString()
    );

    return decoded;
  } catch (error) {
    return null;
  }
}

export function validateJWT(token) {
  try {
    const decoded = decodeJWT(token);
    if (!decoded) return { isValid: false };

    const currentTime = Math.floor(Date.now() / 1000);
    const expiresAt = decoded.exp;
    const expiresIn = expiresAt - currentTime;

    const isValid = expiresIn > 0;

    return {
      isValid,
      expiresIn,
      expiresAt: new Date(expiresAt * 1000),
    };
  } catch (error) {
    return { isValid: false };
  }
}

export async function getSessionWithToken() {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return null;
  }

  return {
    userId: session.user.id,
    email: session.user.email,
    token: session.user.accessToken,
  };
}
