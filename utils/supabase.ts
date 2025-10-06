import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://evtnvictzaygmswrdfzm.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2dG52aWN0emF5Z21zd3JkZnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODU5OTQsImV4cCI6MjA3MTM2MTk5NH0.qRZJE5WhmjLiovElxPS7uD2JUDzzXVgcri4zcpcZzjw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
