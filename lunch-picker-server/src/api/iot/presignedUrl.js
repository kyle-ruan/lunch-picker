import v4 from 'aws-signature-v4';
import crypto from 'crypto';

export const handler = (event, context, callback) => {
  const url = v4.createPresignedURL(
    'GET',
    process.env.IOT_ENDPOINT_HOST.toLowerCase(),
    '/mqtt',
    'iotdevicegateway',
    crypto
      .createHash('sha256')
      .update('', 'utf8')
      .digest('hex'),
    {
      key: process.env.IOT_ACCESS_KEY,
      secret: process.env.IOT_SECRET_KEY,
      protocol: 'wss',
      region: process.env.IOT_AWS_REGION
    }
  );
  const response = { statusCode: 200, body: JSON.stringify({ url }) };

  callback(null, response);
};
