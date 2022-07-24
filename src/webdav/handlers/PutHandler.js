// Handles WebDAV PUT request when user clicks Save / Ctrl+S in Excel/Word
const S3StorageAdapter = require('../adapters/S3StorageAdapter');
const s3 = new S3StorageAdapter();

async function handleWebDavPut(req, res) {
  const filePath = req.path.replace(/^\/webdav\//, '');
  console.log(`[WebDAV PUT] Saving updated document bytes to cloud: ${filePath}`);

  try {
    const contentType = req.headers['content-type'];
    const contentLength = req.headers['content-length'];

    // Stream directly into cloud storage
    await s3.uploadFileStream(filePath, req, contentLength, contentType);
    console.log(`[WebDAV PUT] File ${filePath} saved successfully to cloud storage.`);

    res.status(204).send(); // 204 No Content confirms save to Office client
  } catch (err) {
    console.error('[WebDAV PUT Error]', err.message);
    res.status(500).send('Failed saving document');
  }
}

module.exports = { handleWebDavPut };
