FROM node:20.5.0
WORKDIR /project/scripts
COPY package.json .
RUN npm i pnpm -g && pnpm i
COPY . .
RUN npm i tsc ts-node postject -g
RUN echo "nodejs@20.5.0"