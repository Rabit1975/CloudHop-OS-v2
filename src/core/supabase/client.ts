// Supabase client configuration
// Add your Supabase URL and anon key here

export const supabaseConfig = {
  url: process.env.VITE_SUPABASE_URL || '',
  anonKey: process.env.VITE_SUPABASE_ANON_KEY || ''
}

// Create and export supabase client
export const supabase = {
  // Initialize your Supabase client here
  auth: {},
  from: (table: string) => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null })
  })
}
