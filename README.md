
# MeraHisab

## Your Money, Your Hisab

Official website project for personal finance, digital khata management and financial tools.

[Official Website](https://merahisab.store/)

## Project Information

| Information | Details |
|---|---|
| Brand | MeraHisab |
| Official Domain | merahisab.store |
| Repository | merahisab-website |
| Hosting | GitHub Pages |
| Technology | HTML, CSS, JavaScript |
| Website Type | Responsive Website / PWA |
| Website Languages | English and Hindi |
| Website Themes | Dark, Light and System |
| Master Version | 2.0.0 |

## Applications

### MeraHisab

A personal finance application intended for:

- Income tracking
- Expense tracking
- Savings management
- Financial accounts
- Financial reports
- Backup and recovery
- Personal financial organization

APK information:

https://merahisab.store/download.html

The APK is included in the repository. Application features, version and security implementation require verification.

### Royal Khata

A planned digital ledger application intended for:

- Credit management
- Debit management
- Customer accounts
- Outstanding balances
- Transaction history
- Monthly summaries
- Reports
- Backup and recovery
- Recovery-key functionality

Official APK release is pending.

## Website Features

- Responsive website design
- Premium navy and gold styling
- Dark, light and system themes
- Hindi and English language support
- Application comparison
- Application recommendation tool
- Official download center
- APK checksum verification
- Financial calculators
- Indian Standard Time clock
- Stopwatch and lap records
- Privacy center
- Browser security diagnostics
- Local support request builder
- Offline center
- Custom 404 error page
- PWA installation support
- Controlled website updates
- Offline cache management
- Search engine configuration
- Keyboard accessibility
- Print and PDF support

## Financial Calculators

1. Loan EMI Calculator
2. SIP Calculator
3. Fixed Deposit Calculator
4. Recurring Deposit Calculator
5. Simple Interest Calculator
6. Compound Interest Calculator
7. GST Calculator
8. Discount Calculator
9. Percentage Calculator
10. Savings Goal Calculator
11. Inflation Calculator

Calculations are performed locally by the calculator engine.

Results are estimates and do not constitute personalized financial advice.

## Repository Structure

    merahisab-website/
    |
    |-- index.html
    |-- merahisab.html
    |-- royal-khata.html
    |-- compare.html
    |-- downloads.html
    |-- download.html
    |-- tools.html
    |-- privacy.html
    |-- about.html
    |-- contact.html
    |-- offline.html
    |-- 404.html
    |
    |-- upgrade.css
    |-- upgrade.js
    |-- security.js
    |-- language.css
    |-- language.js
    |-- language-content.js
    |-- language-integration.js
    |-- pwa.css
    |-- pwa.js
    |
    |-- manifest.json
    |-- sw.js
    |-- robots.txt
    |-- sitemap.xml
    |-- CNAME
    |-- .nojekyll
    |-- README.md
    |-- SECURITY.md
    |
    |-- MeraHisab.apk
    |-- merahisab-dashboard.png
    |
    |-- icons/
    |   |-- icon-192.png
    |   |-- icon-512.png
    |   |-- maskable-192.png
    |   |-- maskable-512.png
    |   |-- shortcut-merahisab.png
    |   |-- shortcut-royal-khata.png
    |   |-- shortcut-tools.png
    |   |-- shortcut-downloads.png
    |
    |-- .well-known/
        |-- security.txt

## Website Pages

| Page | Purpose |
|---|---|
| index.html | Homepage |
| merahisab.html | MeraHisab information |
| royal-khata.html | Royal Khata information |
| compare.html | Application comparison |
| downloads.html | Download center |
| download.html | Individual APK download |
| tools.html | Financial calculators |
| privacy.html | Privacy information |
| about.html | Brand information |
| contact.html | Local support request builder |
| offline.html | Offline fallback |
| 404.html | Error and navigation center |

## PWA Architecture

The website PWA uses:

- Web App Manifest
- Service Worker
- Cache Storage
- Application icons
- Maskable icons
- Website shortcuts
- Offline fallback
- Manual cache refresh
- Controlled update activation
- Offline language resources

Service Worker version: 2.0.0

The website PWA and Android APK are separate products.

Offline functionality depends on successful caching and browser compatibility.

## Security Architecture

Website security objectives include:

- Hash-based Content Security Policy
- Same-origin resource restrictions
- Safe DOM handling
- External link protection
- APK integrity verification
- Secure context checks
- Restricted offline caching
- Privacy-aware support tools

Security implementation and deployment require comprehensive testing.

Security policy:

https://github.com/merahisab/merahisab-website/blob/main/SECURITY.md

## APK Information

Current repository reference:

- File: MeraHisab.apk
- Size: 12,766,801 bytes
- Approximate size: 12.18 MiB
- SHA-256:

    40acd9153f051bb9cab6504c0895d5feb59466f2585068285497956b91dbf43f

Version, Android compatibility and signing certificate verification remain pending.

Update checksum and file size on all relevant pages after replacing the APK.

## Local Development

Use a local HTTP server instead of opening HTML files directly.

Example:

    python -m http.server 8000

Open:

    http://localhost:8000/

Service worker behavior depends on browser support and secure-context requirements.

## Deployment

1. Keep website files in the repository root.
2. Preserve all file and folder names.
3. Ensure security.js is present in the root.
4. Configure GitHub Pages.
5. Select the intended publishing branch and root folder.
6. Preserve the custom domain.
7. Verify DNS configuration.
8. Enable HTTPS when available.
9. Deploy website resources and configuration files.
10. Update the service worker last.
11. Verify the published website.

The CNAME file must contain:

    merahisab.store

Do not replace the custom domain unless explicitly required.

## SEO Configuration

Sitemap:

https://merahisab.store/sitemap.xml

Robots configuration:

https://merahisab.store/robots.txt

Search engine setup:

- Google Search Console
- Bing Webmaster Tools
- Sitemap submission
- Indexing verification
- Canonical URL verification
- Mobile usability review

Search ranking and indexing are not guaranteed.

## Release Update Procedure

1. Back up the current repository.
2. Update the intended website files.
3. Verify all local file references.
4. Update APK metadata if applicable.
5. Recalculate CSP hashes for modified inline scripts.
6. Validate the manifest and sitemap.
7. Increase the service worker version.
8. Commit all files.
9. Verify deployment.
10. Test installation and offline behavior.
11. Test security and accessibility.
12. Record verified release information.

## Testing Checklist

- [ ] Website navigation
- [ ] Internal links
- [ ] External links
- [ ] Mobile layout
- [ ] Tablet layout
- [ ] Desktop layout
- [ ] Hindi translation
- [ ] English translation
- [ ] Dark theme
- [ ] Light theme
- [ ] System theme
- [ ] Financial calculators
- [ ] IST clock
- [ ] Stopwatch
- [ ] APK download
- [ ] APK checksum
- [ ] APK signing certificate
- [ ] Support request preview
- [ ] Support request export
- [ ] Privacy diagnostics
- [ ] Content Security Policy
- [ ] HTTPS
- [ ] PWA installation
- [ ] Service worker updates
- [ ] Offline functionality
- [ ] Cache clearing
- [ ] Cache refresh
- [ ] Accessibility
- [ ] Search engine indexing
- [ ] Custom domain

## Privacy and Support

Privacy information:

https://merahisab.store/privacy.html

Support information:

https://merahisab.store/contact.html

The support page currently generates local drafts and does not automatically submit requests.

Verified contact information and formal privacy procedures remain pending.

## Project Status

Website master coding is being finalized.

Comprehensive browser, deployment, security and application verification must be completed before declaring the project production-ready.

Royal Khata APK release remains pending.

## Licensing

No software license or redistribution permission is granted by this README.

Licensing and third-party asset requirements must be confirmed by the project operator.

---

MeraHisab

Your Money, Your Hisab

https://merahisab.store/
