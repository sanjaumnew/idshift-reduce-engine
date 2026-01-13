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
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', async e => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  const text = await file.text();
  accounts = JSON.parse(text);
});

fileInput.addEventListener('change', async e => {
  const file = e.target.files[0];
  const text = await file.text();
  accounts = JSON.parse(text);
});

// Run Reduce (mock demo)
runButton.addEventListener('click', () => {
  if (!accounts.length) {
    alert('Please upload a JSON file first');
    return;
  }

  const reports = accounts.map((acc, i) => ({
    accountId: acc.accountId || `record-${i}`,
    classification: acc.type || 'unknown',
    severity: acc.activityScore > 50 ? 'low' : 'high',
    riskFlags: acc.traits || [],
    timestamp: new Date().toISOString()
  }));

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