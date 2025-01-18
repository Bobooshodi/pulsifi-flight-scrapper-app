FROM node:latest
# EXPOSE 3000
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# RUN npm install -g yarn
COPY package.json package.json 
RUN yarn && yarn cache clean --force
COPY . .

CMD ["yarn", "start:dev"]