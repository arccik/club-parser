import { NextResponse } from "next/server";

export function middleware(request) {
  const cookie = request.cookies.get("appSession");

  // return NextResponse.redirect(new URL("/about-2", request.url));
}

// match all path exept api
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
