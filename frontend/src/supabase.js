import { createClient } from "@supabase/supabase-js";

const supabaseUrl ="https://auhrqgdiqufnkvlhqnws.supabase.co";
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1aHJxZ2RpcXVmbmt2bGhxbndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5Nzk3OTAsImV4cCI6MjA5MjU1NTc5MH0.NUU3tn_vtx536b2zW1ln54zi9piebtG0O6iu9o3Uht0";

export const supabase = createClient(supabaseUrl, supabaseKey);