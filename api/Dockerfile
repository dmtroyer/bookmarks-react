# Check out https://hub.docker.com/_/node to select a new base image
FROM node:18.13.0

RUN yarn global add @loopback/cli

# Set to a non-root built-in user `node`
USER node

WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

RUN yarn install

# Bundle app source code
COPY --chown=node . .

RUN yarn run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3001

EXPOSE ${PORT}
CMD [ "yarn", "start" ]
