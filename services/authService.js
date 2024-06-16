
import { supabase } from '../supabaseClient'; // adjust the path according to your project structure

export const signInWithGoogle = async () => {
  const { user, session, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.error("Error signing in with Google", error.message);
  }
  return { user, session, error };
};