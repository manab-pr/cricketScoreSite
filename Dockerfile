FROM node:18


WORKDIR /apps 

COPY package.json ./
COPY  .  .
RUN yarn install

EXPOSE 3000
EXPOSE 5000

CMD [ "yarn","start" ]