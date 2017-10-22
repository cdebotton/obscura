FROM node:8.7.0
LABEL maintainer="Christian de Botton <christian@vimeo.com>"

WORKDIR /usr/src/app

RUN npm i -g yarn
COPY package.json .
RUN yarn

EXPOSE 3000

CMD ["yarn", "dev"]