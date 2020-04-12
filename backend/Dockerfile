FROM registry.gitlab.com/morvag/profrate/nodium:latest

WORKDIR /usr/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "test"]
