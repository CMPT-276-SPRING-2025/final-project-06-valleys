<h1 align="left">
  <img src="shield.svg" alt="Shield Icon" width="32" style="vertical-align: middle; margin-right: 10px;" />
  Deep Phishing – 06 Valleys
</h1>

A web application created to educate users about phishing scams, their consequences, and how to prevent falling victim to these potential scams. By providing features that allow people to upload files or documents to see potential red flags and learn more about these red flags. By giving people the knowledge of potential phishing scams they will be able to identify whether or not something sent directly towards them is a phishing scheme to be able to provide their knowledge to others to prevent phishing eventually. 

---

## Project Links
- **Website:** [deep-phishing.vercel.app](https://deep-phishing.vercel.app/)
- **Figma Design:** [Figma Mockup](https://www.figma.com/design/y4kHVPOzWIWg3aWcmWZJC6/CMPT-276---06-Valleys?node-id=2-4&p=f&t=PgEmEwuBzdfAKXPk-0)
- **Demo Video:** [YT Demo Video](https://www.youtube.com/watch?v=51Vm4dMfB8s)

---

## Features
- **URL Scanner Tool**: This tool checks for malicious links. Users enter a URL and press 'Scan', and our system analyzes the link using API integration to detect potential threats.
- **IP Scanner Tool**: This tool checks for malicious IP addresses. Users enter an IP and press 'Scan', and our system analyzes the link using API integration to detect potential threats on a selected IP address.
- **File Scanner Tool**: This tool analyzes suspicious files. Users can upload a file in the provided area, and our system scans it for threats, notifying them of any risks.
- **Phishing Email Generator**: This tool creates realistic phishing emails for security training. Users select a template and provide a recipient email before sending the simulated phishing email. A preview is also available so users can review the email before sending it.
- **Email Analysis Tool**: This tool scans emails for potential phishing indicators. Users can either paste email content into the text box or upload an email file, and our system will analyze it for risks using API integration.
- **Phishing Email Quiz**: This page is designed to educate users on phishing threats, this AI-powered quiz presents two emails side by side, and users must identify which one is a phishing attempt. This helps them learn the key differences between real and fraudulent emails.
---

## Tech Stack
- **Frontend**: Next.js 15, React 19, TailwindCSS
- **UI Components**: shadcn/ui
- **API Integration**: VirusTotal API, OpenAI API
- **Code Quality**: ESLint, Prettier
- **Testing**: Playwright

---

## Getting Started – Local Deployment Instructions

Follow these steps to run the project locally on your machine.

### 1. **Prerequisites**

Make sure the following are installed:

- [Node.js](https://nodejs.org/en) (version **20** or higher)
- `npm` or `yarn`
- **[VirusTotal API Key](https://www.virustotal.com/gui/home/upload)**
- **[OpenAI API Key](https://platform.openai.com/api-keys)**

### 2. Clone the Repository
```sh
git clone git@github.com:CMPT-276-SPRING-2025/final-project-06-valleys.git
```
**Navigate to the root directory**
```sh
cd final-project-06-valleys/src
```

### 3. Install Dependencies
**Using npm:**
```sh
npm install
```

**Or using yarn:**
```sh
yarn install
```

### 4. Set Up Environment Variables

**Create a `.env` file in the root directory and add the following:**
```env
VIRUSTOTAL_API_KEY=your_virustotal_api_key
OPENAI_API_KEY=your_openai_api_key
```
**Replace** `your_virustotal_api_key` **and** `your_openai_api_key` **with your actual API keys.**

### 5. Run the Development Server
**Using npm:**
```sh
npm run dev
```
**Or using yarn:**
```sh
yarn dev
```

**Then open your browser and go to:**
```
http://localhost:3000
```

### 6. Run Tests (Optional)
**To run tests with Playwright, open another terminal:**
```sh
npm run test
```

## File Structure
src/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── openai/             # OpenAI API integration endpoints
│   │   └── virustotal/         # VirusTotal API integration endpoints
│   ├── components/           # Reusable UI components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── Scanner/          # Scanner components
│   ├── lib/                  # Utility functions and helpers
│   │   └── utils/            # General utility functions
│   ├── email-analysis/       # Email analysis tool page
│   ├── email-generator/      # Phishing email generator page
│   ├── scan/                 # Scanner tools directory
│   │   ├── file/            # File scanning functionality
│   │   ├── ip/              # IP address scanning functionality 
│   │   ├── url/             # URL scanning functionality
│   ├── quiz/                 # Phishing email quiz page
│   ├── url-scanner/          # URL scanner tool page
│   ├── page.jsx              # Home page
│   ├── layout.jsx            # Root layout
│   └── globals.css           # Global styles
├── public/                   # Static assets
├── tests/                    # Playwright tests
├── .env                      # Environment variables
├── .eslintrc.json           # ESLint configuration
├── eslint.config.mjs        # ESLint flat config
├── next.config.mjs          # Next.js configuration
├── package.json             # Project dependencies
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration

## License & Usage

This project is licensed under the **MIT license** and is intended strictly for **educational and training purposes**. The email generator must not be used for real phishing attempts. Always conduct testing responsibly and with informed consent.
