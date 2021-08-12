FROM node:latest
RUN ["mkdir","/install"]
ADD ["./package.json","/install"]
WORKDIR /install
RUN npm install --verbose
ENV NODE_PATH /install/node_modules
WORKDIR /app
COPY . /app/
EXPOSE 8082
CMD ["node","masterApi.js"]
