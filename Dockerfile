FROM node:16-alpine

COPY ./iconic web
COPY ./iconic-server serv

WORKDIR /web

RUN npm install
RUN npm run build

WORKDIR /serv

RUN npm install
RUN npm run build

RUN mv /web/build /serv/build/client

ENTRYPOINT [ "npm", "start" ]