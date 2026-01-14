const fs = require('fs');
const path = require('path');

describe('Manifest and favicon setup', () => {
  const manifestPath = path.join(__dirname, '../docs/manifest.json');
  let manifest;

  beforeAll(() => {
    const raw = fs.readFileSync(manifestPath, 'utf-8');
    manifest = JSON.parse(raw);
  });

  test('Manifest has required fields', () => {
    expect(manifest.name).toBeDefined();
    expect(manifest.short_name).toBeDefined();
    expect(manifest.start_url).toMatch(/index\.html$/);
    expect(manifest.display).toBe('standalone');
    expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
  });

  test('All icons point to docs/assets/', () => {
    manifest.icons.forEach(icon => {
      expect(icon.src).toMatch(/^assets\//);
      expect(icon.type).toBe('image/png');
      expect(icon.sizes).toMatch(/^\d+x\d+$/);
    });
  });

  test('Theme and background colors are valid hex', () => {
    expect(manifest.theme_color).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(manifest.background_color).toMatch(/^#[0-9a-fA-F]{6}$/);
  });
});