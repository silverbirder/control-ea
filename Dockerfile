FROM node:10-alpine
RUN npm install -g http-server --unsafe-perm
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "http-server", "dist" ]