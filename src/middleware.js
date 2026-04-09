// middleware.js
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const { pathname } = req.nextUrl;
  
  // Use the exact name you set in your loginAction
  const token = req.cookies.get("next-auth.session-token")?.value;

  // If there is no token and the user is trying to access /products
  if (!token && pathname.startsWith("/products")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If the user IS logged in but tries to go to /login, send them to home
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}