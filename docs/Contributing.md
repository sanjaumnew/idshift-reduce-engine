# Contributing to Reduce ⚡

Thank you for your interest in contributing to **Reduce Engine**!  
This guide will walk you through the process of setting up your environment, making changes, and submitting them for review.

---

## 🛠️ Getting Started

1. **Fork the Repository**
   - Click the **Fork** button on the top right of the repo page.
   - This creates your own copy of Reduce under your GitHub account.

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/<your-username>/reduce.git
   cd reduce
3. Install Dependencies
npm install
4. Run Tests
. Ensure everything works before making changes:
npm test
✨ Making Changes- Code Style
- Keep scripts modular and drop‑in ready.
- Always include explicit error handling and logging.
- Follow existing naming conventions (reduce.js, classify.js, etc.).
. Documentation
- Update relevant docs in /docs when adding new features.
- Ensure schema changes are reflected in reportSchema.json.
. Branding
- Use the locked Reduce logo and hero banner for any UI or docs.
- Maintain consistency in favicon and social preview assets..
📊 Reporting & Schema- If you add new report fields:
- Update schema/reportSchema.json.
- Provide a sample in schema/reportSample.json.
- Document changes in this guide for contributors.
🔄 Submitting Changes
1. Create a Branch
git checkout -b feature/my-new-feature
2. Commit Your Work
git commit -m "Add new feature: my-new-feature"
3. Push to Your Fork
git push origin feature/my-new-feature
4. Open a Pull Request
- Go to your fork on GitHub.
- Click Compare & pull request.
- Provide a clear description of your changes.
✅ Contribution Checklist- []Code is modular and drop‑in ready
- [ ] Error handling and logging included
- [ ] Tests pass locally (npm test)
- [ ] Documentation updated in /docs
- [ ] Schema changes reflected in reportSchema.json and reportSample.json
- [ ] Branding assets remain consistent
🤝 Community Guidelines- Be respectful and collaborative.
- Provide constructive feedback in code reviews.
- Keep discussions focused on technical and project goals.
📜 LicenseBy contributing, you agree that your contributions will be licensed under the MIT License.









