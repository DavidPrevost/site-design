// Checks WCAG contrast for every color scheme in config/settings_data.json.
// Shopify writes theme editor changes back to that file, so this also catches
// low-contrast colors picked later in the editor.
import { readFileSync } from 'node:fs';

const TEXT_MIN = 4.5;
const UI_MIN = 3;

// Shopify prefixes its JSON files with a /* ... */ comment.
const raw = readFileSync(new URL('../config/settings_data.json', import.meta.url), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/,(\s*[}\]])/g, '$1');
const data = JSON.parse(raw);
const schemes = data.current?.color_schemes ?? {};

function luminance(hex) {
  const value = hex.replace('#', '');
  const channels = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

const pairs = [
  ['text', 'background', TEXT_MIN],
  ['text_muted', 'background', TEXT_MIN],
  ['accent', 'background', TEXT_MIN],
  ['text', 'surface', TEXT_MIN],
  ['text_muted', 'surface', TEXT_MIN],
  ['button_label', 'button', TEXT_MIN],
  ['button', 'background', UI_MIN],
];

const failures = [];
const ids = Object.keys(schemes);
if (ids.length === 0) failures.push('No color schemes found in config/settings_data.json');

for (const id of ids) {
  const colors = schemes[id].settings;
  for (const [fg, bg, min] of pairs) {
    if (!colors[fg] || !colors[bg]) continue;
    const ratio = contrast(colors[fg], colors[bg]);
    const line = `${id}: ${fg} ${colors[fg]} on ${bg} ${colors[bg]} = ${ratio.toFixed(2)}:1 (min ${min})`;
    if (ratio < min) failures.push(line);
    else if (process.argv.includes('--verbose')) console.log(`ok   ${line}`);
  }
}

if (failures.length) {
  console.error('Contrast check failed:');
  for (const line of failures) console.error(`  ${line}`);
  process.exit(1);
}
console.log(`Contrast check passed for ${ids.length} color schemes.`);
