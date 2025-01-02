import crypto from 'crypto';
import { PushSubscription, StoredSubscription } from '../types';
import { HMAC_SECRET } from '../config';

class SubscriptionService {
  private subscriptions: Map<string, StoredSubscription>;

  constructor() {
    this.subscriptions = new Map();
  }

  public createHmac(subscription: PushSubscription): string {
    return crypto
      .createHmac('sha256', HMAC_SECRET)
      .update(JSON.stringify(subscription))
      .digest('hex');
  }

  public saveSubscription(userId: string, subscription: PushSubscription): string {
    const hmac = this.createHmac(subscription);
    this.subscriptions.set(userId, { subscription, hmac });
    return hmac;
  }

  public getSubscription(userId: string): StoredSubscription | undefined {
    return this.subscriptions.get(userId);
  }

  public getAllUserIds(): string[] {
    return Array.from(this.subscriptions.keys());
  }
}

export const subscriptionService = new SubscriptionService();