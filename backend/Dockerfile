FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Instalar utilidad para esperar el puerto de PostgreSQL
RUN npm install -g wait-port

# Espera a que la BD esté lista y luego inicia el backend
CMD ["sh", "-c", "wait-port postgres_db:5432 && npm start"]
