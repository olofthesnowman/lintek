FROM node:24-alpine AS build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY --from=build-stage /app/.output ./.output
EXPOSE 3000
ENTRYPOINT [ "node", ".output/server/index.mjs" ]