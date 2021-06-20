// Node.js WebDAV Router for MS Office desktop client
const express = require('express');
const router = express.Router();

// WebDAV protocol methods: OPTIONS, PROPFIND, HEAD, GET, PUT, LOCK, UNLOCK
router.use((req, res, next) => {
  res.header('MS-Author-Via', 'DAV');
  res.header('DAV', '1, 2');
  res.header('Allow', 'OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, PROPFIND, PROPPATCH, COPY, MOVE, LOCK, UNLOCK');
  next();
});

router.options('*', (req, res) => {
  res.status(200).send();
});

// PROPFIND handler: Returns XML document metadata (creationdate, getcontentlength, getlastmodified)
router.all('*', (req, res, next) => {
  if (req.method === 'PROPFIND') {
    const filePath = req.path;
    console.log(`[WebDAV PROPFIND] Office requesting metadata for: ${filePath}`);
    const xml = `<?xml version="1.0" encoding="utf-8" ?>
<D:multistatus xmlns:D="DAV:">
  <D:response>
    <D:href>${req.originalUrl}</D:href>
    <D:propstat>
      <D:prop>
        <D:displayname>${filePath.split('/').pop()}</D:displayname>
        <D:getcontenttype>application/vnd.openxmlformats-officedocument.spreadsheetml.sheet</D:getcontenttype>
        <D:resourcetype/>
        <D:getcontentlength>45820</D:getcontentlength>
      </D:prop>
      <D:status>HTTP/1.1 200 OK</D:status>
    </D:propstat>
  </D:response>
</D:multistatus>`;
    res.status(207).set('Content-Type', 'text/xml; charset=utf-8').send(xml);
  } else {
    next();
  }
});

module.exports = router;
