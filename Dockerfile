FROM node:20
WORKDIR /app

COPY package*.json ./
RUN npm install

# RUN npm ci --only=production

COPY . .

RUN npx prisma generate
RUN npx prisma migrate dev
RUN npx prisma migrate deploy
RUN npm run build 


EXPOSE 3000 4000 

CMD [ "npm","run","start","prod" ]
