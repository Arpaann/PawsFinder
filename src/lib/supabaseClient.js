import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'YOUR_SUPABASE_URL' &&
  !supabaseUrl.includes('YOUR_SUPABASE_URL') &&
  supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper: Convert Database (snake_case) to App (camelCase)
export const mapPetFromDb = (dbPet) => {
  if (!dbPet) return null;
  return {
    id: dbPet.id,
    name: dbPet.name,
    breed: dbPet.breed,
    age: dbPet.age,
    gender: dbPet.gender,
    lostDate: dbPet.lost_date || dbPet.lostDate,
    lastSeenLocation: dbPet.last_seen_location || dbPet.lastSeenLocation,
    contactName: dbPet.contact_name || dbPet.contactName,
    contactPhone: dbPet.contact_phone || dbPet.contactPhone,
    contactEmail: dbPet.contact_email || dbPet.contactEmail,
    markings: dbPet.markings,
    behaviorNotes: dbPet.behavior_notes || dbPet.behaviorNotes,
    rewardActive: dbPet.reward_active ?? dbPet.rewardActive ?? false,
    rewardAmount: dbPet.reward_amount || dbPet.rewardAmount || '',
    currency: dbPet.currency || 'NPR',
    currencySymbol: dbPet.currency_symbol || dbPet.currencySymbol || 'Rs.',
    photoUrl: dbPet.photo_url || dbPet.photoUrl,
    approved: dbPet.approved ?? true,
    status: dbPet.status || 'missing',
    createdAt: dbPet.created_at || dbPet.createdAt || new Date().toISOString()
  };
};

// Helper: Convert App (camelCase) to Database (snake_case)
export const mapPetToDb = (appPet) => {
  if (!appPet) return null;
  return {
    id: appPet.id,
    name: appPet.name,
    breed: appPet.breed,
    age: appPet.age || '',
    gender: appPet.gender || 'Male',
    lost_date: appPet.lostDate || new Date().toISOString(),
    last_seen_location: appPet.lastSeenLocation || '',
    contact_name: appPet.contactName || '',
    contact_phone: appPet.contactPhone || '',
    contact_email: appPet.contactEmail || '',
    markings: appPet.markings || '',
    behavior_notes: appPet.behaviorNotes || '',
    reward_active: Boolean(appPet.rewardActive),
    reward_amount: appPet.rewardAmount || '',
    currency: appPet.currency || 'NPR',
    currency_symbol: appPet.currencySymbol || 'Rs.',
    photo_url: appPet.photoUrl || '',
    approved: appPet.approved ?? true,
    status: appPet.status || 'missing',
    created_at: appPet.createdAt || new Date().toISOString()
  };
};
