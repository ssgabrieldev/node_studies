FROM node

WORKDIR .

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY src src

ENV PORT=3000

RUN npm install

CMD npm run dev
