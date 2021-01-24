# CA Firm Task Management & Office WebDAV Cloud Extension

Enterprise compliance task management portal for Chartered Accountant (CA) firms with integrated digital e-signing and a custom **Node-WebDAV Server Extension** allowing accountants to open, edit, and save Word/Excel files directly from AWS S3 and Azure Blob Storage in desktop Microsoft Office with live concurrency locking and database authentication.

Developed during senior software engineering role at Helios Solutions (Jan 2021 – Sep 2023).

## Key Features
- **Accountant Task Management**: GST returns, TDS compliance, statutory audits, review pipelines.
- **Node-WebDAV S3/Azure Extension**: Streams cloud files directly into MS Office desktop (`ms-word:ofe|u|...`, `ms-excel:ofe|u|...`) without temporary local disk files.
- **Custom Database Auth**: Intercepts WebDAV HTTP Basic / Bearer authentication and verifies permissions against CA firm database.
- **Distributed Office File Locking**: Handles WebDAV `LOCK` and `UNLOCK` protocols to prevent concurrent edit overwrites.
- **Digital E-Signing**: Party contract e-signing with SHA-256 hashing and tamper-evident audit trail.

Author: Dharmesh Patel <dharmkp@gmail.com>
