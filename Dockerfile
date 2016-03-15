FROM node:0.10.43

RUN apt-get install -y curl
RUN curl https://install.meteor.com/ | /bin/sh

WORKDIR /opt/src
VOLUME /opt/src

EXPOSE 3000
CMD meteor run --settings settings.json
