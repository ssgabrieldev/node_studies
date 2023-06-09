FROM node

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

ENV PORT=3000

RUN npm install

CMD npm run dev
