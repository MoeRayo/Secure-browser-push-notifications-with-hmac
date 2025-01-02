import dotenv from 'dotenv';
import { VapidKeys } from '../types';

dotenv.config();

export const vapidKeys: VapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY || '',
  privateKey: process.env.VAPID_PRIVATE_KEY || '',
};

export const HMAC_SECRET = process.env.HMAC_SECRET || 'your-secret-key';
export const PORT = process.env.PORT || 3000;
export const EMAIL = 'mailto:moronfolu.motunrayo1@gmail.com';