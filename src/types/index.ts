export interface VapidKeys {
  publicKey: string;
  privateKey: string;
}

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface StoredSubscription {
  subscription: PushSubscription;
  hmac: string;
}

export interface NotificationRequest {
  userId: string;
  message: string;
  hmac: string;
}

export interface SubscriptionRequest {
  subscription: PushSubscription;
  userId: string;
}