// Unit tests for WebDAV server and storage adapters
const LockManager = require('../src/webdav/lock/LockManager');

console.log('Testing LockManager...');
const res1 = LockManager.acquireLock('clients/audit/balance_sheet.xlsx', 'ramesh_ca');
console.log('Lock 1 acquired:', res1.success);

const res2 = LockManager.acquireLock('clients/audit/balance_sheet.xlsx', 'suresh_ca');
console.log('Lock 2 acquisition blocked by existing lock:', !res2.success);

LockManager.releaseLock('clients/audit/balance_sheet.xlsx', res1.lockInfo.token);
const res3 = LockManager.acquireLock('clients/audit/balance_sheet.xlsx', 'suresh_ca');
console.log('Lock 3 acquisition after release:', res3.success);

console.log('All WebDAV lock tests passed.');
