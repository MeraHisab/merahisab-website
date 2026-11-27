
# MeraHisab Security Policy

**Policy Version:** 2.0.0  
**Status:** Development Draft — Pending Final Review

## 1. Official Information

- Website: https://merahisab.store/
- Repository: https://github.com/merahisab/merahisab-website
- Products: MeraHisab and Royal Khata
- Hosting: GitHub Pages

## 2. Security Commitment

MeraHisab aims to develop responsible security and privacy controls for financial record management.

Security priorities include:

- Data minimization
- Financial data protection
- Secure application distribution
- Input validation
- Secure software updates
- Safe backup and recovery
- Responsible vulnerability disclosure
- User privacy
- Security testing

These priorities do not constitute a security certification or guarantee.

## 3. Supported Products

| Product | Status |
|---|---|
| MeraHisab Website | Under development and review |
| MeraHisab Android APK | Release verification pending |
| Royal Khata | Official release pending |
| Website PWA | Integration testing pending |

Supported application versions and security maintenance periods will be published after verification.

## 4. Reporting Security Vulnerabilities

Support information:

https://merahisab.store/contact.html

A verified private security reporting channel is pending configuration.

The support page currently prepares local request drafts only. It does not automatically submit vulnerability reports.

Do not publish confidential security findings in public GitHub issues.

## 5. Information to Include

A sanitized security report may contain:

- Affected product
- Affected application version
- Affected website URL
- Browser and operating system
- Description of the issue
- Authorized reproduction steps
- Expected and actual behavior
- Potential security impact
- Sanitized screenshots
- Suggested remediation

Include only information necessary to understand the issue.

## 6. Confidential Information

Never include:

- Passwords
- PINs
- OTPs
- Recovery keys
- Encryption keys
- Authentication tokens
- Private signing keys
- Banking credentials
- Aadhaar or PAN numbers
- Customer financial records
- Confidential backup files

Remove sensitive information from logs, screenshots and reports.

## 7. Responsible Disclosure

Security testing must:

- Respect user privacy.
- Remain within authorized environments.
- Avoid accessing other users' records.
- Avoid modifying or deleting information.
- Avoid denial-of-service activity.
- Avoid social engineering.
- Avoid service disruption.
- Follow applicable laws.
- Protect confidential vulnerability details.

This policy does not authorize unrestricted security testing or access to private systems.

## 8. Security Review Scope

Security reviews may include:

- Public website pages
- Client-side JavaScript
- Content Security Policy
- Input validation
- Cross-site scripting prevention
- External link handling
- APK distribution
- Browser storage
- PWA service worker
- Offline cache management
- Privacy-related functionality

Third-party infrastructure remains subject to its provider's policies.

## 9. Secure Application Downloads

Official Download Center:

https://merahisab.store/downloads.html

MeraHisab APK information:

https://merahisab.store/download.html

Users should:

- Verify the official website domain.
- Use HTTPS.
- Check application version information.
- Compare APK checksums.
- Verify signing information when available.
- Keep Android security protection enabled.
- Avoid modified and unofficial APK files.
- Maintain verified backups before updates.

## 10. APK Integrity Information

Repository APK reference:

- File: MeraHisab.apk
- Size: 12,766,801 bytes
- Approximate size: 12.18 MiB
- SHA-256:

    40acd9153f051bb9cab6504c0895d5feb59466f2585068285497956b91dbf43f

The checksum above corresponds to the repository APK inspected during website development.

Application version, Android compatibility and signing certificate verification remain pending.

A matching checksum does not establish malware safety or independently verify developer authenticity.

Update all published APK metadata whenever the APK changes.

## 11. Website Security

Website security controls are designed to include:

- Same-origin script restrictions
- Hash-based Content Security Policy
- Inline event-handler restrictions
- Safe DOM text handling
- External link validation
- Secure browser context checks
- HTTPS deployment
- Restricted network access
- Local calculator processing

The implementation and deployed behavior require verification.

## 12. PWA Cache Security

The service worker is designed to cache approved public website resources only.

Excluded resources include:

- APK downloads
- Private backups
- Financial databases
- Authentication endpoints
- Contact forms and support requests
- Requests containing authorization headers
- Range requests
- URLs containing query parameters
- Unapproved external resources

PWA cache operations must not delete native Android application records, localStorage or IndexedDB.

Clearing optional offline resources may preserve essential offline fallback files.

## 13. Data Protection

Users should:

- Protect device access.
- Maintain secure backups.
- Verify recovery procedures.
- Avoid sharing confidential records.
- Protect authentication credentials.
- Review application permissions.

Native application encryption, data retention and recovery implementation require separate technical verification.

## 14. Security Incident Management

Proposed incident response procedures include:

1. Identify the issue.
2. Assess the potential impact.
3. Protect affected information.
4. Contain the issue.
5. Develop and verify remediation.
6. Release appropriate updates.
7. Provide legally required notifications where applicable.
8. Review preventive improvements.

Formal incident response responsibilities remain subject to operator approval.

## 15. Security Updates

Application and website updates should undergo:

- Code review
- Dependency review
- Security review
- Functional testing
- Compatibility testing
- Regression testing
- Release integrity verification

The service worker uses controlled update activation.

## 16. Bug Bounty

No official paid bug bounty program is currently announced.

This policy does not promise compensation or a response deadline.

## 17. Privacy Policy

Privacy and data protection information:

https://merahisab.store/privacy.html

Support information:

https://merahisab.store/contact.html

## 18. Security Limitations

No website, application or storage system can guarantee absolute security.

Browser diagnostics and checksum comparisons are limited technical checks.

They are not independent security audits.

## 19. Policy Maintenance

Review this policy whenever:

- Application versions change.
- Security features change.
- Data processing changes.
- Reporting channels change.
- Applicable legal obligations change.
- Significant security incidents occur.

## 20. Pending Verification

- Private security reporting channel
- Official privacy and support contact
- APK signing certificate
- Application permissions
- Native application encryption
- Backup and recovery implementation
- Deployed HTTPS configuration
- Browser security testing
- Final policy approval

---

MeraHisab

https://merahisab.store/
