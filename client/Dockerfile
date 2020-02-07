FROM node:lts-buster AS builder
WORKDIR /data/
RUN chmod -R a+rw /data/
RUN addgroup --gid 1024 nodegroup
## add user node to the group with GID 1024
RUN adduser node nodegroup 
RUN chown -R node:nodegroup /data
USER node
COPY --chown=node:nodegroup package.json /data/

RUN npm install

ENV PATH=/data/node_modules/.bin:$PATH

COPY . .
COPY ./docker/entrypoint.sh /entrypoint/
USER root
RUN ["chmod", "+x", "/entrypoint/entrypoint.sh"]
USER node
RUN npm run build
ENTRYPOINT ["/entrypoint/entrypoint.sh"]


FROM nginx:stable-alpine as app

ARG NGINX_PORT
ARG API_URL
RUN addgroup -g 1024 -S nginx nodegroup
COPY --from=builder /data/dist /usr/share/nginx/html
COPY docker/nginx.conf.template /etc/nginx/conf.d/nginx.conf.template
RUN export
#RUN sh -c "export && envsubst '$NGINX_PORT $API_URL' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/custom.conf"
RUN sh -c "envsubst \"`env | awk -F = '{printf \" \\\\$%s\", $1}'`\" < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/custom.conf"


#CMD ["nginx", "-g", '"daemon off;"']

#CMD ["cat", "/etc/nginx/conf.d/custom.conf"]

# FROM node:lts-alpine as app
# USER node
# WORKDIR /data/
# ## Copy built node modules and binaries without including the toolchain
# COPY --from=builder /data/node_modules .

# ENV PATH=/data/node_modules/.bin:$PATH

# COPY . .

# EXPOSE 8080
# ENTRYPOINT ["/entrypoint/entrypoint.sh"]