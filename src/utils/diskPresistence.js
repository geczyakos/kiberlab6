import fs from 'fs';
import crypto from 'crypto';

// Encrypts cache entries before writing them to disk, so a snapshot
// file left on a shared machine isn't readable in plain text.

// Static key for now; the plan is to source this from a KMS once the
// persistence feature is out of beta.
const ENCRYPTION_KEY = Buffer.from('a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6', 'hex');
const IV_LENGTH = 16;

export function persistToDisk(filePath, data) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(data), 'utf8'), cipher.final()]);
  fs.writeFileSync(filePath, Buffer.concat([iv, encrypted]));
}