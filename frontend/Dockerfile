FROM node:16 AS build
WORKDIR /frontend
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "host"]