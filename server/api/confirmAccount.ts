import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || "",
);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const email = body.email._value;
  const token = body.token._value;
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });
  if (error) {
    console.error("Error verifying OTP:", error.message);
    return { code: 500, body: "Error verifying OTP" };
  } else {
    console.log("OTP verified:");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("user:", user);
  const id = user?.id;
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ confirmed: true })
    .eq("id", id);

  if (updateError) {
    console.error("Error updating profile:", updateError.message);
    return { code: 500, body: "Error updating profile" };
  }

  return { code: 200, body: "User verified" };
});
