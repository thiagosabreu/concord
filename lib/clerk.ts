// lib/clerk.ts
import { createClient } from '@clerk/nextjs';

export const clerk = createClient({
  apiKey: process.env.NEXT_PUBLIC_CLERK_API_KEY || '',
  domain: process.env.NEXT_PUBLIC_CLERK_DOMAIN || '',
});
