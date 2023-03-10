FROM node:16.13.0-slim as builder

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY babel.config.js ./
COPY src ./src
RUN npm install
RUN npm run build

FROM node:16.13.0-slim

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install --only=production --silent
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 4000

CMD ["npm", "run", "start:prod"]