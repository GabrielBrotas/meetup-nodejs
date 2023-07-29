FROM node:16.20.1-slim as builder

WORKDIR /usr/src/app

COPY package.json tsconfig.base.json ./
COPY packages ./packages
RUN npm install
RUN npm run build

FROM node:16.20.1-slim

WORKDIR /usr/src/app

COPY package*.json ./

COPY --from=builder /usr/src/app/packages/core/dist ./packages/core/dist
COPY --from=builder /usr/src/app/packages/core/package*.json ./packages/core/

COPY --from=builder /usr/src/app/packages/adapters/http/dist ./packages/adapters/http/dist
COPY --from=builder /usr/src/app/packages/adapters/http/package*.json ./packages/adapters/http/

RUN npm install --only=production --silent

EXPOSE 4001

CMD ["npm", "run", "start:prod"]