import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || "",
);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const email = body.email._value;
  const password = body.password._value;
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("Error signing in:", error.message);
    return { code: 500, body: "Error signing in" };
  }
  return { code: 200, body: "User signed in" };
});
