# Deep Phishing - 06 Valleys
A web application created to educate users about phishing scams, their consequences, and how to prevent falling victim to these potential scams. By providing features that allow people to upload files or documents to see potential red flags and learn more about these red flags. By giving people the knowledge of potential phishing scams they will be able to identify whether or not something sent directly towards them is a phishing scheme to be able to eventually provide their knowledge to others to prevent phishing. 

## Features
- **URL Scanner Tool**: This tool checks for malicious links. Users enter a URL and press 'Scan', and our system analyzes the link using API integration to detect potential threats.
- **IP Scanner Tool**: This tool checks for malicious IP addresses. Users enter a IP and press 'Scan', and our system analyzes the link using API integration to detect potential threats on a selected IP address.
- **File Scanner Tool**: This tool analyzes suspicious files. Users can upload a file in the provided area, and our system scans it for threats, notifying them of any risks.
- **Phishing Email Generator**: This tool creates realistic phishing emails for security training. Users select a template and provide a recipient email before sending the simulated phishing email. A preview is also available so users can review the email before sending it.
- **Email Analysis Tool**: This tool scans emails for potential phishing indicators. Users can either paste email content into the text box or upload an email file, and our system will analyze it for risks using API integration.
- **Phishing Email Quiz**: This page is designed to educate users on phishing threats, this AI-powered quiz presents two emails side by side, and users must identify which one is a phishing attempt. This helps them learn key differences between real and fraudulent emails.

## Tech Stack
- **Frontend**: Next.js 15, React 19, TailwindCSS
- **UI Components**: shadcn/ui
- **API Integration**: VirusTotal API, OpenAI API
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest


## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn
- VirusTotal API key
- OpenAI API key
