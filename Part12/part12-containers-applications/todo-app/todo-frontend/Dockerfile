FROM node:20
ENV VITE_BACKEND_URL=http://localhost:3000
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build
RUN npm i -g serve
CMD [ "serve","dist" ]