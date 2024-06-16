import { createClient } from '@supabase/supabase-js';


const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '');

export default defineEventHandler( async (event) => {
    const body = await readBody(event);
    const email = body.email;
    const token = body.token;
    const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email'})
    if (error) {
        console.error('Error verifying OTP:', error.message);
        return {code: 500, body: 'Error verifying OTP'};
    } else {
        console.log('OTP verified:');
    }

    const { data: { user } } = await supabase.auth.getUser();
    console.log('user:', user);
    const { data, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          id: user?.id,
          first_name: body.firstName,
          last_name: body.lastName,
          country_code: body.countryCode,
          phone_number: body.phoneNumber.parseInt(),
        },
      ]);
  
    if (insertError) {
      console.error('Error inserting user data:', insertError.message);

      return {code: 500, body: 'Error inserting user data'};
    }
});