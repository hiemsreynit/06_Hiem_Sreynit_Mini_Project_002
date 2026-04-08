"use server";
import { signIn } from "../app/auth";
export const signInAction = async (data) => {
    await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirectTo: "/",
    });
};

