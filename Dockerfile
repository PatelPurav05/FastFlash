FROM node:16

WORKDIR /app

COPY . /app

RUN npm install -g react-scripts

RUN npm install

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]


