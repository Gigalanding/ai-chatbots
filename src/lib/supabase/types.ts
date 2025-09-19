/**
 * Database type definitions for Supabase
 * Generated from SQL schema - update when schema changes
 */

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          role: string;
          organization: string | null;
          pain_point: string;
          source: string | null;
          consent: boolean | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          ip: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          role: string;
          organization?: string | null;
          pain_point: string;
          source?: string | null;
          consent?: boolean | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          ip?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          role?: string;
          organization?: string | null;
          pain_point?: string;
          source?: string | null;
          consent?: boolean | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          ip?: string | null;
        };
      };
      bookings: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          role: string | null;
          organization: string | null;
          timezone: string | null;
          slot_start: string | null;
          slot_end: string | null;
          external_event_id: string | null;
          status: string | null;
          notes: string | null;
          source: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          ip: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          role?: string | null;
          organization?: string | null;
          timezone?: string | null;
          slot_start?: string | null;
          slot_end?: string | null;
          external_event_id?: string | null;
          status?: string | null;
          notes?: string | null;
          source?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          ip?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          role?: string | null;
          organization?: string | null;
          timezone?: string | null;
          slot_start?: string | null;
          slot_end?: string | null;
          external_event_id?: string | null;
          status?: string | null;
          notes?: string | null;
          source?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          ip?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Convenience types for working with the database
export type Contact = Database['public']['Tables']['contacts']['Row'];
export type NewContact = Database['public']['Tables']['contacts']['Insert'];
export type ContactUpdate = Database['public']['Tables']['contacts']['Update'];

export type Booking = Database['public']['Tables']['bookings']['Row'];
export type NewBooking = Database['public']['Tables']['bookings']['Insert'];
export type BookingUpdate = Database['public']['Tables']['bookings']['Update'];
