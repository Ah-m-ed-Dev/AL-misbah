import { createClient } from "@supabase/supabase-js";

// مفاتيح Supabase الخاصة بك
const supabaseUrl = "https://kyazwzdyodysnmlqmljv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5YXp3emR5b2R5c25tbHFtbGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMjI4ODcsImV4cCI6MjA3NTc5ODg4N30.5oPcHui5y6onGAr9EYkq8fSihKeb4iC8LQFsLijIco4";

// إنشاء عميل Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
