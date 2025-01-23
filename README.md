# Secure Browser Push Notifications Using HMAC Encryption

![demo visualization](demo.gif)
This repository contains a tutorial on implementing secure push notifications in a Node.js application. You'll learn to use HMAC for message authentication, VAPID for server authentication, Service Workers for handling push notifications, and the Web Push API for real-time messaging.

## Benefits of using HMAC encryption

- **Data integrity**: You can trust the data hasn’t been altered as any change results in a mismatched signature, signaling tampering
- **Authentication**: Prevents impersonation by verifying the sender using a shared secret key

## Technologies covered

- **HMAC (Hash-based Message Authentication Code)**: For message authentication and data integrity.
- **VAPID (Voluntary Application Server Identification)**: Authentication for web push API
- **Service workers**: Handling push notifications

## Tutorial structure

The tutorial is divided into the following sections:

1. **Setting up the project**: You will create a Node.js application, configure TypeScript, and set up the required dependencies and project structure
2. **Generating secure keys**: Generate HMAC secret keys and VAPID keys for secure messaging and authentication
3. **Server-side implementation**: You will build endpoints for managing push subscriptions, validating HMAC signatures, and sending notifications.
4. **Client-side implementation**: You will set up a service worker to handle push notifications and build a barebone user interface for testing subscriptions and sending messages
5. **Securing the push notifications**: Use HMAC encryption to sign and validate push notifications
6. **Testing and running the application**: Test the application locally
   Each section includes code snippets and step-by-step guidance.

## Getting started

1. Clone this repository
2. Install dependencies using `npm install`
3. Start the application by running `npm run dev` for development environment
4. Follow the instructions in each section to implement this solution

## Additional resources

- [TypeScript](https://www.typescriptlang.org/)
- [Web Push API](https://web.dev/articles/push-notifications-how-push-works)
- [HMAC](https://www.geeksforgeeks.org/what-is-hmachash-based-message-authentication-code/)
