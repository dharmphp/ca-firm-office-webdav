// Azure Blob Storage Adapter for WebDAV
const { BlobServiceClient } = require('@azure/storage-blob');

class AzureBlobStorageAdapter {
  constructor(connectionString, containerName) {
    this.containerName = containerName || 'ca-client-files';
    this.client = BlobServiceClient.fromConnectionString(
      connectionString || process.env.AZURE_STORAGE_CONNECTION_STRING || 'UseDevelopmentStorage=true;'
    );
    this.container = this.client.getContainerClient(this.containerName);
  }

  async streamFile(blobName, res) {
    console.log(`[Azure WebDAV] Streaming blob: ${blobName}`);
    const blob = this.container.getBlobClient(blobName);
    const downloadBlockBlobResponse = await blob.download();
    downloadBlockBlobResponse.readableStreamBody.pipe(res);
  }

  async uploadFileStream(blobName, reqStream) {
    const blockBlobClient = this.container.getBlockBlobClient(blobName);
    return blockBlobClient.uploadStream(reqStream);
  }
}

module.exports = AzureBlobStorageAdapter;
