FROM node

WORKDIR /app

EXPOSE 3000

COPY package* ./
RUN npm install

COPY . .

# for node debug
# ENV DEBUG=* 

CMD ["npm", "start"]