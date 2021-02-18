FROM rust

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get update
RUN apt-get install -y nodejs

# To set env values --build-arg
# example to set env values:
# docker build --build-arg NODE_ENV=env_name <path_to_dir>
RUN npm install react-scripts -g
WORKDIR /app
COPY . /app

WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app/server
RUN npm install

EXPOSE 8080
CMD [ "sh", "-c", "npm run start & cd /app/glot && cargo run"]
