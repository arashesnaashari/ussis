# Credit: https://github.com/clintonwoo/hackernews-remix-react/blob/main/Dockerfile
ARG NODE_VERSION
FROM node:18-alpine AS base

# Install all node_modules, including dev dependencies
FROM base as deps
RUN mkdir /project
WORKDIR /project

ADD package.json package-lock.json ./
RUN npm install --production=false

# Setup production node_modules
FROM base as production-deps
RUN mkdir /project
WORKDIR /project

COPY --from=deps /project/node_modules /project/node_modules
ADD package.json package-lock.json ./
RUN npm prune --production

# Build the project
FROM base as build
ENV NODE_ENV=production
RUN mkdir /project
WORKDIR /project

COPY --from=deps /project/node_modules /project/node_modules
ADD public ./public
ADD app ./app
ADD package.json package-lock.json remix.config.js remix.env.d.ts tsconfig.json ./
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base
ENV NODE_ENV=production
ENV PORT=8080
RUN mkdir /project
WORKDIR /project

COPY --from=production-deps /project/node_modules /project/node_modules
COPY --from=build /project/build /project/build
COPY --from=build /project/public /project/public
COPY package.json package-lock.json ./

# Expose the container port to the OS
EXPOSE 8080
ENTRYPOINT npm run start

# docker run -p 8080:8080 -d imageId