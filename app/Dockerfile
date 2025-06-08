FROM ubuntu:latest
ARG NODE_VERSION=22


# install curl
RUN apt update && apt install curl -y


# install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash


# set env
ENV NVM_DIR=/root/.nvm


# install node
RUN bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION"


# set ENTRYPOINT for reloading nvm-environment
ENTRYPOINT ["bash", "-c", "source $NVM_DIR/nvm.sh && exec \"$@\"", "--"]


WORKDIR /app
COPY . .


RUN bash -c "source $NVM_DIR/nvm.sh && nvm use $NODE_VERSION && npm install"


# set cmd to bash
CMD ["npm", "start"]
