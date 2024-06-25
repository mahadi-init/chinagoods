import { NextResponse, type NextRequest } from "next/server";
import { getAuthInfo } from "./utils/get-auth-info";

export async function middleware(request: NextRequest) {
  try {
    const payload = await getAuthInfo();

    // basic auth check
    if (!payload) {
      throw new Error();
    }

    let role = payload.role

    // auto login
    if (request.nextUrl.pathname === "/") {
      if (role === "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      if (role === "SELLER") {
        return NextResponse.redirect(new URL("/seller", request.url));
      }
    }

    // to prevent authorized access
    if (role !== "ADMIN") {
      if (request.nextUrl.pathname.startsWith("/dashboard")) {
        throw new Error();
      }

      if (request.nextUrl.pathname.startsWith("/seller/details")) {
        throw new Error();
      }
    }

    // to prevent authorized access
    if (role !== "SELLER") {
      if (request.nextUrl.pathname.endsWith("/seller") || request.nextUrl.pathname.endsWith("/seller/order")) {
        throw new Error();
      }
    }

  } catch (err: any) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/seller/:path*"],
};
