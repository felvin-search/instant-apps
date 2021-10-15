FROM node:14

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY packages packages
COPY apps apps

RUN yarn install
RUN yarn workspace sandbox build
RUN yarn global add serve

CMD ["serve", "packages/sandbox/dist"]
