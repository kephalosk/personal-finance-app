export default {
  presets: [
    '@babel/preset-env', // Für die Unterstützung von ES6+ und modernen JavaScript-Funktionen
    '@babel/preset-react', // Für die Unterstützung von JSX
    '@babel/preset-typescript', // Für TypeScript-Unterstützung
  ],
  // Optional: Environment-spezifische Konfigurationen
  env: {
    development: {
      plugins: ['react-refresh/babel'], // Für React Refresh im Entwicklungsmodus
    },
    production: {
      // Hier können Plugins für den Produktionsmodus konfiguriert werden
    },
  },
};
