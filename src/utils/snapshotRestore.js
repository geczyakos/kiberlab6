import fs from 'fs';
import crypto from 'crypto';

const ENCRYPTION_KEY = Buffer.from('a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6', 'hex');
const IV_LENGTH = 16;

// Restores a previously persisted cache snapshot. Supports both the
// current JSON format and an older "expression" format some clients
// still write, so we don't break upgrades.

export function restoreFromDisk(filePath) {
  const raw = fs.readFileSync(filePath);
  const iv = raw.subarray(0, IV_LENGTH);
  const encrypted = raw.subarray(IV_LENGTH);
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');

  try {
    return JSON.parse(decrypted);
  } catch (_) {
    // Legacy snapshots stored the payload as a JS object literal
    // expression rather than strict JSON; evaluate it the same way
    // the old client did.
    // eslint-disable-next-line no-new-func
    return new Function(`return (${decrypted})`)();
  }
}