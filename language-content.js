
/* ==========================================
   MERAHISAB LANGUAGE CONTENT DICTIONARY
   Version: 1.0.0
   Official: https://merahisab.store/
========================================== */

(function () {

"use strict";

if (window.MeraHisabLanguageContent) {
  return;
}

/* ==========================================
   BILINGUAL TRANSLATION CONTENT
   Format: Key, English, Hindi
========================================== */

const content = [

/* WEBSITE BRAND */

["brand.name",
"MeraHisab",
"MeraHisab"],

["brand.tagline",
"Your Money, Your Hisab",
"आपका पैसा, आपका हिसाब"],

["brand.official",
"Official Website",
"आधिकारिक वेबसाइट"],

["brand.platform",
"Personal Finance & Digital Khata",
"व्यक्तिगत वित्त और डिजिटल खाता"],

["brand.india",
"Designed for India",
"भारत के लिए डिजाइन किया गया"],

/* GENERAL CONTROLS */

["action.view",
"View",
"देखें"],

["action.edit",
"Edit",
"संपादित करें"],

["action.delete",
"Delete",
"हटाएं"],

["action.confirm",
"Confirm",
"पुष्टि करें"],

["action.continue",
"Continue",
"जारी रखें"],

["action.previous",
"Previous",
"पिछला"],

["action.next",
"Next",
"अगला"],

["action.print",
"Print",
"प्रिंट करें"],

["action.export",
"Export",
"एक्सपोर्ट करें"],

["action.import",
"Import",
"इंपोर्ट करें"],

["action.select",
"Select",
"चुनें"],

["action.selectFile",
"Select File",
"फाइल चुनें"],

["action.copyLink",
"Copy Link",
"लिंक कॉपी करें"],

["action.downloadFile",
"Download File",
"फाइल डाउनलोड करें"],

["action.clearAll",
"Clear All",
"सभी साफ करें"],

["action.resetAll",
"Reset All",
"सभी रीसेट करें"],

["action.showMore",
"Show More",
"और दिखाएं"],

["action.showLess",
"Show Less",
"कम दिखाएं"],

["action.viewAll",
"View All",
"सभी देखें"],

["action.checkNow",
"Check Now",
"अभी जांचें"],

/* GENERAL STATUS */

["status.success",
"Successful",
"सफल"],

["status.error",
"Error",
"त्रुटि"],

["status.warning",
"Warning",
"चेतावनी"],

["status.information",
"Information",
"जानकारी"],

["status.ready",
"Ready",
"तैयार"],

["status.active",
"Active",
"सक्रिय"],

["status.inactive",
"Inactive",
"निष्क्रिय"],

["status.enabled",
"Enabled",
"चालू"],

["status.disabled",
"Disabled",
"बंद"],

["status.completed",
"Completed",
"पूर्ण"],

["status.processing",
"Processing...",
"प्रक्रिया जारी है..."],

["status.notConfigured",
"Not Configured",
"कॉन्फिगर नहीं किया गया"],

["status.notConnected",
"Not Connected",
"कनेक्ट नहीं है"],

["status.underDevelopment",
"Under Development",
"विकासाधीन"],

["status.planned",
"Planned",
"योजनाबद्ध"],

["status.verified",
"Verified",
"सत्यापित"],

["status.notVerified",
"Not Verified",
"सत्यापित नहीं"],

["status.noResults",
"No Results Found",
"कोई परिणाम नहीं मिला"],

/* HOMEPAGE */

["home.welcome",
"Welcome to MeraHisab",
"MeraHisab में आपका स्वागत है"],

["home.exploreApps",
"Explore Our Applications",
"हमारे ऐप्स देखें"],

["home.exploreTools",
"Explore Financial Tools",
"वित्तीय उपकरण देखें"],

["home.whyChoose",
"Why Choose MeraHisab?",
"MeraHisab क्यों चुनें?"],

["home.financeManagement",
"Personal Finance Management",
"व्यक्तिगत वित्त प्रबंधन"],

["home.digitalKhata",
"Digital Khata Management",
"डिजिटल खाता प्रबंधन"],

["home.smartTools",
"Smart Financial Tools",
"स्मार्ट वित्तीय उपकरण"],

["home.applicationPreview",
"Application Preview",
"ऐप का पूर्वावलोकन"],

["home.dashboardPreview",
"Dashboard Preview",
"डैशबोर्ड का पूर्वावलोकन"],

["home.latestUpdates",
"Latest Updates",
"नवीनतम अपडेट"],

["home.quickLinks",
"Quick Links",
"महत्वपूर्ण लिंक"],

["home.motivation",
"Daily Motivation",
"दैनिक प्रेरणा"],

["home.pauseTicker",
"Pause Messages",
"संदेश रोकें"],

["home.resumeTicker",
"Resume Messages",
"संदेश जारी रखें"],

["home.startJourney",
"Start Your Financial Journey",
"अपनी वित्तीय यात्रा शुरू करें"],

/* APPLICATION FEATURES */

["feature.dashboard",
"Smart Dashboard",
"स्मार्ट डैशबोर्ड"],

["feature.incomeTracking",
"Income Tracking",
"आय का हिसाब"],

["feature.expenseTracking",
"Expense Tracking",
"खर्च का हिसाब"],

["feature.creditTracking",
"Credit Tracking",
"क्रेडिट का हिसाब"],

["feature.debitTracking",
"Debit Tracking",
"डेबिट का हिसाब"],

["feature.customerAccounts",
"Customer Accounts",
"ग्राहक खाते"],

["feature.accountManagement",
"Account Management",
"खाता प्रबंधन"],

["feature.transactionHistory",
"Transaction History",
"लेनदेन का इतिहास"],

["feature.monthlySummary",
"Monthly Summary",
"मासिक सारांश"],

["feature.monthlyCredit",
"Monthly Credit",
"मासिक क्रेडिट"],

["feature.monthlyDebit",
"Monthly Debit",
"मासिक डेबिट"],

["feature.netBalance",
"Net Balance",
"शुद्ध शेष राशि"],

["feature.financialReports",
"Financial Reports",
"वित्तीय रिपोर्ट"],

["feature.searchFilter",
"Search & Filters",
"खोज और फिल्टर"],

["feature.backupRestore",
"Backup & Restore",
"बैकअप और पुनर्स्थापना"],

["feature.dataExport",
"Data Export",
"डेटा एक्सपोर्ट"],

["feature.pdfExport",
"PDF Export",
"PDF एक्सपोर्ट"],

["feature.excelExport",
"Excel Export",
"Excel एक्सपोर्ट"],

["feature.appLock",
"Application Lock",
"ऐप लॉक"],

["feature.recoveryKey",
"Recovery Key",
"रिकवरी कुंजी"],

["feature.dataProtection",
"Data Protection",
"डेटा संरक्षण"],

["feature.darkMode",
"Dark Mode",
"डार्क मोड"],

["feature.lightMode",
"Light Mode",
"लाइट मोड"],

["feature.systemTheme",
"System Theme",
"सिस्टम थीम"],

["feature.language",
"Multiple Languages",
"एक से अधिक भाषाएं"],

["feature.reminders",
"Reminders",
"रिमाइंडर"],

["feature.notes",
"Notes",
"नोट्स"],

["feature.offline",
"Offline Functionality",
"ऑफलाइन सुविधा"],

["feature.plannedNotice",
"Planned features are subject to development and testing.",
"योजनाबद्ध सुविधाएं विकास और परीक्षण पर निर्भर हैं।"],

/* MERAHISAB APPLICATION */

["merahisab.title",
"MeraHisab Application",
"MeraHisab ऐप"],

["merahisab.subtitle",
"Personal Financial Management",
"व्यक्तिगत वित्त प्रबंधन"],

["merahisab.overview",
"Application Overview",
"ऐप का परिचय"],

["merahisab.manageMoney",
"Manage Your Daily Finances",
"अपने दैनिक वित्त का प्रबंधन करें"],

["merahisab.details",
"Application Details",
"ऐप का विवरण"],

["merahisab.screenshot",
"Application Screenshot",
"ऐप का स्क्रीनशॉट"],

["merahisab.installation",
"Installation Instructions",
"इंस्टॉलेशन निर्देश"],

/* ROYAL KHATA */

["royal.title",
"Royal Khata Application",
"Royal Khata ऐप"],

["royal.subtitle",
"Digital Credit & Debit Ledger",
"डिजिटल क्रेडिट और डेबिट खाता"],

["royal.releasePending",
"Official APK Release Pending",
"आधिकारिक APK रिलीज लंबित है"],

["royal.plannedFeatures",
"Planned Features",
"योजनाबद्ध सुविधाएं"],

["royal.sampleDashboard",
"Illustrative Dashboard",
"उदाहरण डैशबोर्ड"],

["royal.sampleData",
"Sample data for demonstration only.",
"केवल प्रदर्शन के लिए उदाहरण डेटा।"],

["royal.customerLedger",
"Customer Ledger",
"ग्राहक खाता बही"],

["royal.totalAccounts",
"Total Accounts",
"कुल खाते"],

["royal.recentTransactions",
"Recent Transactions",
"हाल के लेनदेन"],

["royal.development",
"Development Information",
"विकास संबंधी जानकारी"],

/* DOWNLOAD CENTER */

["downloads.official",
"Official Download Center",
"आधिकारिक डाउनलोड केंद्र"],

["downloads.availableApps",
"Available Applications",
"उपलब्ध ऐप्स"],

["downloads.releaseInfo",
"Release Information",
"रिलीज की जानकारी"],

["downloads.compatibility",
"Android Compatibility",
"Android अनुकूलता"],

["downloads.fileDetails",
"Download File Details",
"डाउनलोड फाइल का विवरण"],

["downloads.security",
"Download Safety",
"डाउनलोड सुरक्षा"],

["downloads.updateGuide",
"Application Update Guide",
"ऐप अपडेट गाइड"],

["downloads.backupFirst",
"Create a backup before updating.",
"अपडेट करने से पहले बैकअप बनाएं।"],

["downloads.officialOnly",
"Download applications from official sources.",
"ऐप केवल आधिकारिक स्रोतों से डाउनलोड करें।"],

["downloads.selectAPK",
"Select APK File",
"APK फाइल चुनें"],

["downloads.calculateHash",
"Calculate SHA-256",
"SHA-256 की गणना करें"],

["downloads.expectedHash",
"Expected SHA-256 Checksum",
"अपेक्षित SHA-256 चेकसम"],

["downloads.generatedHash",
"Calculated SHA-256 Checksum",
"गणना किया गया SHA-256 चेकसम"],

["downloads.copyHash",
"Copy Checksum",
"चेकसम कॉपी करें"],

["downloads.hashMatch",
"Checksum Matches",
"चेकसम मेल खाता है"],

["downloads.hashMismatch",
"Checksum Does Not Match",
"चेकसम मेल नहीं खाता"],

["downloads.hashPending",
"Official checksum verification is pending.",
"आधिकारिक चेकसम का सत्यापन लंबित है।"],

["downloads.localVerification",
"File verification takes place in your browser.",
"फाइल का सत्यापन आपके ब्राउजर में होता है।"],

["downloads.noUpload",
"The selected file is not uploaded by this tool.",
"यह उपकरण चुनी गई फाइल को अपलोड नहीं करता।"],

["downloads.hashDisclaimer",
"A matching checksum does not guarantee that an application is safe.",
"चेकसम का मेल खाना ऐप की सुरक्षा की गारंटी नहीं है।"],

/* COMPARISON PAGE */

["compare.title",
"Compare Applications",
"ऐप्स की तुलना करें"],

["compare.features",
"Feature Comparison",
"सुविधाओं की तुलना"],

["compare.category",
"Select Category",
"श्रेणी चुनें"],

["compare.allCategories",
"All Categories",
"सभी श्रेणियां"],

["compare.search",
"Search Features",
"सुविधाएं खोजें"],

["compare.selector",
"Smart Application Selector",
"स्मार्ट ऐप चयन"],

["compare.recommendation",
"Suggested Application",
"सुझाया गया ऐप"],

["compare.personal",
"Personal Use",
"व्यक्तिगत उपयोग"],

["compare.business",
"Business Use",
"व्यावसायिक उपयोग"],

["compare.both",
"Both Applications",
"दोनों ऐप्स"],

["compare.useCases",
"Common Use Cases",
"सामान्य उपयोग के उदाहरण"],

["compare.availability",
"Feature Availability",
"सुविधाओं की उपलब्धता"],

/* FINANCIAL CALCULATOR CONTENT */

["calculator.principal",
"Principal Amount",
"मूलधन"],

["calculator.loanAmount",
"Loan Amount",
"ऋण राशि"],

["calculator.annualRate",
"Annual Interest Rate",
"वार्षिक ब्याज दर"],

["calculator.monthlyInvestment",
"Monthly Investment",
"मासिक निवेश"],

["calculator.monthlyDeposit",
"Monthly Deposit",
"मासिक जमा"],

["calculator.investment",
"Investment Amount",
"निवेश राशि"],

["calculator.tenure",
"Tenure",
"समय अवधि"],

["calculator.totalInterest",
"Total Interest",
"कुल ब्याज"],

["calculator.totalPayment",
"Total Payment",
"कुल भुगतान"],

["calculator.monthlyEMI",
"Monthly EMI",
"मासिक EMI"],

["calculator.totalInvestment",
"Total Investment",
"कुल निवेश"],

["calculator.estimatedReturns",
"Estimated Returns",
"अनुमानित रिटर्न"],

["calculator.maturity",
"Maturity Amount",
"परिपक्वता राशि"],

["calculator.originalPrice",
"Original Price",
"मूल कीमत"],

["calculator.discountRate",
"Discount Rate",
"छूट की दर"],

["calculator.discountAmount",
"Discount Amount",
"छूट की राशि"],

["calculator.finalPrice",
"Final Price",
"अंतिम कीमत"],

["calculator.gstRate",
"GST Rate",
"GST दर"],

["calculator.gstAmount",
"GST Amount",
"GST राशि"],

["calculator.taxableAmount",
"Taxable Amount",
"कर योग्य राशि"],

["calculator.totalAmount",
"Total Amount",
"कुल राशि"],

["calculator.percentage",
"Percentage",
"प्रतिशत"],

["calculator.savingsGoal",
"Savings Goal",
"बचत लक्ष्य"],

["calculator.currentSavings",
"Current Savings",
"वर्तमान बचत"],

["calculator.monthlySavings",
"Required Monthly Savings",
"आवश्यक मासिक बचत"],

["calculator.inflationRate",
"Inflation Rate",
"महंगाई दर"],

["calculator.futureValue",
"Future Value",
"भविष्य का मूल्य"],

["calculator.presentValue",
"Present Value",
"वर्तमान मूल्य"],

["calculator.compounding",
"Compounding Frequency",
"चक्रवृद्धि ब्याज की आवृत्ति"],

["calculator.monthly",
"Monthly",
"मासिक"],

["calculator.quarterly",
"Quarterly",
"तिमाही"],

["calculator.halfYearly",
"Half-Yearly",
"अर्धवार्षिक"],

["calculator.yearly",
"Yearly",
"वार्षिक"],

["calculator.startMonth",
"Beginning of Month",
"महीने की शुरुआत"],

["calculator.endMonth",
"End of Month",
"महीने का अंत"],

["calculator.invalidInput",
"Please enter valid values.",
"कृपया सही मान दर्ज करें।"],

["calculator.estimateNotice",
"Results are estimates for informational purposes.",
"परिणाम केवल जानकारी के लिए अनुमान हैं।"],

["calculator.noGuarantee",
"Investment returns are not guaranteed.",
"निवेश रिटर्न की गारंटी नहीं है।"],

["calculator.copyResult",
"Copy Result",
"परिणाम कॉपी करें"],

["calculator.printResult",
"Print Result",
"परिणाम प्रिंट करें"],

/* CLOCK AND STOPWATCH */

["clock.title",
"Live Indian Standard Time",
"लाइव भारतीय मानक समय"],

["clock.date",
"Current Date",
"वर्तमान तारीख"],

["clock.deviceTime",
"Time is based on your device clock.",
"समय आपके डिवाइस की घड़ी पर आधारित है।"],

["stopwatch.title",
"Digital Stopwatch",
"डिजिटल स्टॉपवॉच"],

["stopwatch.elapsed",
"Elapsed Time",
"बीता हुआ समय"],

["stopwatch.lapTime",
"Lap Time",
"लैप का समय"],

["stopwatch.totalTime",
"Total Time",
"कुल समय"],

["stopwatch.noLaps",
"No laps recorded.",
"कोई लैप दर्ज नहीं है।"],

["stopwatch.lapLimit",
"Maximum lap limit reached.",
"अधिकतम लैप सीमा पूरी हो गई है।"],

/* PRIVACY AND SECURITY */

["privacy.center",
"Privacy Center",
"गोपनीयता केंद्र"],

["privacy.principles",
"Privacy Principles",
"गोपनीयता सिद्धांत"],

["privacy.transparency",
"Transparency",
"पारदर्शिता"],

["privacy.userControl",
"User Control",
"उपयोगकर्ता का नियंत्रण"],

["privacy.dataMinimization",
"Data Minimization",
"न्यूनतम डेटा संग्रह"],

["privacy.financialRecords",
"Financial Records",
"वित्तीय रिकॉर्ड"],

["privacy.cookies",
"Cookies & Local Storage",
"कुकीज और लोकल स्टोरेज"],

["privacy.thirdParty",
"Third-Party Services",
"तृतीय-पक्ष सेवाएं"],

["privacy.retention",
"Data Retention",
"डेटा रखने की अवधि"],

["privacy.deletion",
"Data Deletion",
"डेटा हटाना"],

["privacy.children",
"Children's Privacy",
"बच्चों की गोपनीयता"],

["privacy.policyChanges",
"Policy Changes",
"नीति में बदलाव"],

["privacy.draft",
"Privacy Policy Draft",
"गोपनीयता नीति का प्रारूप"],

["privacy.reviewPending",
"Policy review and verification are pending.",
"नीति की समीक्षा और सत्यापन लंबित हैं।"],

["privacy.browserDiagnostics",
"Browser Diagnostics",
"ब्राउजर की तकनीकी जांच"],

["privacy.secureContext",
"Secure Browser Context",
"सुरक्षित ब्राउजर संदर्भ"],

["privacy.storageUsage",
"Storage Usage",
"स्टोरेज का उपयोग"],

["privacy.storageQuota",
"Storage Quota",
"स्टोरेज की अनुमानित सीमा"],

["privacy.persistentStorage",
"Persistent Storage",
"स्थायी स्टोरेज"],

["security.title",
"Security Center",
"सुरक्षा केंद्र"],

["security.passwordWarning",
"Never share passwords or OTPs.",
"पासवर्ड या OTP कभी साझा न करें।"],

["security.recoveryWarning",
"Never share your recovery key.",
"अपनी रिकवरी कुंजी कभी साझा न करें।"],

["security.bankWarning",
"Do not share bank or card credentials.",
"बैंक या कार्ड की गोपनीय जानकारी साझा न करें।"],

["security.backupWarning",
"Keep a secure backup of important records.",
"महत्वपूर्ण रिकॉर्ड का सुरक्षित बैकअप रखें।"],

["security.report",
"Report a Security Issue",
"सुरक्षा समस्या की रिपोर्ट करें"],

["security.verification",
"Security Verification",
"सुरक्षा सत्यापन"],

["security.noGuarantee",
"No system can guarantee complete security.",
"कोई भी सिस्टम पूर्ण सुरक्षा की गारंटी नहीं दे सकता।"],

/* ABOUT PAGE */

["about.story",
"Our Story",
"हमारी कहानी"],

["about.brand",
"Brand Information",
"ब्रांड की जानकारी"],

["about.ecosystem",
"MeraHisab Ecosystem",
"MeraHisab की सेवाएं"],

["about.targetUsers",
"Who Is It For?",
"यह किसके लिए है?"],

["about.individuals",
"Individuals",
"व्यक्तिगत उपयोगकर्ता"],

["about.families",
"Families",
"परिवार"],

["about.students",
"Students",
"विद्यार्थी"],

["about.businesses",
"Small Businesses",
"छोटे व्यवसाय"],

["about.shopkeepers",
"Shopkeepers",
"दुकानदार"],

["about.freelancers",
"Freelancers",
"स्वतंत्र पेशेवर"],

["about.developmentStatus",
"Development Status",
"विकास की स्थिति"],

["about.disclaimer",
"Financial Disclaimer",
"वित्तीय अस्वीकरण"],

["about.shareWebsite",
"Share Official Website",
"आधिकारिक वेबसाइट साझा करें"],

/* SUPPORT CENTER */

["support.center",
"Self-Service Help Center",
"स्वयं सहायता केंद्र"],

["support.application",
"Select Application",
"ऐप चुनें"],

["support.installation",
"Download & Installation",
"डाउनलोड और इंस्टॉलेशन"],

["support.featureSuggestion",
"Feature Suggestion",
"नई सुविधा का सुझाव"],

["support.privacyRequest",
"Privacy Request",
"गोपनीयता अनुरोध"],

["support.securityReport",
"Security Report",
"सुरक्षा रिपोर्ट"],

["support.backupRecovery",
"Backup & Recovery",
"बैकअप और रिकवरी"],

["support.website",
"Website & PWA",
"वेबसाइट और PWA"],

["support.generalFeedback",
"General Feedback",
"सामान्य सुझाव"],

["support.priority",
"Issue Priority",
"समस्या की प्राथमिकता"],

["support.low",
"Low",
"कम"],

["support.normal",
"Normal",
"सामान्य"],

["support.high",
"High",
"उच्च"],

["support.critical",
"Critical",
"अत्यंत महत्वपूर्ण"],

["support.device",
"Device Model",
"डिवाइस मॉडल"],

["support.os",
"Operating System",
"ऑपरेटिंग सिस्टम"],

["support.steps",
"Steps to Reproduce",
"समस्या दोहराने के चरण"],

["support.clearForm",
"Clear Form",
"फॉर्म साफ करें"],

["support.requestPreview",
"Support Request Preview",
"सहायता अनुरोध का पूर्वावलोकन"],

["support.copyRequest",
"Copy Request",
"अनुरोध कॉपी करें"],

["support.downloadTXT",
"Download TXT",
"TXT डाउनलोड करें"],

["support.shareRequest",
"Share Request",
"अनुरोध साझा करें"],

["support.editRequest",
"Edit Request",
"अनुरोध संपादित करें"],

["support.clearPreview",
"Clear Preview",
"पूर्वावलोकन साफ करें"],

["support.localNotice",
"This request is generated locally and is not automatically submitted.",
"यह अनुरोध स्थानीय रूप से तैयार होता है और अपने आप भेजा नहीं जाता।"],

["support.emailPending",
"Support email configuration is pending.",
"सहायता ईमेल की कॉन्फिगरेशन लंबित है।"],

["support.ticketPending",
"Online ticket submission is not connected.",
"ऑनलाइन टिकट भेजने की सुविधा कनेक्ट नहीं है।"],

["support.reviewInformation",
"Review your information before sharing.",
"साझा करने से पहले अपनी जानकारी की जांच करें।"],

/* PWA INSTALLATION */

["pwa.title",
"Website Installation & Offline Access",
"वेबसाइट इंस्टॉलेशन और ऑफलाइन सुविधा"],

["pwa.installApp",
"Install Website App",
"वेबसाइट ऐप इंस्टॉल करें"],

["pwa.installGuide",
"Installation Guide",
"इंस्टॉलेशन गाइड"],

["pwa.installed",
"Website App Installed",
"वेबसाइट ऐप इंस्टॉल है"],

["pwa.installUnavailable",
"Automatic installation is unavailable.",
"स्वचालित इंस्टॉलेशन उपलब्ध नहीं है।"],

["pwa.updateAvailable",
"Website Update Available",
"वेबसाइट अपडेट उपलब्ध है"],

["pwa.applyUpdate",
"Apply Update",
"अपडेट लागू करें"],

["pwa.currentVersion",
"Current Version",
"वर्तमान संस्करण"],

["pwa.refreshCache",
"Refresh Offline Cache",
"ऑफलाइन कैश रिफ्रेश करें"],

["pwa.clearCache",
"Clear Offline Cache",
"ऑफलाइन कैश साफ करें"],

["pwa.cacheStatus",
"Cache Status",
"कैश की स्थिति"],

["pwa.cachedResources",
"Cached Resources",
"कैश में उपलब्ध संसाधन"],

["pwa.serviceWorker",
"Service Worker",
"सर्विस वर्कर"],

["pwa.connection",
"Internet Connection",
"इंटरनेट कनेक्शन"],

["pwa.checkConnection",
"Check Connection",
"कनेक्शन जांचें"],

["pwa.storageEstimate",
"Estimated Storage",
"अनुमानित स्टोरेज"],

["pwa.requestPersistence",
"Request Persistent Storage",
"स्थायी स्टोरेज का अनुरोध करें"],

["pwa.offlineNotice",
"Only selected cached pages may be available offline.",
"केवल चुने गए कैश किए गए पेज ऑफलाइन उपलब्ध हो सकते हैं।"],

["pwa.cacheWarning",
"Clearing the cache may remove offline resources.",
"कैश साफ करने से ऑफलाइन संसाधन हट सकते हैं।"],

["pwa.nativeAppNotice",
"The website app is different from the Android APK.",
"वेबसाइट ऐप Android APK से अलग है।"],

/* OFFLINE PAGE */

["offline.title",
"You Are Offline",
"आप ऑफलाइन हैं"],

["offline.description",
"An internet connection may be required to open this page.",
"इस पेज को खोलने के लिए इंटरनेट कनेक्शन की आवश्यकता हो सकती है।"],

["offline.retry",
"Retry Connection",
"कनेक्शन का पुनः प्रयास करें"],

["offline.resources",
"Available Offline Resources",
"उपलब्ध ऑफलाइन संसाधन"],

["offline.checking",
"Checking Connection...",
"कनेक्शन जांचा जा रहा है..."],

["offline.connected",
"Connection Available",
"कनेक्शन उपलब्ध है"],

["offline.unavailable",
"Connection Could Not Be Confirmed",
"कनेक्शन की पुष्टि नहीं हो सकी"],

/* ERROR PAGE */

["error.requestedPath",
"Requested Page Path",
"अनुरोधित पेज का पाथ"],

["error.quickNavigation",
"Quick Navigation",
"त्वरित नेविगेशन"],

["error.suggestedPages",
"Suggested Pages",
"सुझाए गए पेज"],

["error.searchWebsite",
"Search MeraHisab Website",
"MeraHisab वेबसाइट पर खोजें"],

["error.copyPath",
"Copy Page Path",
"पेज का पाथ कॉपी करें"],

["error.copyReport",
"Copy Error Report",
"त्रुटि रिपोर्ट कॉपी करें"],

["error.reportNotice",
"The error report has not been submitted.",
"त्रुटि रिपोर्ट भेजी नहीं गई है।"],

["error.noMatchingPages",
"No matching pages found.",
"कोई मेल खाने वाला पेज नहीं मिला।"],

/* DYNAMIC MESSAGES */

["message.copied",
"Copied successfully.",
"सफलतापूर्वक कॉपी किया गया।"],

["message.copyFailed",
"Automatic copying is unavailable.",
"स्वचालित कॉपी की सुविधा उपलब्ध नहीं है।"],

["message.downloadRequested",
"Download requested. Check your browser downloads.",
"डाउनलोड का अनुरोध किया गया है। ब्राउजर के डाउनलोड देखें।"],

["message.downloadFailed",
"Unable to prepare the download.",
"डाउनलोड तैयार नहीं किया जा सका।"],

["message.invalidFile",
"Please select a valid file.",
"कृपया सही फाइल चुनें।"],

["message.fileTooLarge",
"The selected file exceeds the allowed size.",
"चुनी गई फाइल अनुमत आकार से बड़ी है।"],

["message.shareCancelled",
"Sharing cancelled.",
"साझा करना रद्द किया गया।"],

["message.shareUnavailable",
"Sharing is unavailable in this browser.",
"इस ब्राउजर में साझा करने की सुविधा उपलब्ध नहीं है।"],

["message.formCleared",
"Form cleared.",
"फॉर्म साफ कर दिया गया है।"],

["message.previewReady",
"Local preview generated successfully.",
"स्थानीय पूर्वावलोकन सफलतापूर्वक तैयार हुआ।"],

["message.confirmReset",
"Are you sure you want to reset?",
"क्या आप निश्चित रूप से रीसेट करना चाहते हैं?"],

["message.confirmClear",
"Are you sure you want to clear this information?",
"क्या आप निश्चित रूप से यह जानकारी साफ करना चाहते हैं?"],

["message.confirmShare",
"Review private information before sharing.",
"साझा करने से पहले निजी जानकारी की जांच करें।"],

["message.refreshSuccess",
"Information refreshed.",
"जानकारी रिफ्रेश कर दी गई है।"],

["message.browserUnsupported",
"This feature is not supported by your browser.",
"आपका ब्राउजर इस सुविधा का समर्थन नहीं करता।"],

["message.secureContextRequired",
"This feature requires a secure HTTPS context.",
"इस सुविधा के लिए सुरक्षित HTTPS संदर्भ आवश्यक है।"],

["message.noData",
"No data available.",
"कोई डेटा उपलब्ध नहीं है।"],

["message.tryAgain",
"Something went wrong. Please try again.",
"कुछ समस्या हुई है। कृपया पुनः प्रयास करें।"],

/* FOOTER */

["footer.navigation",
"Website Navigation",
"वेबसाइट नेविगेशन"],

["footer.resources",
"Resources",
"संसाधन"],

["footer.legal",
"Legal Information",
"कानूनी जानकारी"],

["footer.support",
"Help & Support",
"सहायता और समर्थन"],

["footer.disclaimer",
"For informational purposes only.",
"केवल जानकारी के उद्देश्य से।"]

];

/* ==========================================
   BUILD TRANSLATION DICTIONARIES
========================================== */

const english = Object.create(null);

const hindi = Object.create(null);

const registeredKeys = new Set();

let duplicateCount = 0;

let invalidCount = 0;

content.forEach(function (entry) {

  if (
    !Array.isArray(entry) ||
    entry.length !== 3
  ) {

    invalidCount++;

    return;

  }

  const key = entry[0];

  const en = entry[1];

  const hi = entry[2];

  if (
    typeof key !== "string" ||
    !/^[a-zA-Z0-9_.-]+$/.test(key) ||
    typeof en !== "string" ||
    typeof hi !== "string" ||
    !en.trim() ||
    !hi.trim()
  ) {

    invalidCount++;

    return;

  }

  if (registeredKeys.has(key)) {

    duplicateCount++;

    return;

  }

  registeredKeys.add(key);

  english[key] = en;

  hindi[key] = hi;

});

/* ==========================================
   REGISTER WITH LANGUAGE ENGINE
========================================== */

let registered = false;

function registerTranslations() {

  if (registered) {

    return true;

  }

  const engine =
    window.MeraHisabLanguage;

  if (
    !engine ||
    typeof engine.addTranslations !== "function"
  ) {

    return false;

  }

  const enRegistered =
    engine.addTranslations("en", english);

  const hiRegistered =
    engine.addTranslations("hi", hindi);

  if (
    enRegistered !== true ||
    hiRegistered !== true
  ) {

    return false;

  }

  registered = true;

  if (typeof engine.apply === "function") {

    engine.apply(document);

  }

  window.dispatchEvent(

    new CustomEvent(

      "merahisab:languagecontentready",

      {

        detail: {

          version: "1.0.0",

          languages: ["en","hi"],

          totalKeys: registeredKeys.size,

          duplicates: duplicateCount,

          invalidEntries: invalidCount

        }

      }

    )

  );

  return true;

}

/* ==========================================
   PUBLIC CONTENT API
========================================== */

window.MeraHisabLanguageContent =
  Object.freeze({

    version: "1.0.0",

    register: registerTranslations,

    getStatus: function () {

      return {

        version: "1.0.0",

        registered: registered,

        languages: ["en","hi"],

        totalKeys: registeredKeys.size,

        duplicates: duplicateCount,

        invalidEntries: invalidCount

      };

    },

    getKeys: function () {

      return Array.from(registeredKeys);

    },

    hasKey: function (key) {

      return registeredKeys.has(key);

    },

    getTranslation: function (language,key) {

      if (!registeredKeys.has(key)) {

        return null;

      }

      if (language === "hi") {

        return hindi[key];

      }

      if (language === "en") {

        return english[key];

      }

      return null;

    }

  });

/* ==========================================
   INITIALIZATION
========================================== */

if (!registerTranslations()) {

  if (document.readyState === "loading") {

    document.addEventListener(

      "DOMContentLoaded",

      registerTranslations,

      {once: true}

    );

  }

  window.addEventListener(

    "load",

    registerTranslations,

    {once: true}

  );

}

/* ==========================================
   END OF LANGUAGE CONTENT DICTIONARY
========================================== */

})();
