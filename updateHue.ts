const http = require('http');

/**
 * sends a command to hue bridge to change brightness values are limited to 240
 *
 * @param host
 * @param username
 * @param brightness
 */
export function updateHue(
  host: string,
  username: string,
  hue: number
) {
  let payload = JSON.stringify({ hue: hue });
  let url = `https://${host}/api/${username}/lights/1/state`;
  console.info('Calling ' + url);
  const options = {
    host,
    path: `/api/${username}/lights/1/state`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': payload.length
    }
  };

  const req = http.request(options, res => {
    let data = '';
    res.on('data', chunk => {
      data += chunk;
    });
    res.on('end', () => {
      console.info(JSON.parse(data));
    });
    res.on('error', err => console.error(err));
  });
  req.write(payload, res => {
    console.info('Wrote data');
  });
}
