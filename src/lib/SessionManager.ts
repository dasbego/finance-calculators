import type { Session } from "@supabase/supabase-js";
import type { AstroCookies } from "astro";
import { supabase } from "@lib/supabase";
import { type AuthResponse } from "@supabase/supabase-js";

const ACCESS_TOKEN_NAME = "sb-access-token";
const REFRESH_TOKEN_NAME = "sb-refresh-token";

export default class InMemorySessionManager {
  sessionData: Session | null = null;
  cookies: AstroCookies;

  constructor(cookies: AstroCookies) {
    this.cookies = cookies;
  }

  async initialize() {
    const { accessToken, refreshToken } = this.getSessionCookies();
    if (!accessToken || !refreshToken) {
      return;
    }
    const { data, error } = await supabase.auth.setSession({
      refresh_token: refreshToken.toString(),
      access_token: accessToken.toString(),
    });
    if (error) {
      this.clearSession();
      return;
    }
    this.sessionData = data.session;
  }

  public getSessionCookies() {
    const accessToken = this.cookies.get(ACCESS_TOKEN_NAME)?.value;
    const refreshToken = this.cookies.get(REFRESH_TOKEN_NAME)?.value;
    return { accessToken, refreshToken };
  }

  public clearSession() {
    this.sessionData = null;
    this.cookies.delete("sb-access-token", {
      path: "/",
    });
    this.cookies.delete("sb-refresh-token", {
      path: "/",
    });
  }

  public getSessionData() {
    return this.sessionData;
  }
}
