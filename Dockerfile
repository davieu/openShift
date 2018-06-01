FROM node:carbon

# create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]

# build with:
# docker build -t dkaramazov/node_penpal .
# run with:
# docker run -p 49160:8080 -d dkaramazov/node_penpal
# i.e. localhost:49160 mapped to docker container port 8080