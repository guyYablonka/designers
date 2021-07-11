<<<<<<< HEAD
# pull official base image
FROM node:13.12.0-alpine

# install app dependencies
COPY package.json ./
RUN npm install

# add app
COPY . .

# start app
CMD ["npm", "start"]
=======
FROM node:10-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
>>>>>>> 09f29c6b1917f9667592266a24a4fdd924b33000
