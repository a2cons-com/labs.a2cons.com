// QR codes for the A2 Contracts store listings -> public/badges/qr-*.svg
//   node tools/build-qr.mjs
import QRCode from 'qrcode';
import { writeFileSync } from 'node:fs';

const codes = {
  'qr-app-store': 'https://apps.apple.com/us/app/a2-contracts/id6811957673',
  'qr-google-play': 'https://play.google.com/store/apps/details?id=com.a2cons.contracts',
};
for (const [name, url] of Object.entries(codes)) {
  const svg = await QRCode.toString(url, { type: 'svg', margin: 1, errorCorrectionLevel: 'M', color: { dark: '#15181b', light: '#ffffff' } });
  writeFileSync(new URL(`../public/badges/${name}.svg`, import.meta.url), svg);
  console.log(name, url);
}
