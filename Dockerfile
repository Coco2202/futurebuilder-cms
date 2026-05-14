FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
# postinstall runs during npm ci and needs scripts/remove-dup-atypes.cjs
COPY scripts ./scripts
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
