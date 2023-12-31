FROM node:latest AS app

WORKDIR /usr/src/app
COPY package.json /usr/src/app/

ENV DOCKERIZE_VERSION v0.7.0
RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*


RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node","index.js" ]

# FROM ngin

# COPY . /usr/share/nginx/html