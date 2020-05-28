import { Hub } from './models';
const https = require('https');

/**
 * Uses the meethue discovery service to get the local hue bridge
 */
export function getHubs(): Promise<Hub[]> {
  return new Promise((resolve, reject) => {
    https.get('https://discovery.meethue.com/', resp => {
      let data = '';
      resp.on('data', chunk => {
        data += chunk;
      });
      resp.on('end', () => {
        resolve(JSON.parse(data));
      });
      resp.on('error', err => reject(err));
    });
  });
}
