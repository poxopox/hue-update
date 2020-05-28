import { Hub } from './models';
import { updateBrightness } from './updateBrightness';
import { getHubs } from './getHubs';
import { updateHue } from './updateHue';

const net = require('net');
const https = require('https');
const http = require('http');
const path = require('path');
const PORT = 43481;
const MAX_BRIGHTNESS = 245;
const MIN_BRIGHTNESS = 0;
const MAX_HUE = 65535;
const MIN_HUE = 0;
const USERNAME = 'YiupdsQYVgDpyx3FRK86cSsUCwIdnbTqZc0twjBG';

getHubs().then((hubs: Hub[]) => {
  if (!hubs || hubs.length === 0) {
    console.info('No Hubs :|');
  } else {
    const hubIP = hubs[0].internalipaddress;

    let lastValue = { x: 0, y: 0 };
    const client = new net.Socket();
    const lightState = {
      brightness: 50,
      hue: 0
    };

    client.connect(PORT, '127.0.0.1', () => {
      console.info('connection');
      client.write('Hello server!');
    });

    let time = new Date().getTime();

    client.on('data', data => {
      const positionalData = JSON.parse(data.toString());

      if (positionalData.x !== lastValue.x) {
        const xOffset = positionalData.x - 500;
        if (xOffset > 10 || xOffset < -10) {
          lightState.brightness = Math.floor(
            Math.min(
              Math.max(lightState.brightness + xOffset / 25, MIN_BRIGHTNESS),
              MAX_BRIGHTNESS
            )
          );
          console.info('changing brightness to ' + lightState.brightness);
          updateBrightness(hubIP, USERNAME, lightState.brightness);
        }
      } else if (positionalData.y !== lastValue.y) {
        const yOffset = positionalData.y - 500;
        if (yOffset > 10 || yOffset < -10) {
          lightState.hue = Math.floor(
            Math.min(Math.max(lightState.hue + yOffset * 10, MIN_HUE), MAX_HUE)
          );
          console.info('changing hue to ' + lightState.hue);
          // updateHue(hubIP, USERNAME, lightState.hue);
        }
      }
      lastValue = positionalData;
      client.write('Hello server!');
    });
  }
});
