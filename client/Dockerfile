FROM node:10

ADD . pentest

RUN npm install --prefix pentest
RUN npm install -g serve
EXPOSE 5000

RUN npm run build --prefix pentest
CMD serve -s ./pentest/build 