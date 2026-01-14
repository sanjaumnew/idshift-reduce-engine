/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

// Load the HTML file into JSDOM
const html = fs.readFileSync(path.resolve(__dirname, '../docs/index.html'), 'utf8');

describe('Drag & Drop Upload UI', () => {
  let document;
  let dropZone;
  let fileInput;
  let runButton;
  let reportGrid;

  beforeEach(() => {
    document = require('jsdom').JSDOM(html).window.document;
    dropZone = document.getElementById('dropZone');
    fileInput = document.getElementById('fileInput');
    runButton = document.getElementById('runButton');
    reportGrid = document.getElementById('reportGrid');
  });

  test('Drop zone exists and has correct text', () => {
    expect(dropZone).not.toBeNull();
    expect(dropZone.textContent).toMatch(/Drag & drop/);
  });

  test('File input is hidden but present', () => {
    expect(fileInput).not.toBeNull();
    expect(fileInput.hasAttribute('hidden')).toBe(true);
  });

  test('Run button exists and is styled', () => {
    expect(runButton).not.toBeNull();
    expect(runButton.classList.contains('btn-primary')).toBe(true);
  });

  test('Report grid is empty initially', () => {
    expect(reportGrid.innerHTML).toBe('');
  });
});