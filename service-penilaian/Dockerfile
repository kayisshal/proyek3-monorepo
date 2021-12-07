# FROM node:16-alpine3.14

# WORKDIR /usr/src/service-penilaian

# CMD ["./bootstrap.sh"]

FROM node:15-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6001

CMD ["npm", "run", "serve:development"]
