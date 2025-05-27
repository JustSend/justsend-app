FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

RUN npm install -g expo-cli

CMD ["expo", "start", "--tunnel", "--non-interactive"]
