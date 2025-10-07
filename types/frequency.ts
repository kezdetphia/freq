export interface Frequency {
  id: string;
  name: string;
  description: string;
  category: string;
  hz_value: number;
  duration_seconds: number;
  audio_url: string | null;
  is_active: boolean;
  is_premium: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export default Frequency;
