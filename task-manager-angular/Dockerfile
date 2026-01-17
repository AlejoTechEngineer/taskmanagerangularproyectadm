# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Production stage ----------
FROM nginx:alpine

# SPA fallback (Angular routes)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos generados por Angular desde la carpeta correcta
COPY --from=build /app/dist/task-manager-angular/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
