FROM node:18


WORKDIR /apps 

COPY package.json ./
COPY  .  .
RUN yarn install

EXPOSE 5173
EXPOSE 5000

CMD [ "yarn","start" ]