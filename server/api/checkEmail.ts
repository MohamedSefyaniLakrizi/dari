import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || "",
);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const email = body.email._value;
  console.log("email:", email);
  const { data, error } = await supabase
    .from("profiles")
    .select("email, confirmed")
    .eq("email", email)
    .single();
  if (data === null) {
    console.log("Email not found");
    return "not_found";
  } else if (data.confirmed !== false) {
    return "found";
  } else if (data.confirmed == true) {
    return "not_confirmed";
  }
  return "error";
});
