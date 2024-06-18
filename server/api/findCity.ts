import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || "",
);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const city = body.city._value;
  const { data, error } = await supabase
    .from("cities")
    .select("city")
    .eq("city", city)
    .single();
  if (data === null) {
    console.log("City not found");
    return "not_found";
  } else {
    return data;
  }
  return "error";
});
