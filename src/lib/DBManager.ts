import { createClient } from "@supabase/supabase-js";

class DBManager {
  supabase: any;

  constructor() {
    this.supabase = createClient(
      import.meta.env.SUPABASE_URL,
      import.meta.env.SUPABASE_ANON_KEY,
      {
        auth: {
          flowType: "pkce",
        },
      }
    );
  }
}

export default DBManager;
