#FROM node:lts-buster AS build 
FROM node:lts-alpine AS builder 
RUN apk add --no-cache python make g++
RUN addgroup --gid 1024 nodegroup
## add user node to the group with GID 1024
RUN adduser node nodegroup 
USER node
#ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
#ENV PATH=$PATH:/home/node/.npm-global/bin
WORKDIR /home/node

# Copy or mount node app here
COPY --chown=node:nodegroup package*.json /home/node/

RUN npm install



FROM node:lts-alpine as app

RUN addgroup --gid 1024 nodegroup
## add user node to the group with GID 1024
RUN adduser node nodegroup 
USER node
COPY --chown=node:node ./docker/entrypoint.sh /tmp/
RUN ["chmod", "+x", "/tmp/entrypoint.sh"]

WORKDIR /home/node/
## Copy built node modules and binaries without including the toolchain
COPY --from=builder /home/node/node_modules node_modules

ENV PATH=/home/node/node_modules/.bin:$PATH

COPY --chown=node:node . .

RUN cat /tmp/entrypoint.sh
#RUN ls -al /home/node

EXPOSE 8081
ENTRYPOINT ["/tmp/entrypoint.sh"]