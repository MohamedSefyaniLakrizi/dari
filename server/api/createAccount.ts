import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || "",
);

export default defineEventHandler(async (event) => {
  interface Body {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    countryCode: string;
  }
  const body: Body = await readBody(event);
  console.log("body:", body);
  console.log("email:", body.email);
  console.log("password ", body.password);

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
    options: {
      data: {
        first_name: body.firstName,
        last_name: body.lastName,
        phone_number: body.phoneNumber,
        country_code: body.countryCode,
      },
    },
  });
  if (signUpError) {
    console.error("Error signing up:", signUpError.message);
    return { code: 500, body: "Error signing up" };
  }

  return { code: 200, body: "User signed up" };
});

// Call the function with the user information
//createAccount('John', 'Doe', 'mohamedsefyani@gmail.com', 1, 1234567890, 'password');
