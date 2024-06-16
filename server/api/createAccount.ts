import { createClient } from '@supabase/supabase-js';


const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '');

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    console.log('body:', body);
    const { error } = await supabase.auth.signUp({
      email: body.email,
      password: body.password,
    });
    
    if (error) {
      console.error('Error signing up:', error.message);
      return {code: 500, body: 'Error signing up'};
    }
  
    

    return {code: 200, body: 'User signed up'};
  });
  
  // Call the function with the user information
  //createAccount('John', 'Doe', 'mohamedsefyani@gmail.com', 1, 1234567890, 'password'); 