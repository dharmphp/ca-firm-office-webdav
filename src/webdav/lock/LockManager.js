// WebDAV Exclusive Locking Manager
// When Excel/Word opens a document, it requests a LOCK. This prevents concurrent file overwrites.
const crypto = require('crypto');

class LockManager {
  constructor() {
    this.locks = new Map(); // key -> { token, owner, expiresAt }
  }

  acquireLock(fileKey, owner, timeoutSeconds = 300) {
    const now = Date.now();
    const existing = this.locks.get(fileKey);

    if (existing && existing.expiresAt > now) {
      if (existing.owner !== owner) {
        return { success: false, reason: 'LOCKED_BY_ANOTHER_USER', lockedBy: existing.owner };
      }
    }

    const token = 'opaquelocktoken:' + crypto.randomUUID();
    const lockInfo = {
      token,
      owner,
      expiresAt: now + timeoutSeconds * 1000
    };

    this.locks.set(fileKey, lockInfo);
    console.log(`[WebDAV Lock] File ${fileKey} locked by ${owner}. Token: ${token}`);
    return { success: true, lockInfo };
  }

  releaseLock(fileKey, token) {
    const existing = this.locks.get(fileKey);
    if (!existing) return true;

    if (existing.token === token) {
      this.locks.delete(fileKey);
      console.log(`[WebDAV Lock] File ${fileKey} unlocked successfully.`);
      return true;
    }
    return false;
  }
}

module.exports = new LockManager();
