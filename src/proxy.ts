import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const path = request.nextUrl.pathname;
  const protectedPath = path.startsWith("/dashboard");

  if (!url || !key) {
    // Supabase not configured yet: public site still works, app routes bounce to login (which explains the setup).
    return protectedPath ? NextResponse.redirect(new URL("/login", request.url)) : NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  const { data } = await supabase.auth.getUser();

  if (protectedPath && !data.user) {
    const to = new URL("/login", request.url);
    to.searchParams.set("next", path);
    return NextResponse.redirect(to);
  }
  if (data.user && (path === "/login" || path === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
