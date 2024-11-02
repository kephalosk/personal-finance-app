# Schritt 1: Verwende ein Node.js-Image, um die App zu bauen
FROM node:18 AS build

# Erstelle ein Verzeichnis für die App
WORKDIR /app

# Kopiere die package.json und package-lock.json aus dem frontend-Verzeichnis zum Caching der Abhängigkeiten
COPY ../frontend/package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den restlichen Code der App aus dem frontend-Verzeichnis ins Arbeitsverzeichnis
COPY ../frontend .

# Baue die App für die Produktion
RUN npm run build

# Schritt 2: Verwende ein Nginx-Image, um die gebaute App zu servieren
FROM nginx:alpine

# Kopiere das Build-Verzeichnis aus dem vorherigen Schritt in das Standardverzeichnis von Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Kopiere eine benutzerdefinierte Nginx-Konfiguration (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Öffne Port 80, um auf die App zugreifen zu können
EXPOSE 80

# Starte Nginx (dies ist standardmäßig im Nginx-Image enthalten)
CMD ["nginx", "-g", "daemon off;"]
