# Reduce ⚡ Engine (idshift-reduce-engine)

IDShift Reduce Engine — A modular identity risk detection and privilege optimization engine.  
Provides JSON‑driven account analysis, classification, and actionable reporting to reduce access sprawl.  
Includes demo site, schema validation, branded assets, and PWA support for GitHub Pages deployment.

![Hero Banner](assets/hero-banner.png)

---

## 🔎 Overview
**Reduce Engine** is a lightweight identity risk reduction tool.  
It helps organizations and developers **analyze, classify, and reduce risks** in:
- Human accounts
- Agentic AI identities
- Non‑human or synthetic entities

The engine produces **clear JSON reports** with schema separation (free vs. premium) and branded visuals for demo and enterprise adoption.

---

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Build Status](https://img.shields.io/github/actions/workflow/status/yourrepo/ci.yml)
![Version](https://img.shields.io/badge/version-0.1.0-orange.svg)

---

## 🚀 Features
- ⚙️ Modular core with drop‑in scripts and explicit error handling  
- 📊 JSON reports (`reportSchema.json` and `reportSample.json`)  
- 🛡️ Risk flags for anomalies in identity data  
- 🎨 Locked Reduce logo, hero banner, favicon, and social previews  
- 🌐 Web + CLI support  

---

## 📂 Project Structure
reduce/ ├── assets/              # Logos, banners, favicons ├── docs/                # Contributor guides, onboarding ├── schema/              # Report schema and samples │   ├── reportSchema.json │   └── reportSample.json ├── src/                 # Core engine scripts │   ├── reduce.js │   ├── classify.js │   └── utils/ ├── tests/               # QA scripts and sample reports └── README.md            # Project overview

---

## 🖥️ Usage

### Web (GitHub Pages)
1. Open [https://reduce.idshift.cloud](https://reduce.idshift.cloud)  
2. Click **Run Reduce**  
3. View sample JSON reports with risk flags  

### CLI
Run Reduce locally:
```bash
git clone https://github.com/sanjaumnew/idshift-reduce-engine.git
cd reduce
npm install
npm run reduce --input accounts.json --output report.json
📊 Report Schema
Reports are generated in JSON format with clear separation of free vs. premium fields
{
  "accountId": "12345",
  "classification": "human",
  "riskFlags": ["none"],
  "timestamp": "2026-01-13T18:30:00Z"
}
📈 Roadmap
- [x] Report schema finalized (reportSchema.json)
- [x] Sample report (reportSample.json)
- [x] Logo locked and branded assets prepared
- [ ] Premium‑tier separation
- [ ] API integration
- [ ] Enterprise dashboard
🤝 Contributing
We welcome contributions! Please read the guidelines in /docs/Contributing.md before submitting pull requests.

📜 License
MIT License. See LICENSE for details.

---

