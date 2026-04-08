import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  console.log("Auth token: ", token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/products/:path*",
    "/products",
  ],
};
