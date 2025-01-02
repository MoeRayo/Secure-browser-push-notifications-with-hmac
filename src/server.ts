import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import webpush from 'web-push';
import { vapidKeys, EMAIL, PORT } from './config';
import { subscriptionService } from './services/subscriptionService';
import { NotificationRequest, SubscriptionRequest } from './types';

const app = express();

app.use(express.json());
app.use(express.static('public'));

webpush.setVapidDetails(EMAIL, vapidKeys.publicKey, vapidKeys.privateKey);

type TypedRequestHandler<T> = RequestHandler<{}, any, T>;

app.get('/vapid-public-key', ((_req: Request, res: Response) => {
  res.json({ publicKey: vapidKeys.publicKey });
}) as RequestHandler);

const subscribeHandler: TypedRequestHandler<SubscriptionRequest> = async (req, res, next) => {
  try {
    const { subscription, userId } = req.body;

    console.log('Received subscription request:', {
      userId,
      subscription: JSON.stringify(subscription),
    });

    if (!subscription || !userId) {
      res.status(400).json({
        error: 'Missing required fields',
        details: { subscription: !!subscription, userId: !!userId },
      });
      return;
    }

    const hmac = subscriptionService.saveSubscription(userId, subscription);

    console.log('Subscription saved for user:', userId);
    res.status(201).json({ message: 'Subscription saved', hmac });
  } catch (error) {
    next(error);
  }
};

const sendNotificationHandler: TypedRequestHandler<NotificationRequest> = async (req, res, next) => {
  try {
    const { userId, message, hmac } = req.body;

    console.log('Received notification request:', { userId, message, hmac });

    if (!userId || !message || !hmac) {
      res.status(400).json({
        error: 'Missing required fields',
        details: { userId: !!userId, message: !!message, hmac: !!hmac },
      });
      return;
    }

    const storedData = subscriptionService.getSubscription(userId);
    if (!storedData) {
      console.log('Subscription not found for userId:', userId);
      res.status(404).json({
        error: 'Subscription not found',
        details: { userId, availableUsers: subscriptionService.getAllUserIds() },
      });
      return;
    }

    const calculatedHmac = subscriptionService.createHmac(storedData.subscription);

    if (hmac !== calculatedHmac) {
      console.log('HMAC verification failed:', {
        received: hmac,
        calculated: calculatedHmac,
      });
      res.status(401).json({
        error: 'Invalid HMAC',
        details: { received: hmac, calculated: calculatedHmac },
      });
      return;
    }

    console.log('Sending notification:', message);
    await webpush.sendNotification(storedData.subscription, message);
    res.json({ message: 'Notification sent successfully' });
  } catch (error) {
    next(error);
  }
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);
  res.status(500).json({
    error: err.message,
    details: err.stack,
  });
};

app.post('/subscribe', subscribeHandler);
app.post('/send-notification', sendNotificationHandler);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('VAPID public key:', vapidKeys.publicKey);
});