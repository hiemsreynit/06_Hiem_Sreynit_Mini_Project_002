"use server";

import { redirect } from "next/navigation";
import { LoginSchema } from "../lib/auth.schema";
import { loginService } from "../service/login.service";
import { ZodError } from "zod";
import { cookies } from "next/headers";

export async function loginAction(data) {
  let isSuccess = false;

  try {
    const validatedData = LoginSchema.parse(data);
    const result = await loginService(
      validatedData.email,
      validatedData.password,
    );

    console.log("Back end response: ", result);

    if (result.success) {
      // result.data.payload.token is a string, no need to await it
      const token = result.data.payload.token;

      // 1. Await the cookies() call for Next.js 15+
      const cookieStore = await cookies();

      // 2. Set the cookie
      cookieStore.set("next-auth.session-token", token, {
        httpOnly: true,
        // 3. This is true only on the live server
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });

      isSuccess = true;
    } else {
      return result;
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      };
    }

    return {
      success: false,
      message: error?.message || "An error occurred during login",
    };
  }

  if (isSuccess) {
    redirect("/");
  }
}
