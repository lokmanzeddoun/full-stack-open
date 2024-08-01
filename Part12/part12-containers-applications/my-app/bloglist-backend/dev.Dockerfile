FROM node:20
WORKDIR /usr/app/src
COPY . .
RUN npm install
CMD [ "npm","run","dev", "--","--host" ]
