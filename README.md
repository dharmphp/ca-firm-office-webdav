# CA Firm Task Management & Office WebDAV Cloud Extension

Enterprise compliance task management portal for Chartered Accountant (CA) firms with integrated digital e-signing and a custom **Node-WebDAV Server Extension** allowing accountants to open, edit, and save Word/Excel files directly from AWS S3 and Azure Blob Storage in desktop Microsoft Office with live concurrency locking and database authentication.

Developed during senior software engineering role at Helios Solutions (Jan 2021 – Sep 2023).

## Key Architecture
1. **Node-WebDAV Extension**:
   - Custom implementation of WebDAV HTTP methods (PROPFIND, LOCK, UNLOCK, GET, PUT, OPTIONS).
   - Streams .xlsx and .docx directly from AWS S3 or Azure Blob storage without staging files on local server disk.
   - Saves directly to cloud on Ctrl+S via chunked streaming PUT.
2. **Database Authentication Interceptor**:
   - Intercepts WebDAV HTTP Basic / Bearer token requests issued by MS Office desktop.
   - Validates user sessions and document access permissions from CA MongoDB/PostgreSQL database.
3. **Distributed Lock Manager**:
   - Implements WebDAV compliant lock tokens (opaquelocktoken:) with timeout expirations.
   - Prevents file corruption when multiple accountants open client tax workbooks concurrently.
4. **Compliance Desk & E-Signing**:
   - Task assignment for junior accountants (GST 3B, TDS 26Q, Tax Audits).
   - Digital contract e-signing module with SHA-256 fingerprinting and Aadhaar e-sign simulator.

Created by Dharmesh Patel (Jan 2021 – Sep 2023).
