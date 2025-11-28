FROM node:24-alpine AS base
WORKDIR /app
EXPOSE 3000
COPY ./package.json ./
RUN npm i --include-optional
CMD ["npm", "run", "dev"]