FROM node:20
WORKDIR /usr/app/src
COPY --chown=node:node . .
RUN npm ci
USER node
RUN npm run test
CMD [ "npm","start" ]
