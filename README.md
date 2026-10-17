# 🌐 Interactive Personal Portfolio & CV Website

A modern, fast, and fully customizable personal portfolio and CV website designed with an Apple-inspired bento grid aesthetic.

This project is built to be **100% reusable and modular**. You do **not** need any coding knowledge to configure this website for yourself or a friend: **simply edit `public/data.json`**, and all cards, counters, text, skills, experiences, and languages will update automatically!

---

## 📋 Table of Contents

1. [Quick Overview for Beginners](#-quick-overview-for-beginners)
2. [Step 1: Install Node.js](#-step-1-install-nodejs)
   - [Windows Setup](#option-a-windows-installation)
   - [macOS Setup](#option-b-macos-installation)
3. [Step 2: Open the Project in Terminal](#-step-2-open-the-project-in-terminal)
4. [Step 3: Install Packages (`npm install`)](#-step-3-install-packages)
5. [Step 4: Start the Live Dev Server (`npm run dev`)](#-step-4-start-the-live-dev-server)
6. [Step 5: Customize Your Portfolio (`data.json`)](#-step-5-customize-your-portfolio)
7. [Step 6: Multi-Language Setup](#-step-6-multi-language-setup)
8. [Step 7: Build for Production (`npm run build`)](#-step-7-build-for-production)
9. [Step 8: Deploy Your Website for Free](#-step-8-deploy-your-website-for-free)
10. [Troubleshooting & FAQ](#-troubleshooting--faq)

---

## 💡 Quick Overview for Beginners

Here is how this website works in 3 simple steps:
1. **Node.js** runs behind the scenes on your computer to bundle and serve the website.
2. You open the website in your browser (e.g. at `http://localhost:5173/`).
3. You open `public/data.json` in any text editor (like Notepad, TextEdit, or VS Code), change your name, job title, experiences, and links, and save. The browser will update **instantly** without reloading!

---

## 💻 Step 1: Install Node.js

Node.js is the free software required to run this project. You only need to install it once.

### Option A: Windows Installation

1. Go to the official Node.js website: [https://nodejs.org](https://nodejs.org).
2. Click the green button labeled **"LTS (Recommended for Most Users)"** to download the Windows installer (`.msi` file).
3. Once downloaded, double-click the file to open the setup wizard.
4. Follow the setup prompts:
   - Click **Next** on the Welcome screen.
   - Check **"I accept the terms in the License Agreement"** and click **Next**.
   - Leave the default installation folder unchanged and click **Next**.
   - On the Custom Setup screen, leave everything as default and click **Next**.
   - When asked about "Tools for Native Modules", you can leave the checkbox **unchecked** and click **Next**.
   - Click **Install**. (If Windows asks for administrator permission with a prompt saying "Do you want to allow this app to make changes to your device?", click **Yes**).
   - Click **Finish** when installation completes.
5. **Verify the installation**:
   - Press the Windows Key on your keyboard, type **cmd** or **PowerShell**, and press **Enter**.
   - In the black or blue terminal window that appears, type:
     ```bash
     node -v
     ```
   - Press **Enter**. You should see a version number like `v20.x.x` or `v22.x.x`.
   - Next, type:
     ```bash
     npm -v
     ```
   - Press **Enter**. You should see a version number like `10.x.x`.
   - If you see these version numbers, Node.js is ready!

---

### Option B: macOS Installation

#### Method 1: Graphical Installer (Recommended for Beginners)
1. Go to the official Node.js website: [https://nodejs.org](https://nodejs.org).
2. Click the green button labeled **"LTS (Recommended for Most Users)"** to download the macOS installer (`.pkg` file).
3. Once downloaded, open your **Downloads** folder and double-click the `.pkg` file.
4. Follow the installation wizard:
   - Click **Continue** on the Introduction and License screens.
   - Click **Agree** to accept the software license.
   - Click **Install**.
   - When prompted, enter your Mac's password or use Touch ID to authorize the installation.
   - Click **Close** when the installation succeeds.

#### Method 2: Using Homebrew (If you already have Homebrew)
If you already use Homebrew on your Mac, open the **Terminal** app and run:
```bash
brew install node
```

#### Verify macOS Installation:
1. Open the **Terminal** app (Press `Cmd + Space` to open Spotlight, type `Terminal`, and press `Enter`).
2. Type:
   ```bash
   node -v
   ```
   Press `Return`. You should see a version number like `v20.x.x` or `v22.x.x`.
3. Type:
   ```bash
   npm -v
   ```
   Press `Return`. You should see a version number like `10.x.x`.

---

## 📂 Step 2: Open the Project in Terminal

You need to tell the Terminal to look inside your portfolio project folder.

### On Windows:
1. Open the folder where this project is located in File Explorer (e.g. `cv-static`).
2. Click on the address bar at the top of File Explorer (where it shows the folder path).
3. Type `cmd` or `powershell` directly into the address bar and press `Enter`.
4. A terminal window will open up already inside your project folder!

*Alternatively:*
- Open Command Prompt or PowerShell, type `cd ` (with a space after `cd`), drag the project folder from File Explorer into the terminal window, and press `Enter`.

### On macOS:
1. Open **Finder** and navigate to where the project folder (e.g. `cv-static`) is located.
2. Right-click (or two-finger tap) on the project folder.
3. Select **"New Terminal at Folder"** (or **Services** > **"New Terminal at Folder"**).

*Alternatively:*
- Open the **Terminal** app, type `cd ` (with a space after `cd`), drag the project folder from Finder into the Terminal window, and press `Return`.

You are now in the project directory!

---

## 📦 Step 3: Install Packages

Before running the website for the first time, download the project's dependencies:

In your open terminal window, type:
```bash
npm install
```
Press `Enter` (or `Return` on Mac).

### What to expect:
- You will see a progress bar and various package names downloading.
- This usually takes between 10 to 60 seconds depending on your internet connection.
- When finished, a new folder named `node_modules` will be created in your project folder.
- You can safely ignore any notices about "packages looking for funding" or "npm audit". As long as there is no red `npm ERR!`, the installation was successful!

---

## 🚀 Step 4: Start the Live Dev Server

To preview and work on your website locally:

In your terminal, run:
```bash
npm run dev
```

### What happens next:
The terminal will display output similar to:
```text
  VITE v5.4.21  ready in 180 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

1. Hold `Ctrl` (or `Cmd` on Mac) and click the link `http://localhost:5173/`, or open your web browser (Chrome, Safari, Edge, Firefox) and type `http://localhost:5173/` in the address bar.
2. **Your portfolio website is now live on your computer!**
3. While the dev server is running, any edits you make to `public/data.json` will instantly update on your screen in real time without having to refresh the page.

### How to Stop the Dev Server:
When you are done working:
- Go to the terminal window where the server is running.
- Press `Ctrl + C` (on both Windows and Mac).
- If prompted `Terminate batch job (Y/N)?` on Windows, type `y` and press `Enter`.

---

## 🎨 Step 5: Customize Your Portfolio

All website content is managed in **one single file**:
```text
public/data.json
```

Open `public/data.json` in your favorite text editor (e.g. VS Code, Notepad, TextEdit, Sublime Text).

### Key Sections to Update:

#### 1. Personal Information (`personal`):
```json
"personal": {
  "firstName": "Alex",
  "lastName": "Morgan",
  "pageTitle": "Alex Morgan",
  "title": "Senior Product Designer",
  "heroTitleLine1": "Digital Experiences.",
  "heroTitleLine2": "Crafted with passion.",
  "location": "London, UK",
  "phone": "+44 20 7946 0991",
  "email": "alex.morgan@example.com",
  "bio": "I am a Product Designer with 5+ years of experience building accessible digital products...",
  "profileImage": "assets/img/profile.jpg",
  "favicon": "assets/img/favicon.ico"
}
```

#### 2. Resume / CV PDF Files (`resumeDownloads`):
Place your resume PDF inside `public/assets/`, then reference it here:
```json
"resumeDownloads": [
  {
    "lang": "en",
    "label": "English CV",
    "url": "assets/My_Resume.pdf"
  }
]
```
*(If you only have one resume file, just leave one item in this list. The website will automatically remove language dropdowns and display a single clean download button).*

#### 3. Social Links (`socialLinks`):
```json
"socialLinks": [
  {
    "platform": "LinkedIn",
    "url": "https://linkedin.com/in/yourprofile",
    "icon": "fab fa-linkedin-in"
  },
  {
    "platform": "GitHub",
    "url": "https://github.com/yourusername",
    "icon": "fab fa-github"
  }
]
```
*(Icons use FontAwesome classes, e.g. `fab fa-linkedin-in`, `fab fa-github`, `fab fa-twitter`, `fab fa-instagram`, etc.)*

#### 4. Career Experience Counter (`experienceCounter`):
```json
"experienceCounter": {
  "enabled": true,
  "title": "Total Experience as a Product Designer",
  "startDate": "2021-01-01T00:00:00",
  "description": "Continuously designing and shipping user-centered applications."
}
```
*(The counter dynamically counts years, months, days, hours, and seconds from `startDate` to right now!)*

#### 5. Featured Metric / Highlight Card (`highlightCard`):
```json
"highlightCard": {
  "enabled": true,
  "badge": "Design System & Impact",
  "value": "2.4M",
  "unit": "Active Users",
  "description": "Led the end-to-end design system overhaul, reducing design debt by 40%.",
  "cta": "Click to inspect design case studies"
}
```
*(If you do not want this second card, simply set `"enabled": false` or delete the `highlightCard` section. The live counter card will automatically expand to full width).*

#### 6. Career Experiences (`experiences`):
Add as many jobs as you like. The layout automatically adapts:
```json
"experiences": [
  {
    "role": "Lead Product Designer",
    "company": "Acme Corp",
    "companyUrl": "https://acme.example.com",
    "period": "Jan 2024 - Present",
    "tags": ["Figma", "Design Systems", "User Research", "Prototyping"],
    "highlights": [
      "Designed and launched the core enterprise dashboard.",
      "Conducted weekly user interviews and usability tests.",
      "Collaborated closely with front-end engineers."
    ]
  }
]
```

#### 7. Education & Certifications (`education`):
```json
"education": [
  {
    "institution": "University of Design",
    "institutionUrl": "https://example.edu",
    "program": "B.Sc. in Human-Computer Interaction",
    "period": "2017 - 2021",
    "gpa": {
      "text": "GPA: 3.9/4.0",
      "url": "assets/Diploma.pdf"
    },
    "highlights": [
      "Concentration in Interaction Design and Cognitive Psychology.",
      "Graduated with First Class Honors."
    ]
  }
]
```

#### 8. Skills Matrix (`skills`):
Add any categories and items. The tabs and bento grid layout adjust automatically:
```json
"skills": [
  {
    "category": "Design Tools",
    "items": [
      { "icon": "fab fa-figma", "text": "Figma & FigJam" },
      { "icon": "fas fa-pen-nib", "text": "Adobe Creative Suite" }
    ]
  },
  {
    "category": "Languages",
    "items": [
      { "icon": "fas fa-battery-full", "text": "English", "proficiency": 100 },
      { "icon": "fas fa-battery-three-quarters", "text": "Spanish", "proficiency": 75 }
    ]
  }
]
```

#### 9. Adding Your Photos & Files:
- Profile photo: place your photo in `public/assets/img/profile.jpg` (or change `"profileImage"` in `data.json` to any path or image URL).
- Favicon: place in `public/assets/img/favicon.ico`.
- Resume PDF: place in `public/assets/` and update `"url"` in `data.json`.

---

## 🌍 Step 6: Multi-Language Setup

The website is 100% modular and **automatically detects which language files exist** in the `public/` folder.

### How Language Buttons Work Automatically:
- **Only 1 language available** (e.g., only `public/data.json` exists):
  - **0 buttons are shown** — the language switcher in the navbar is completely hidden.
- **2 languages available** (e.g., `data.json` and `data.es.json` exist):
  - **2 buttons are shown** (`EN` and `ES`).
- **3 languages available** (e.g., `data.json`, `data.it.json`, and `data.es.json` exist):
  - **3 buttons are shown** (`EN`, `IT`, and `ES`).
- **Adding new languages**:
  - Simply place a `data.<lang>.json` file in `public/` (e.g., `data.fr.json` for French, `data.de.json` for German). The website dynamically checks whether the file exists and automatically adds the button!
- **Removing a language**:
  - Simply delete or rename the file (e.g. delete `data.it.json`). The website will automatically update and remove the button — **no error, no crash, no broken pages**!

### Optional: Defining Languages in `data.json`
You can also explicitly define custom labels, names, or flags in `public/data.json`:
```json
"languages": [
  { "code": "en", "label": "EN", "name": "English", "flag": "🇬🇧" },
  { "code": "es", "label": "ES", "name": "Español", "flag": "🇪🇸" }
]
```
Even if you leave old entries in this array, the website will **only display buttons for language files that actually exist on disk**. If a file is missing or deleted, its button will never appear!

### Automatic Translation Script (Optional):
If you have Python installed on your computer, you can auto-translate your `data.json` into all languages configured in your `"languages"` array by running:
```bash
npm run translate
```
This script uses standard Python libraries (no extra packages needed) and creates `data.it.json`, `data.es.json`, etc., automatically!

---

## 🏗️ Step 7: Build for Production

When you are ready to put your website online:

1. In your terminal, stop the dev server if it is running (`Ctrl + C`).
2. Run:
   ```bash
   npm run build
   ```
3. Vite will compile and optimize your website. In less than 2 seconds, you will see:
   ```text
   ✓ built in 980ms
   ```
4. A new folder named **`dist`** will be generated inside your project folder.
   - This `dist` folder contains your complete, self-contained, optimized static website (HTML, CSS, JavaScript, and assets).

### Test the Production Build Locally:
To preview how your production build runs before publishing it online, run:
```bash
npm run preview
```
Open the link displayed (e.g. `http://localhost:8080/` or `http://localhost:4173/`).

---

## 🚀 Step 8: Deploy Your Website for Free

You can host this website completely free of charge. Here are the two easiest ways for non-developers:

### Method 1: Netlify Drop (Easiest — No Account or Git Required)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Open your project folder in File Explorer (Windows) or Finder (Mac).
3. Drag the **`dist`** folder and drop it into the upload box on Netlify's webpage.
4. Netlify will upload and deploy your website in seconds, giving you a live public URL (e.g. `https://your-name.netlify.app`)!

### Method 2: Vercel
1. Go to [https://vercel.com](https://vercel.com) and create a free account.
2. Click **"Add New Project"**.
3. Import your GitHub repository (or use the Vercel CLI / drag-and-drop).
4. Vercel automatically detects Vite settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**. Your site is live with automatic SSL!

---

## ❓ Troubleshooting & FAQ

### 1. `command not found: node` or `'node' is not recognized`
- **Cause**: Node.js was not installed, or your terminal was open before Node.js finished installing.
- **Solution**: Completely close all Terminal / Command Prompt windows, open a new one, and run `node -v`. If it still fails, re-download the installer from [nodejs.org](https://nodejs.org) and run it again.

### 2. `Execution of scripts is disabled on this system` (Windows PowerShell)
- **Cause**: Windows PowerShell default security policy blocks script execution.
- **Solution**:
  1. Open PowerShell as Administrator (Search "PowerShell" in Start menu, right-click, select "Run as Administrator").
  2. Type:
     ```powershell
     Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
     ```
  3. Press `Enter`, type `Y`, and press `Enter`.
  4. Now run your `npm` commands normally.

### 3. Changes in `data.json` are not appearing in the browser
- **Cause**: The browser might have cached the JSON file.
- **Solution**:
  - Do a hard refresh:
    - On Windows: Press `Ctrl + F5` or `Ctrl + Shift + R`.
    - On Mac: Press `Cmd + Shift + R`.
  - Check your terminal: make sure `npm run dev` is still running.

### 4. `JSON Syntax Error` after editing `data.json`
- **Cause**: A missing comma, an extra trailing comma, or an unclosed quotation mark in `data.json`.
- **Solution**:
  - In JSON, all keys and strings must be in double quotes (`"like this"`).
  - Every list item or object property must be separated by a comma, except the very last item in a group.
  - You can copy and paste your `data.json` content into [jsonlint.com](https://jsonlint.com) to instantly find and fix the exact line with the error.

### 5. Port 5173 is already in use
- **Cause**: Another instance of the dev server is already running in the background.
- **Solution**: Vite will automatically try the next available port (e.g. `http://localhost:5174/`). Look at the link printed in your terminal and open that one instead.

---

## 📄 License

This portfolio template is open-source and free to use, modify, and share under the [MIT License](LICENSE).
