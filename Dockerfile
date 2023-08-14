ARG NODE_VERSION=18.12.1

FROM node:18-alpine

WORKDIR /app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci 

COPY . .

CMD npx nightwatch --env api_testing
