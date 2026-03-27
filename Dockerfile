# Use a Node.js Alpine image for the builder stage
FROM node:25-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i -g pnpm
RUN pnpm i
COPY . .
RUN npm run build

# Use another Node.js Alpine image for the final stage
FROM node:25-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
COPY server.js .

EXPOSE 80
EXPOSE 443

ENV NODE_ENV=production
CMD [ "node", "build" ]