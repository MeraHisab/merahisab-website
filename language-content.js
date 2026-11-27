
/* ==========================================
   MERAHISAB LANGUAGE CONTENT DICTIONARY
   Version: 2.0.0
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
/* Master update: exact text from the uploaded website snapshot. */
["master.text001", "Homepage", "मुख्य पेज"],
["master.text002", "Offline or Cached Content", "ऑफलाइन या कैश में सहेजी सामग्री"],
["master.text003", "Help Improve Website Navigation", "वेबसाइट नेविगेशन बेहतर बनाने में मदद करें"],
["master.text004", "What does a 404 error mean?", "404 त्रुटि का क्या अर्थ है?"],
["master.text005", "Is the entire website unavailable?", "क्या पूरी वेबसाइट अनुपलब्ध है?"],
["master.text006", "Will this error delete my financial records?", "क्या इस त्रुटि से मेरे वित्तीय रिकॉर्ड मिट जाएंगे?"],
["master.text007", "Can I still download MeraHisab?", "क्या मैं अभी भी MeraHisab डाउनलोड कर सकता हूं?"],
["master.text008", "Where can I find Royal Khata?", "Royal Khata कहां मिलेगा?"],
["master.text009", "Why is an offline page unavailable?", "ऑफलाइन पेज उपलब्ध क्यों नहीं है?"],
["master.text010", "Should I clear my browser cache?", "क्या मुझे ब्राउजर कैश साफ करना चाहिए?"],
["master.text011", "How can I report an incorrect link?", "गलत लिंक की रिपोर्ट कैसे करें?"],
["master.text012", "Primary Focus", "मुख्य उद्देश्य"],
["master.text013", "Planned Focus", "नियोजित उद्देश्य"],
["master.text014", "APK Release Pending", "APK जारी होना बाकी है"],
["master.text015", "Professionals", "पेशेवर"],
["master.text016", "Independent Workers", "स्वतंत्र कामगार"],
["master.text017", "Security", "सुरक्षा"],
["master.text018", "Accessibility", "सुगम्यता"],
["master.text019", "Progressive Web App", "प्रोग्रेसिव वेब ऐप"],
["master.text020", "Are MeraHisab and Royal Khata the same application?", "क्या MeraHisab और Royal Khata एक ही ऐप हैं?"],
["master.text021", "What is the official website?", "आधिकारिक वेबसाइट कौन सी है?"],
["master.text022", "Where can I read about privacy?", "गोपनीयता की जानकारी कहां पढ़ें?"],
["master.text023", "Does MeraHisab provide financial advice?", "क्या MeraHisab वित्तीय सलाह देता है?"],
["master.text024", "How can I suggest an improvement?", "सुधार का सुझाव कैसे दें?"],
["master.text025", "Copy Website Link", "वेबसाइट लिंक कॉपी करें"],
["master.text026", "MeraHisab vs Royal Khata", "MeraHisab बनाम Royal Khata"],
["master.text027", "Download Pending", "डाउनलोड लंबित"],
["master.text028", "All Features", "सभी सुविधाएं"],
["master.text029", "General", "सामान्य"],
["master.text030", "Finance", "वित्त"],
["master.text031", "Release", "रिलीज"],
["master.text032", "Feature", "सुविधा"],
["master.text033", "General Information", "सामान्य जानकारी"],
["master.text034", "Platform", "प्लेटफॉर्म"],
["master.text035", "Hindi & English", "हिन्दी और अंग्रेजी"],
["master.text036", "Application Themes", "ऐप की थीम"],
["master.text037", "Financial Management", "वित्तीय प्रबंधन"],
["master.text038", "Payment Reminders", "भुगतान अनुस्मारक"],
["master.text039", "Reports & Productivity", "रिपोर्ट और उत्पादकता"],
["master.text040", "Customer Statements", "ग्राहक खाता विवरण"],
["master.text041", "Security & Data Protection", "सुरक्षा और डेटा संरक्षण"],
["master.text042", "Local Data Storage", "स्थानीय डेटा संग्रहण"],
["master.text043", "Data Encryption", "डेटा एन्क्रिप्शन"],
["master.text044", "Backup Protection", "बैकअप सुरक्षा"],
["master.text045", "Download & Release Information", "डाउनलोड और रिलीज की जानकारी"],
["master.text046", "APK Download", "APK डाउनलोड"],
["master.text047", "APK File Size", "APK फाइल का आकार"],
["master.text048", "Signing Certificate", "साइनिंग प्रमाणपत्र"],
["master.text049", "Reset Filters", "फिल्टर रीसेट करें"],
["master.text050", "Print / Save as PDF", "प्रिंट करें / PDF के रूप में सहेजें"],
["master.text051", "1. What do you want to manage?", "1. आप क्या प्रबंधित करना चाहते हैं?"],
["master.text052", "Personal income, expenses and savings", "व्यक्तिगत आय, खर्च और बचत"],
["master.text053", "Customer credit, debit and digital khata", "ग्राहकों के क्रेडिट, डेबिट और डिजिटल खाते"],
["master.text054", "Both personal finances and digital khata", "व्यक्तिगत वित्त और डिजिटल खाते दोनों"],
["master.text055", "2. Who will use the application?", "2. ऐप का उपयोग कौन करेगा?"],
["master.text056", "Individual or family", "व्यक्ति या परिवार"],
["master.text057", "Shopkeeper or small business", "दुकानदार या छोटा व्यवसाय"],
["master.text058", "Personal and business use", "व्यक्तिगत और व्यावसायिक उपयोग"],
["master.text059", "3. Which reports are most important?", "3. कौन सी रिपोर्ट सबसे महत्वपूर्ण हैं?"],
["master.text060", "Income, expenses and savings reports", "आय, खर्च और बचत की रिपोर्ट"],
["master.text061", "Credit, debit and customer statements", "क्रेडिट, डेबिट और ग्राहक खाता विवरण"],
["master.text062", "Both types of financial reports", "दोनों प्रकार की वित्तीय रिपोर्ट"],
["master.text063", "Find My Application", "मेरे लिए ऐप खोजें"],
["master.text064", "Reset Answers", "उत्तर रीसेट करें"],
["master.text065", "What is the main difference?", "मुख्य अंतर क्या है?"],
["master.text066", "Which application is better for personal finance?", "व्यक्तिगत वित्त के लिए कौन सा ऐप बेहतर है?"],
["master.text067", "Which application is better for shopkeepers?", "दुकानदारों के लिए कौन सा ऐप बेहतर है?"],
["master.text068", "Can I use both applications?", "क्या मैं दोनों ऐप इस्तेमाल कर सकता हूं?"],
["master.text069", "Do both applications support backup?", "क्या दोनों ऐप में बैकअप की सुविधा है?"],
["master.text070", "Can I transfer data between the applications?", "क्या मैं दोनों ऐप के बीच डेटा स्थानांतरित कर सकता हूं?"],
["master.text071", "Are all listed Royal Khata features available?", "क्या Royal Khata की सभी सूचीबद्ध सुविधाएं उपलब्ध हैं?"],
["master.text072", "Are both applications available for download?", "क्या दोनों ऐप डाउनलोड के लिए उपलब्ध हैं?"],
["master.text073", "Can I save this comparison as PDF?", "क्या इस तुलना को PDF में सहेज सकते हैं?"],
["master.text074", "Where can I find more information?", "अधिक जानकारी कहां मिलेगी?"],
["master.text075", "Release Pending", "रिलीज लंबित"],
["master.text076", "Your Name (Optional)", "आपका नाम (वैकल्पिक)"],
["master.text077", "Email Address (Optional)", "ईमेल पता (वैकल्पिक)"],
["master.text078", "Select Application *", "ऐप चुनें *"],
["master.text079", "MeraHisab Website", "MeraHisab वेबसाइट"],
["master.text080", "Request Category *", "अनुरोध की श्रेणी *"],
["master.text081", "Download and Installation", "डाउनलोड और इंस्टॉलेशन"],
["master.text082", "Bug Report", "बग रिपोर्ट"],
["master.text083", "Backup and Recovery", "बैकअप और रिकवरी"],
["master.text084", "Website and PWA", "वेबसाइट और PWA"],
["master.text085", "Application Version (Optional)", "ऐप संस्करण (वैकल्पिक)"],
["master.text086", "Device Model (Optional)", "डिवाइस मॉडल (वैकल्पिक)"],
["master.text087", "Operating System (Optional)", "ऑपरेटिंग सिस्टम (वैकल्पिक)"],
["master.text088", "Subject *", "विषय *"],
["master.text089", "Describe Your Request *", "अपने अनुरोध का विवरण दें *"],
["master.text090", "Steps to Reproduce (Optional)", "समस्या दोहराने के चरण (वैकल्पिक)"],
["master.text091", "I understand that this request is generated locally and is not automatically sent to MeraHisab. I have reviewed the information for unnecessary sensitive data.", "मैं समझता हूं कि यह अनुरोध स्थानीय रूप से तैयार होता है और MeraHisab को अपने आप नहीं भेजा जाता। मैंने अनावश्यक संवेदनशील डेटा के लिए जानकारी की समीक्षा कर ली है।"],
["master.text092", "Website Installation", "वेबसाइट इंस्टॉलेशन"],
["master.text093", "How can I contact MeraHisab?", "MeraHisab से संपर्क कैसे करें?"],
["master.text094", "Why is my APK not downloading?", "मेरा APK डाउनलोड क्यों नहीं हो रहा है?"],
["master.text095", "Why is the application not installing?", "ऐप इंस्टॉल क्यों नहीं हो रहा है?"],
["master.text096", "Can I recover deleted financial records?", "क्या मिटाए गए वित्तीय रिकॉर्ड वापस मिल सकते हैं?"],
["master.text097", "How do I report a bug?", "बग की रिपोर्ट कैसे करें?"],
["master.text098", "How can I suggest a new feature?", "नई सुविधा का सुझाव कैसे दें?"],
["master.text099", "Can I report a security vulnerability?", "क्या सुरक्षा संबंधी कमजोरी की रिपोर्ट कर सकते हैं?"],
["master.text100", "Can I submit a privacy or deletion request?", "क्या गोपनीयता या डेटा हटाने का अनुरोध भेज सकते हैं?"],
["master.text101", "How do I install the website as a PWA?", "वेबसाइट को PWA के रूप में कैसे इंस्टॉल करें?"],
["master.text102", "MeraHisab Help & Support", "MeraHisab सहायता और समर्थन"],
["master.text103", "Expected SHA-256 Checksum (Optional)", "अपेक्षित SHA-256 चेकसम (वैकल्पिक)"],
["master.text104", "Does the APK checker upload my file?", "क्या APK जांच उपकरण मेरी फाइल अपलोड करता है?"],
["master.text105", "Can I download an APK without internet?", "क्या इंटरनेट के बिना APK डाउनलोड कर सकते हैं?"],
["master.text106", "Should I uninstall the old app before updating?", "क्या अपडेट से पहले पुराना ऐप हटाना चाहिए?"],
["master.text107", "Is website installation the same as Android installation?", "क्या वेबसाइट इंस्टॉल करना Android ऐप इंस्टॉल करने जैसा है?"],
["master.text108", "Where can I get installation help?", "इंस्टॉलेशन में सहायता कहां मिलेगी?"],
["master.text109", "Copy SHA-256", "SHA-256 कॉपी करें"],
["master.text110", "Select Downloaded APK", "डाउनलोड की गई APK चुनें"],
["master.text111", "Verify APK File", "APK फाइल सत्यापित करें"],
["master.text112", "Reset Verification", "सत्यापन रीसेट करें"],
["master.text113", "Can I install this APK on iPhone?", "क्या यह APK iPhone पर इंस्टॉल हो सकती है?"],
["master.text114", "Is my selected APK uploaded for verification?", "क्या चुनी गई APK सत्यापन के लिए अपलोड होती है?"],
["master.text115", "Does the checksum guarantee application safety?", "क्या चेकसम ऐप की सुरक्षा की गारंटी देता है?"],
["master.text116", "Can I download the APK offline?", "क्या APK ऑफलाइन डाउनलोड हो सकती है?"],
["master.text117", "Will updating delete my financial data?", "क्या अपडेट से मेरा वित्तीय डेटा मिट जाएगा?"],
["master.text118", "Is installing the website the same as installing the APK?", "क्या वेबसाइट इंस्टॉल करना APK इंस्टॉल करने जैसा है?"],
["master.text119", "Where can I get help?", "सहायता कहां मिलेगी?"],
["master.text120", "Install MeraHisab Website", "MeraHisab वेबसाइट इंस्टॉल करें"],
["master.text121", "Financial Calculators", "वित्तीय कैलकुलेटर"],
["master.text122", "Can I track income and expenses?", "क्या मैं आय और खर्च का हिसाब रख सकता हूं?"],
["master.text123", "Does MeraHisab support multiple accounts?", "क्या MeraHisab में कई खातों की सुविधा है?"],
["master.text124", "Can I create a backup?", "क्या मैं बैकअप बना सकता हूं?"],
["master.text125", "Where is my personal data stored?", "मेरा निजी डेटा कहां संग्रहित होता है?"],
["master.text126", "Can I use the website without internet?", "क्या इंटरनेट के बिना वेबसाइट इस्तेमाल कर सकते हैं?"],
["master.text127", "Where can I download the applications?", "ऐप कहां से डाउनलोड करें?"],
["master.text128", "Are financial calculators available?", "क्या वित्तीय कैलकुलेटर उपलब्ध हैं?"],
["master.text129", "How can I contact MeraHisab support?", "MeraHisab सहायता से संपर्क कैसे करें?"],
["master.text130", "Applications", "ऐप्स"],
["master.text131", "Is MeraHisab available for Android?", "क्या MeraHisab Android के लिए उपलब्ध है?"],
["master.text132", "Does MeraHisab work offline?", "क्या MeraHisab ऑफलाइन काम करता है?"],
["master.text133", "Can I create financial backups?", "क्या वित्तीय डेटा का बैकअप बना सकते हैं?"],
["master.text134", "What is the difference between MeraHisab and Royal Khata?", "MeraHisab और Royal Khata में क्या अंतर है?"],
["master.text135", "How can I get support?", "सहायता कैसे प्राप्त करें?"],
["master.text136", "Reload Page", "पेज दोबारा लोड करें"],
["master.text137", "App Comparison", "ऐप की तुलना"],
["master.text138", "Search Privacy Policy", "गोपनीयता नीति में खोजें"],
["master.text139", "Copy Privacy Policy", "गोपनीयता नीति कॉपी करें"],
["master.text140", "1. Scope of This Policy", "1. इस नीति का दायरा"],
["master.text141", "2. Information and Data", "2. जानकारी और डेटा"],
["master.text142", "Data Category", "डेटा की श्रेणी"],
["master.text143", "Examples", "उदाहरण"],
["master.text144", "Processing Information", "प्रोसेसिंग की जानकारी"],
["master.text145", "3. Financial Records", "3. वित्तीय रिकॉर्ड"],
["master.text146", "4. Purposes of Data Processing", "4. डेटा प्रोसेसिंग के उद्देश्य"],
["master.text147", "5. Application Permissions", "5. ऐप की अनुमतियां"],
["master.text148", "6. Cookies and Browser Storage", "6. कुकीज और ब्राउजर स्टोरेज"],
["master.text149", "Storage Type", "स्टोरेज का प्रकार"],
["master.text150", "Possible Purpose", "संभावित उद्देश्य"],
["master.text151", "7. PWA and Offline Storage", "7. PWA और ऑफलाइन स्टोरेज"],
["master.text152", "8. Data Security", "8. डेटा सुरक्षा"],
["master.text153", "9. Backups and Data Recovery", "9. बैकअप और डेटा रिकवरी"],
["master.text154", "10. Third-Party Services", "10. तृतीय पक्ष की सेवाएं"],
["master.text155", "11. Data Sharing and Disclosure", "11. डेटा साझा करना और प्रकटीकरण"],
["master.text156", "12. Data Retention", "12. डेटा रखने की अवधि"],
["master.text157", "13. Your Data Rights", "13. आपके डेटा संबंधी अधिकार"],
["master.text158", "14. Data Deletion", "14. डेटा हटाना"],
["master.text159", "15. Children's Privacy", "15. बच्चों की गोपनीयता"],
["master.text160", "16. International Data Processing", "16. अंतरराष्ट्रीय डेटा प्रोसेसिंग"],
["master.text161", "17. Security Incidents", "17. सुरक्षा संबंधी घटनाएं"],
["master.text162", "18. Indian Privacy Framework", "18. भारतीय गोपनीयता ढांचा"],
["master.text163", "19. Changes to This Policy", "19. इस नीति में बदलाव"],
["master.text164", "20. Privacy Contact and Grievances", "20. गोपनीयता संपर्क और शिकायतें"],
["master.text165", "Are my financial records uploaded to a server?", "क्या मेरे वित्तीय रिकॉर्ड सर्वर पर अपलोड होते हैं?"],
["master.text166", "Does the website save calculator inputs?", "क्या वेबसाइट कैलकुलेटर में दर्ज जानकारी सहेजती है?"],
["master.text167", "Will clearing website cache delete Android app records?", "क्या वेबसाइट का कैश साफ करने से Android ऐप के रिकॉर्ड मिट जाएंगे?"],
["master.text168", "Does APK checksum verification guarantee safety?", "क्या APK चेकसम सत्यापन सुरक्षा की गारंटी देता है?"],
["master.text169", "Can I use the website offline?", "क्या वेबसाइट ऑफलाइन इस्तेमाल कर सकते हैं?"],
["master.text170", "About Royal Khata", "Royal Khata के बारे में"],
["master.text171", "Digital Khata", "डिजिटल खाता"],
["master.text172", "PDF & Excel Export", "PDF और Excel में एक्सपोर्ट"],
["master.text173", "Royal Khata Download Pending", "Royal Khata डाउनलोड लंबित"],
["master.text174", "Who is Royal Khata designed for?", "Royal Khata किसके लिए बनाया जा रहा है?"],
["master.text175", "Will Royal Khata support offline management?", "क्या Royal Khata में ऑफलाइन प्रबंधन की सुविधा होगी?"],
["master.text176", "Will backup and restore be available?", "क्या बैकअप और डेटा वापस लाने की सुविधा होगी?"],
["master.text177", "Will Royal Khata have a recovery key?", "क्या Royal Khata में रिकवरी कुंजी होगी?"],
["master.text178", "What is the difference between Royal Khata and MeraHisab?", "Royal Khata और MeraHisab में क्या अंतर है?"],
["master.text179", "Where can I find official release information?", "आधिकारिक रिलीज की जानकारी कहां मिलेगी?"],
["master.text180", "Split", "अंतराल"],
["master.text181", "Total", "कुल"],
["master.text182", "Search Calculators", "कैलकुलेटर खोजें"],
["master.text183", "All Tools", "सभी उपकरण"],
["master.text184", "Loans", "ऋण"],
["master.text185", "Investments", "निवेश"],
["master.text186", "Tax & Shopping", "कर और खरीदारी"],
["master.text187", "Financial Planning", "वित्तीय योजना"],
["master.text188", "Reset All Calculators", "सभी कैलकुलेटर रीसेट करें"],
["master.text189", "It means that the requested website resource could not be found.", "इसका अर्थ है कि मांगा गया वेबसाइट संसाधन नहीं मिला।"],
["master.text190", "Not necessarily. A single page may be unavailable while other website pages continue to work. Try opening the homepage.", "जरूरी नहीं। कोई एक पेज अनुपलब्ध हो सकता है जबकि अन्य पेज काम करते रहें। मुख्य पेज खोलकर देखें।"],
["master.text191", "Displaying this website error does not itself delete native Android application records. Do not clear application storage without securing a backup.", "वेबसाइट पर यह त्रुटि दिखने से Android ऐप के रिकॉर्ड अपने आप नहीं मिटते। बैकअप सुरक्षित किए बिना ऐप का स्टोरेज साफ न करें।"],
["master.text192", "MeraHisab is a financial management project that includes a personal finance application and an official website with financial tools.", "MeraHisab एक वित्तीय प्रबंधन परियोजना है, जिसमें व्यक्तिगत वित्त ऐप और वित्तीय उपकरणों वाली आधिकारिक वेबसाइट शामिल है।"],
["master.text193", "Royal Khata is a digital ledger application project focused on credit, debit and business financial records.", "Royal Khata क्रेडिट, डेबिट और व्यावसायिक वित्तीय रिकॉर्ड पर केंद्रित डिजिटल खाता ऐप परियोजना है।"],
["master.text194", "No. They are separate application projects with different financial management objectives.", "नहीं। ये अलग-अलग वित्तीय प्रबंधन उद्देश्यों वाली स्वतंत्र ऐप परियोजनाएं हैं।"],
["master.text195", "MeraHisab focuses on personal income, expenses and savings. Royal Khata focuses on credit, debit and digital khata records.", "MeraHisab व्यक्तिगत आय, खर्च और बचत पर केंद्रित है। Royal Khata क्रेडिट, डेबिट और डिजिटल खाता रिकॉर्ड पर केंद्रित है।"],
["master.text196", "MeraHisab is designed specifically for personal finance management.", "MeraHisab विशेष रूप से व्यक्तिगत वित्त प्रबंधन के लिए बनाया गया है।"],
["master.text197", "Royal Khata is designed around digital khata and customer account management. Its official release is pending.", "Royal Khata डिजिटल खाता और ग्राहक खाते के प्रबंधन के लिए बनाया जा रहा है। इसकी आधिकारिक रिलीज लंबित है।"],
["master.text198", "Use the available support information on this page. Direct support email and ticket submission are pending configuration.", "इस पेज पर उपलब्ध सहायता जानकारी का उपयोग करें। सीधे सहायता ईमेल और टिकट भेजने की व्यवस्था अभी स्थापित नहीं हुई है।"],
["master.text199", "No. The request builder creates a local draft that you can copy or download.", "नहीं। अनुरोध उपकरण एक स्थानीय ड्राफ्ट बनाता है, जिसे आप कॉपी या डाउनलोड कर सकते हैं।"],
["master.text200", "Check your internet connection, available storage and browser download settings. Visit the APK Download page for guidance.", "इंटरनेट कनेक्शन, उपलब्ध स्टोरेज और ब्राउजर डाउनलोड सेटिंग जांचें। मार्गदर्शन के लिए APK डाउनलोड पेज देखें।"],
["master.text201", "Visit the MeraHisab download page through this official Download Center.", "इस आधिकारिक डाउनलोड केंद्र से MeraHisab के डाउनलोड पेज पर जाएं।"],
["master.text202", "Not yet. The official Royal Khata APK release is pending.", "अभी नहीं। Royal Khata की आधिकारिक APK रिलीज लंबित है।"],
["master.text203", "An APK is an Android application package used to distribute and install Android applications.", "APK एक Android ऐप पैकेज है, जिसका उपयोग Android ऐप वितरित और इंस्टॉल करने के लिए होता है।"],
["master.text204", "Check your internet connection, available device storage and browser download permissions. Open the Download Center and try again.", "इंटरनेट कनेक्शन, डिवाइस में उपलब्ध स्टोरेज और ब्राउजर की डाउनलोड अनुमतियां जांचें। डाउनलोड केंद्र खोलकर फिर प्रयास करें।"],
["master.text205", "Possible causes include Android compatibility, insufficient storage, an incomplete APK or a conflicting application signing certificate. Do not uninstall an existing application without securing its data first.", "संभावित कारणों में Android अनुकूलता, कम स्टोरेज, अधूरी APK या ऐप साइनिंग प्रमाणपत्र का मेल न खाना शामिल हैं। पहले डेटा सुरक्षित किए बिना मौजूदा ऐप न हटाएं।"],
["master.text206", "Do not install the selected file. Delete the mismatched download and download a fresh copy from the official website. If verification still fails, contact the website operator.", "चुनी हुई फाइल इंस्टॉल न करें। मेल न खाने वाली डाउनलोड फाइल हटाकर आधिकारिक वेबसाइट से नई कॉपी डाउनलोड करें। सत्यापन फिर भी असफल हो तो वेबसाइट संचालक से संपर्क करें।"],
["master.text207", "MeraHisab is a personal finance management application designed to organize income, expenses, savings and accounts.", "MeraHisab व्यक्तिगत वित्त प्रबंधन ऐप है, जिसे आय, खर्च, बचत और खातों को व्यवस्थित करने के लिए बनाया गया है।"],
["master.text208", "MeraHisab is distributed as an Android APK. Minimum supported Android version is pending verification.", "MeraHisab Android APK के रूप में वितरित होता है। न्यूनतम समर्थित Android संस्करण का सत्यापन लंबित है।"],
["master.text209", "The Android application is designed for offline financial tracking. Some website resources and application downloads may require an internet connection.", "Android ऐप ऑफलाइन वित्तीय हिसाब रखने के लिए बनाया गया है। वेबसाइट के कुछ संसाधनों और ऐप डाउनलोड के लिए इंटरनेट आवश्यक हो सकता है।"],
["master.text210", "The website calculator engine processes inputs locally. Native application data flows require separate verification.", "वेबसाइट का कैलकुलेटर दर्ज जानकारी को स्थानीय रूप से प्रोसेस करता है। मूल ऐप में डेटा के प्रवाह का अलग से सत्यापन आवश्यक है।"],
["master.text211", "The calculator engine does not intentionally persist entered amounts or calculation results. Browser behavior may vary according to browser settings.", "कैलकुलेटर जानबूझकर दर्ज राशियों या गणना के परिणामों को स्थायी रूप से नहीं सहेजता। ब्राउजर का व्यवहार उसकी सेटिंग के अनुसार बदल सकता है।"],
["master.text212", "Website preferences may use browser storage. Hosting or external services may have their own storage practices. A complete cookie audit is pending.", "वेबसाइट की प्राथमिकताएं ब्राउजर स्टोरेज का उपयोग कर सकती हैं। होस्टिंग या बाहरी सेवाओं के अपने स्टोरेज तरीके हो सकते हैं। कुकीज की पूरी जांच लंबित है।"],
["master.text213", "Royal Khata is a digital khata application designed around credit, debit and organized account management.", "Royal Khata क्रेडिट, डेबिट और व्यवस्थित खाता प्रबंधन के लिए बनाया जा रहा डिजिटल खाता ऐप है।"],
["master.text214", "Not yet. Official APK download information is pending.", "अभी नहीं। आधिकारिक APK डाउनलोड की जानकारी लंबित है।"],
["master.text215", "An official release date has not been announced.", "आधिकारिक रिलीज की तारीख घोषित नहीं हुई है।"],
["master.text216", "The calculators on this website can be used without a calculator subscription.", "इस वेबसाइट के कैलकुलेटर बिना कैलकुलेटर सदस्यता के इस्तेमाल किए जा सकते हैं।"],
["master.text217", "EMI means Equated Monthly Instalment. The EMI calculator estimates fixed monthly loan repayments using the reducing-balance interest formula.", "EMI का अर्थ समान मासिक किस्त है। EMI कैलकुलेटर घटती बकाया राशि पर ब्याज के सूत्र से निश्चित मासिक ऋण किस्त का अनुमान लगाता है।"],
["master.text218", "SIP means Systematic Investment Plan. The calculator estimates the future value of regular monthly investments using an assumed annual return. Actual market returns are not guaranteed.", "SIP का अर्थ व्यवस्थित निवेश योजना है। कैलकुलेटर अनुमानित वार्षिक रिटर्न के आधार पर नियमित मासिक निवेश के भविष्य के मूल्य का अनुमान लगाता है। वास्तविक बाजार रिटर्न की गारंटी नहीं है।"],



/* Additional exact text from current website pages */
["coverage.text001", "Find the Right Page", "सही पेज खोजें"],
["coverage.text002", "Frequently Asked Questions", "अक्सर पूछे जाने वाले प्रश्न"],
["coverage.text003", "Frequently Asked Questions.", "अक्सर पूछे जाने वाले प्रश्न।"],
["coverage.text004", "Continue Exploring MeraHisab", "MeraHisab के बारे में और जानें"],
["coverage.text005", "Our Mission & Vision", "हमारा मिशन और दृष्टिकोण"],
["coverage.text006", "Our Mission", "हमारा मिशन"],
["coverage.text007", "Our Vision", "हमारा दृष्टिकोण"],
["coverage.text008", "Our Applications", "हमारे ऐप्स"],
["coverage.text009", "Who Can Benefit?", "किसे लाभ मिल सकता है?"],
["coverage.text010", "Our Core Values", "हमारे मूल मूल्य"],
["coverage.text011", "Simplicity", "सरलता"],
["coverage.text012", "Continuous Improvement", "निरंतर सुधार"],
["coverage.text013", "The MeraHisab Website Ecosystem", "MeraHisab वेबसाइट की सेवाएं"],
["coverage.text014", "Application Center", "ऐप केंद्र"],
["coverage.text015", "Privacy & Data Protection", "गोपनीयता और डेटा सुरक्षा"],
["coverage.text016", "Privacy & Security Commitment", "गोपनीयता और सुरक्षा के प्रति प्रतिबद्धता"],
["coverage.text017", "Reliable Development", "विश्वसनीय विकास"],
["coverage.text018", "Clear Documentation", "स्पष्ट दस्तावेज़ीकरण"],
["coverage.text019", "Development Roadmap", "विकास की कार्ययोजना"],
["coverage.text020", "Website Foundation", "वेबसाइट की नींव"],
["coverage.text021", "Premium Website Experience", "प्रीमियम वेबसाइट अनुभव"],
["coverage.text022", "Progressive Web App Integration", "प्रोग्रेसिव वेब ऐप एकीकरण"],
["coverage.text023", "Security, Privacy & Accessibility", "सुरक्षा, गोपनीयता और सुगम्यता"],
["coverage.text024", "Royal Khata Development", "Royal Khata का विकास"],
["coverage.text025", "Comprehensive Testing", "व्यापक परीक्षण"],
["coverage.text026", "Future Improvements", "भविष्य के सुधार"],
["coverage.text027", "Official Brand Information", "आधिकारिक ब्रांड जानकारी"],
["coverage.text028", "Website Identity", "वेबसाइट की पहचान"],
["coverage.text029", "Application Identity", "ऐप की पहचान"],
["coverage.text030", "Important Financial Disclaimer", "महत्वपूर्ण वित्तीय अस्वीकरण"],
["coverage.text031", "Share MeraHisab", "MeraHisab साझा करें"],
["coverage.text032", "Organize Your Financial Journey", "अपनी वित्तीय यात्रा व्यवस्थित करें"],
["coverage.text033", "Meet Our Applications", "हमारे ऐप्स जानें"],
["coverage.text034", "Primary Purpose", "मुख्य उद्देश्य"],
["coverage.text035", "Planned Primary Purpose", "प्रस्तावित मुख्य उद्देश्य"],
["coverage.text036", "Detailed Feature Comparison", "सुविधाओं की विस्तृत तुलना"],
["coverage.text037", "Which Application Is Right for You?", "आपके लिए कौन सा ऐप सही है?"],
["coverage.text038", "Household Expenses", "घरेलू खर्च"],
["coverage.text039", "Personal Savings", "व्यक्तिगत बचत"],
["coverage.text040", "Salary & Income", "वेतन और आय"],
["coverage.text041", "Shopkeeper Khata", "दुकानदार का खाता"],
["coverage.text042", "Credit & Debit Records", "क्रेडिट और डेबिट रिकॉर्ड"],
["coverage.text043", "Choose Your Application", "अपना ऐप चुनें"],
["coverage.text044", "Contact & Support", "संपर्क और सहायता"],
["coverage.text045", "How Can We Help?", "हम आपकी कैसे सहायता कर सकते हैं?"],
["coverage.text046", "Application Support", "ऐप सहायता"],
["coverage.text047", "Report a Bug", "तकनीकी त्रुटि की रिपोर्ट करें"],
["coverage.text048", "Feature Suggestions", "सुविधाओं के सुझाव"],
["coverage.text049", "Security Reporting", "सुरक्षा समस्या की रिपोर्ट"],
["coverage.text050", "Official Support Information", "आधिकारिक सहायता जानकारी"],
["coverage.text051", "Support Request Status", "सहायता अनुरोध की स्थिति"],
["coverage.text052", "Prepare a Support Request", "सहायता अनुरोध तैयार करें"],
["coverage.text053", "Download Our Applications", "हमारे ऐप्स डाउनलोड करें"],
["coverage.text054", "Download Safety & Security", "डाउनलोड की सुरक्षा"],
["coverage.text055", "Official Download Source", "आधिकारिक डाउनलोड स्रोत"],
["coverage.text056", "APK Integrity Verification", "APK की अखंडता की जांच"],
["coverage.text057", "Backup Before Updating", "अपडेट से पहले बैकअप लें"],
["coverage.text058", "Review App Permissions", "ऐप की अनुमतियां जांचें"],
["coverage.text059", "Security Warnings", "सुरक्षा चेतावनियां"],
["coverage.text060", "APK SHA-256 Verification Tool", "APK SHA-256 जांच उपकरण"],
["coverage.text061", "Local File Integrity Checker", "स्थानीय फाइल अखंडता जांच"],
["coverage.text062", "Android Installation Guide", "Android इंस्टॉलेशन गाइड"],
["coverage.text063", "Updating Your Application", "अपने ऐप को अपडेट करना"],
["coverage.text064", "Before Updating", "अपडेट से पहले"],
["coverage.text065", "After Updating", "अपडेट के बाद"],
["coverage.text066", "Application Release Information", "ऐप रिलीज की जानकारी"],
["coverage.text067", "MeraHisab Release Details", "MeraHisab रिलीज विवरण"],
["coverage.text068", "Royal Khata Release Details", "Royal Khata रिलीज विवरण"],
["coverage.text069", "Install the MeraHisab Website", "MeraHisab वेबसाइट इंस्टॉल करें"],
["coverage.text070", "Useful Resources", "उपयोगी संसाधन"],
["coverage.text071", "Download MeraHisab", "MeraHisab डाउनलोड करें"],
["coverage.text072", "Download Information", "डाउनलोड जानकारी"],
["coverage.text073", "Android Application", "Android ऐप"],
["coverage.text074", "File Integrity", "फाइल की अखंडता"],
["coverage.text075", "Direct Download", "सीधा डाउनलोड"],
["coverage.text076", "Application File Details", "ऐप फाइल का विवरण"],
["coverage.text077", "APK File Integrity Verification", "APK फाइल की अखंडता जांच"],
["coverage.text078", "Verify Your Downloaded APK", "डाउनलोड किए गए APK की जांच करें"],
["coverage.text079", "Calculated SHA-256", "गणना किया गया SHA-256"],
["coverage.text080", "How to Install MeraHisab", "MeraHisab कैसे इंस्टॉल करें"],
["coverage.text081", "Download the APK", "APK डाउनलोड करें"],
["coverage.text082", "Verify the Download", "डाउनलोड की जांच करें"],
["coverage.text083", "Open the Downloaded File", "डाउनलोड की गई फाइल खोलें"],
["coverage.text084", "Review Installation Permission", "इंस्टॉलेशन अनुमति जांचें"],
["coverage.text085", "Complete Installation", "इंस्टॉलेशन पूरा करें"],
["coverage.text086", "Restore Installation Protection", "इंस्टॉलेशन सुरक्षा पुनः सक्रिय करें"],
["coverage.text087", "Application Updates & Data Protection", "ऐप अपडेट और डेटा सुरक्षा"],
["coverage.text088", "Installation Troubleshooting", "इंस्टॉलेशन समस्याओं का समाधान"],
["coverage.text089", "APK download is not starting", "APK डाउनलोड शुरू नहीं हो रहा है"],
["coverage.text090", "Application not installed", "ऐप इंस्टॉल नहीं हुआ"],
["coverage.text091", "APK checksum does not match", "APK चेकसम मेल नहीं खाता"],
["coverage.text092", "Android displays a security warning", "Android सुरक्षा चेतावनी दिखाता है"],
["coverage.text093", "Application update fails", "ऐप अपडेट विफल हो रहा है"],
["coverage.text094", "Ready to Download?", "डाउनलोड के लिए तैयार हैं?"],
["coverage.text095", "Time at Your Fingertips", "समय की जानकारी आपकी उंगलियों पर"],
["coverage.text096", "Take Control of Your Money. Own Your Future.", "अपने पैसे पर नियंत्रण रखें। अपना भविष्य संवारें।"],
["coverage.text097", "Smart Applications. Better Financial Management.", "स्मार्ट ऐप्स। बेहतर वित्तीय प्रबंधन।"],
["coverage.text098", "Everything You Need. One Place.", "आपकी सभी जरूरतें। एक ही जगह।"],
["coverage.text099", "Income & Expense Tracking", "आय और खर्च का हिसाब"],
["coverage.text100", "Multiple Accounts", "एकाधिक खाते"],
["coverage.text101", "Smart Reports", "स्मार्ट रिपोर्ट"],
["coverage.text102", "Smart Search & Filters", "स्मार्ट खोज और फिल्टर"],
["coverage.text103", "Notes & Task Planning", "नोट्स और कार्य योजना"],
["coverage.text104", "Monthly Balance Carry Forward", "मासिक शेष आगे ले जाना"],
["coverage.text105", "PDF & Excel Reports", "PDF और Excel रिपोर्ट"],
["coverage.text106", "Time Management Tools", "समय प्रबंधन उपकरण"],
["coverage.text107", "Installable Website", "इंस्टॉल की जा सकने वाली वेबसाइट"],
["coverage.text108", "Offline Website Support", "ऑफलाइन वेबसाइट सुविधा"],
["coverage.text109", "Your Money. Your Data. Your Control.", "आपका पैसा। आपका डेटा। आपका नियंत्रण।"],
["coverage.text110", "A Smarter Way to Manage Money.", "पैसे का हिसाब रखने का बेहतर तरीका।"],
["coverage.text111", "Make Every Rupee Count.", "हर रुपये का हिसाब रखें।"],
["coverage.text112", "Help & Information", "सहायता और जानकारी"],
["coverage.text113", "Personal Finance, Simplified.", "व्यक्तिगत वित्त, सरल तरीके से।"],
["coverage.text114", "Application Dashboard", "ऐप डैशबोर्ड"],
["coverage.text115", "Powerful Features", "उपयोगी सुविधाएं"],
["coverage.text116", "Income Management", "आय प्रबंधन"],
["coverage.text117", "Expense Management", "खर्च प्रबंधन"],
["coverage.text118", "Savings Management", "बचत प्रबंधन"],
["coverage.text119", "Balance Management", "शेष राशि प्रबंधन"],
["coverage.text120", "Notes & Tasks", "नोट्स और कार्य"],
["coverage.text121", "Report Export", "रिपोर्ट एक्सपोर्ट"],
["coverage.text122", "Privacy-Focused Design", "गोपनीयता केंद्रित डिजाइन"],
["coverage.text123", "Offline Application Design", "ऑफलाइन ऐप डिजाइन"],
["coverage.text124", "Download & Installation Guide", "डाउनलोड और इंस्टॉलेशन गाइड"],
["coverage.text125", "Your Financial Data", "आपका वित्तीय डेटा"],
["coverage.text126", "Backup Responsibility", "बैकअप की जिम्मेदारी"],
["coverage.text127", "Explore More", "और जानें"],
["coverage.text128", "Connection Unavailable", "कनेक्शन उपलब्ध नहीं है"],
["coverage.text129", "Connection & Offline Diagnostics", "कनेक्शन और ऑफलाइन जांच"],
["coverage.text130", "How to Restore Your Connection", "कनेक्शन कैसे बहाल करें"],
["coverage.text131", "01. Check Internet", "01. इंटरनेट जांचें"],
["coverage.text132", "02. Check Network Signal", "02. नेटवर्क सिग्नल जांचें"],
["coverage.text133", "03. Check Website Access", "03. वेबसाइट की उपलब्धता जांचें"],
["coverage.text134", "04. Retry Connection", "04. कनेक्शन का पुनः प्रयास करें"],
["coverage.text135", "Offline Privacy & Security", "ऑफलाइन गोपनीयता और सुरक्षा"],
["coverage.text136", "Stay Connected with MeraHisab", "MeraHisab से जुड़े रहें"],
["coverage.text137", "Financial Privacy", "वित्तीय गोपनीयता"],
["coverage.text138", "Local Website Calculations", "वेबसाइट पर स्थानीय गणनाएं"],
["coverage.text139", "Backup Awareness", "बैकअप जागरूकता"],
["coverage.text140", "User Controls", "उपयोगकर्ता नियंत्रण"],
["coverage.text141", "Policy Contents", "नीति की विषय सूची"],
["coverage.text142", "Privacy & Browser Diagnostics", "गोपनीयता और ब्राउजर जांच"],
["coverage.text143", "Browser Security Information", "ब्राउजर सुरक्षा जानकारी"],
["coverage.text144", "Website Storage Information", "वेबसाइट स्टोरेज जानकारी"],
["coverage.text145", "Recommended Privacy Practices", "अनुशंसित गोपनीयता उपाय"],
["coverage.text146", "Protect Your Device", "अपने डिवाइस को सुरक्षित रखें"],
["coverage.text147", "Protect Your Credentials", "अपनी लॉगिन जानकारी सुरक्षित रखें"],
["coverage.text148", "Protect Your Financial Records", "अपने वित्तीय रिकॉर्ड सुरक्षित रखें"],
["coverage.text149", "Browse Safely", "सुरक्षित ब्राउजिंग करें"],
["coverage.text150", "Privacy Frequently Asked Questions", "गोपनीयता से जुड़े सामान्य प्रश्न"],
["coverage.text151", "Privacy Questions & Support", "गोपनीयता प्रश्न और सहायता"],
["coverage.text152", "Smart Digital Khata Management", "स्मार्ट डिजिटल खाता प्रबंधन"],
["coverage.text153", "Dashboard Concept Preview", "प्रस्तावित डैशबोर्ड का पूर्वावलोकन"],
["coverage.text154", "Planned Application Features", "ऐप की प्रस्तावित सुविधाएं"],
["coverage.text155", "Credit Management", "क्रेडिट प्रबंधन"],
["coverage.text156", "Debit Management", "डेबिट प्रबंधन"],
["coverage.text157", "Reports & Statements", "रिपोर्ट और विवरण"],
["coverage.text158", "Offline Management", "ऑफलाइन प्रबंधन"],
["coverage.text159", "Premium Themes", "प्रीमियम थीम"],
["coverage.text160", "Notes & References", "नोट्स और संदर्भ"],
["coverage.text161", "Privacy, Security & Data Protection", "गोपनीयता, सुरक्षा और डेटा संरक्षण"],
["coverage.text162", "Privacy-Focused Development", "गोपनीयता केंद्रित विकास"],
["coverage.text163", "Backup & Recovery Planning", "बैकअप और रिकवरी की योजना"],
["coverage.text164", "Recovery Key Protection", "रिकवरी की की सुरक्षा"],
["coverage.text165", "Application Development Roadmap", "ऐप विकास की कार्ययोजना"],
["coverage.text166", "Planning & Application Design", "योजना और ऐप डिजाइन"],
["coverage.text167", "Core Application Development", "मुख्य ऐप विकास"],
["coverage.text168", "Security & Backup Development", "सुरक्षा और बैकअप का विकास"],
["coverage.text169", "Complete Application Testing", "ऐप का पूर्ण परीक्षण"],
["coverage.text170", "Official APK Release", "आधिकारिक APK रिलीज"],
["coverage.text171", "Royal Khata Download", "Royal Khata डाउनलोड"],
["coverage.text172", "Financial Calculators & Smart Tools", "वित्तीय कैलकुलेटर और स्मार्ट उपकरण"],
["coverage.text173", "Time & Productivity Tools", "समय और उत्पादकता उपकरण"],
["coverage.text174", "Indian Standard Time", "भारतीय मानक समय"],
["coverage.text175", "Privacy & Calculation Information", "गोपनीयता और गणना जानकारी"],
["coverage.text176", "Local Calculations", "स्थानीय गणनाएं"],
["coverage.text177", "No Saved Financial Inputs", "वित्तीय इनपुट सहेजे नहीं जाते"],
["coverage.text178", "Responsive Tools", "स्क्रीन के अनुकूल उपकरण"],
["coverage.text179", "Explore MeraHisab Applications", "MeraHisab के ऐप्स देखें"],
["coverage.text180", "What is MeraHisab?", "MeraHisab क्या है?"],
["coverage.text181", "What is Royal Khata?", "Royal Khata क्या है?"],
["coverage.text182", "Is Royal Khata available for download?", "क्या Royal Khata डाउनलोड के लिए उपलब्ध है?"],
["coverage.text183", "Where can I download MeraHisab?", "मैं MeraHisab कहां से डाउनलोड कर सकता हूं?"],
["coverage.text184", "What is an APK file?", "APK फाइल क्या है?"],
["coverage.text185", "What is SHA-256?", "SHA-256 क्या है?"],
["coverage.text186", "Does a matching checksum guarantee safety?", "क्या मेल खाता चेकसम सुरक्षा की गारंटी देता है?"],
["coverage.text187", "Can I install the website on my phone?", "क्या मैं अपने फोन पर वेबसाइट इंस्टॉल कर सकता हूं?"],
["coverage.text188", "Can the website work offline?", "क्या वेबसाइट ऑफलाइन काम कर सकती है?"],
["coverage.text189", "Is website installation the same as APK installation?", "क्या वेबसाइट इंस्टॉलेशन और APK इंस्टॉलेशन एक ही हैं?"],
["coverage.text190", "Are these calculators free?", "क्या ये कैलकुलेटर मुफ्त हैं?"],
["coverage.text191", "What is EMI?", "EMI क्या है?"],
["coverage.text192", "What is SIP?", "SIP क्या है?"],
["coverage.text193", "What is the difference between FD and RD?", "FD और RD में क्या अंतर है?"],
["coverage.text194", "Can I calculate GST?", "क्या मैं GST की गणना कर सकता हूं?"],
["coverage.text195", "Are investment returns guaranteed?", "क्या निवेश रिटर्न की गारंटी है?"],
["coverage.text196", "Does the calculator save my financial details?", "क्या कैलकुलेटर मेरी वित्तीय जानकारी सहेजता है?"],
["coverage.text197", "Can I use the tools without internet?", "क्या मैं इंटरनेट के बिना उपकरण इस्तेमाल कर सकता हूं?"],
["coverage.text198", "Can I save calculator results as PDF?", "क्या मैं गणना परिणाम PDF में सहेज सकता हूं?"],
["coverage.text199", "Is the IST clock synchronized with an official time server?", "क्या IST घड़ी आधिकारिक समय सर्वर से सिंक्रोनाइज है?"],
["coverage.text200", "Does the website use cookies?", "क्या वेबसाइट कुकीज इस्तेमाल करती है?"],
["coverage.text201", "Are application records encrypted?", "क्या ऐप रिकॉर्ड एन्क्रिप्टेड हैं?"],
["coverage.text202", "Can I clear website storage?", "क्या मैं वेबसाइट स्टोरेज साफ कर सकता हूं?"],
["coverage.text203", "Can I request deletion of personal data?", "क्या मैं व्यक्तिगत डेटा हटाने का अनुरोध कर सकता हूं?"],
["coverage.text204", "How can I report a privacy issue?", "मैं गोपनीयता समस्या की रिपोर्ट कैसे कर सकता हूं?"],
["coverage.text205", "Does generating a request submit a ticket?", "क्या अनुरोध तैयार करने से टिकट जमा हो जाता है?"],
["coverage.text206", "Does this page save my support information?", "क्या यह पेज मेरी सहायता जानकारी सहेजता है?"],
["coverage.text207", "What is the official release date?", "आधिकारिक रिलीज की तारीख क्या है?"],
["coverage.text208", "Is the dashboard preview real?", "क्या डैशबोर्ड का पूर्वावलोकन वास्तविक है?"],


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
    key.length > 128 ||
    !/^[a-zA-Z0-9_.-]+$/.test(key) ||
    key.split(/[.-]/).some(part => ["__proto__", "constructor", "prototype"].includes(part)) ||
    typeof en !== "string" ||
    typeof hi !== "string" ||
    !en.trim() ||
    !hi.trim() ||
    en.length > 20000 || hi.length > 20000
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
let registeredEngine = null;

function registerTranslations() {

  const engine = window.MeraHisabLanguage;

  if (registered && engine === registeredEngine) {
    return true;
  }

  registered = false;

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
  registeredEngine = engine;

  if (typeof engine.apply === "function") {

    engine.apply(document);

  }

  window.dispatchEvent(

    new CustomEvent(

      "merahisab:languagecontentready",

      {

        detail: {

          version: "2.0.0",

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

    version: "2.0.0",

    register: registerTranslations,

    getStatus: function () {

      return {

        version: "2.0.0",

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
