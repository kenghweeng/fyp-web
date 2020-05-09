FROM node

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000

COPY package.json /app/package.json
RUN npm install -g serve && npm install --silent

COPY . .
RUN npm run build

ENTRYPOINT ["serve", "-s", "build", "-l", "3000"]
