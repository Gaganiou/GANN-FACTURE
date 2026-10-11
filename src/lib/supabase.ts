import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rzubzgeauohgwtjyqngm.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6dWJ6Z2VhdW9oZ3d0anlxbmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NDU4MzksImV4cCI6MjEwNzMyMTgzOX0.s0n5PdJ6MRUWVUMkYjn1CRK4lYu1U5yqihc_EV3dk4s";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
