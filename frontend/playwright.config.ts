import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './ui-tests', // Verzeichnis für deine Tests
  timeout: 30000, // Standard Timeout für Tests (30 Sekunden)
  retries: 1, // Anzahl der Wiederholungen bei fehlgeschlagenen Tests
  use: {
    headless: true, // Headless-Modus (setze auf false, um Browser-Fenster zu sehen)
    viewport: { width: 1280, height: 720 }, // Standard-Bildschirmgröße
    actionTimeout: 0, // Kein Timeout für Aktionen
    ignoreHTTPSErrors: true, // Ignoriere HTTPS-Fehler
    video: 'retain-on-failure', // Video aufzeichnen bei Fehlern
    screenshot: 'only-on-failure', // Speichere Screenshots bei Fehlern
    trace: 'retain-on-failure', // Trace bei Fehlern speichern
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }, // Tests im Chromium-Browser
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' }, // Tests im Firefox-Browser
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' }, // Tests im Webkit-Browser
    },
  ],
  reporter: [['list'], ['html', { outputFolder: 'ui-tests/test-results/html' }]], // Verwende 'list' und 'html' Reporter
  outputDir: 'ui-tests/test-results/artifacts',
});
