// Direct S3 Stream Adapter for WebDAV
// Streams directly between AWS S3 and MS Office without creating temporary files on local disk
const AWS = require('aws-sdk');

class S3StorageAdapter {
  constructor(bucketName) {
    this.bucket = bucketName || process.env.S3_DOCUMENTS_BUCKET || 'ca-firm-documents';
    this.s3 = new AWS.S3({ region: process.env.AWS_REGION || 'ap-south-1' });
  }

  // Streams file directly to client response
  async streamFile(s3Key, res) {
    console.log(`[S3 WebDAV] Streaming key: ${s3Key} from bucket ${this.bucket}`);
    const s3Stream = this.s3.getObject({ Bucket: this.bucket, Key: s3Key }).createReadStream();

    s3Stream.on('error', (err) => {
      console.error('[S3 WebDAV Error]', err.message);
      if (!res.headersSent) res.status(404).send('Document not found in S3');
    });

    s3Stream.pipe(res);
  }

  // Streams client PUT body directly into S3
  async uploadFileStream(s3Key, reqStream, contentLength, contentType) {
    console.log(`[S3 WebDAV] Streaming upload for key: ${s3Key}`);
    const params = {
      Bucket: this.bucket,
      Key: s3Key,
      Body: reqStream,
      ContentType: contentType || 'application/octet-stream'
    };

    return this.s3.upload(params).promise();
  }

  async getMetadata(s3Key) {
    try {
      const head = await this.s3.headObject({ Bucket: this.bucket, Key: s3Key }).promise();
      return {
        size: head.ContentLength,
        lastModified: head.LastModified,
        contentType: head.ContentType,
        etag: head.ETag
      };
    } catch (e) {
      return null;
    }
  }
}

module.exports = S3StorageAdapter;
