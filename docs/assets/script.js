document.addEventListener('DOMContentLoaded', () => {
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  const runButton = document.getElementById('runButton');
  const reportGrid = document.getElementById('reportGrid');
  let accounts = [];

  // Drag & Drop
  dropZone.addEventListener('click', () => fileInput.click());

  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', async e => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      accounts = JSON.parse(text);
      console.log('Accounts loaded via drag & drop:', accounts);
    } catch (err) {
      alert('Invalid JSON file');
      console.error(err);
    }
  });

  // File Input
  fileInput.addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      accounts = JSON.parse(text);
      console.log('Accounts loaded via file input:', accounts);
    } catch (err) {
      alert('Invalid JSON file');
      console.error(err);
    }
  });

  // Run Reduce (mock demo)
  runButton.addEventListener('click', () => {
    if (!Array.isArray(accounts) || !accounts.length) {
      alert('Please upload a valid JSON file first');
      return;
    }

    const reports = accounts.map((acc, i) => ({
      accountId: acc.accountId || `record-${i}`,
      classification: acc.type || 'unknown',
      severity: acc.activityScore && acc.activityScore > 50 ? 'low' : 'high',
      riskFlags: Array.isArray(acc.traits) ? acc.traits : [],
      timestamp: new Date().toISOString()
    }));

    if (!reports.length) {
      reportGrid.innerHTML = '<p>No reports generated.</p>';
      return;
    }

    reportGrid.innerHTML = reports.map(r => `
      <div class="report-card">
        <h3>${r.accountId}</h3>
        <p><strong>Classification:</strong> ${r.classification}</p>
        <p><strong>Severity:</strong> ${r.severity}</p>
        <p><strong>Risk Flags:</strong> ${r.riskFlags.join(', ') || 'None'}</p>
        <p class="timestamp">${r.timestamp}</p>
      </div>
    `).join('');
  });
});