import { createClient } from '@supabase/supabase-js';


const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '');

export default defineEventHandler( async (event) => {
    const body = await readBody(event);
    const email = body.email;
    const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
  })
    if (error) {
        console.error('Error resending OTP:', error.message);
        return {code: 500, body: 'Error resending OTP'};
    } else {
        console.log('OTP resent:');
        return {code: 200, body: 'OTP resent'};
    }  
});