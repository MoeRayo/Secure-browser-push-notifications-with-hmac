import * as crypto from 'crypto';

export const generateHmacSecret = () => {
  const secret = crypto.randomBytes(32).toString('hex');
  console.log('Generated HMAC Secret:', secret);
};

if (require.main === module) {
  generateHmacSecret();
}

