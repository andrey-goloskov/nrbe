FROM node:20.9-bookworm
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3003
CMD ["node", "app.js"]

# добавить смену владельца папки.
# чтобы запускать от пользователя node