FROM node:16.13.0-slim

RUN mkdir -p /usr/share/man/man1 && \
    echo 'deb http://ftp.debian.org/debian stretch-backports main' | tee /etc/apt/sources.list.d/stretch-backports.list && \
    apt update && apt install -y

RUN npm install -g npm@8.5.5

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD [ "tail", "-f" , "/dev/null" ]