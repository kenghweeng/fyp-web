FROM node

WORKDIR /app

EXPOSE 3000

COPY package* ./
RUN npm install

COPY . .
RUN npm run build

ENTRYPOINT ["serve", "-s", "build"]
