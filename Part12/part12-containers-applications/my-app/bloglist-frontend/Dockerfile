FROM node:20 AS build-stage
WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

#RUN npm install -g serve
#CMD ["serve", "dist"]

FROM build-stage as test-stage 

RUN npm ci

USER node

COPY . .

RUN npm run test

FROM nginx:1.25-alpine
# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html