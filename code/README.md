240919
Setting up client and server in local development environment (NOTE: this may evolve over time):

Make sure your in the right branch
in the terminal type git checkout db_test
(NOTE: this may get pushed to the dev branch soon)

The type git pull

cd code/client
npm install

cd code/server
npm install

# Then make sure you have a terminal split screen and in the server folder type:
npm run dev
# and in the client folder type:
npm run start



# Using docker to run all 3 services (mongodb, api, client)
Make sure to start the docker engine by starting up Docker Desktop. Note make sure to log in.

docker login -u your_username -p your_password --This will log you in using bash

# Make sure you're in the code folder 

# This will stop all containers from running
docker stop $(docker ps -aq)

# This removes all containers (deletes them)
docker rm $(docker ps -aq)

# The will remove all images 
docker rmi $(docker images -q)

# The commands below will build and run the server and client docker file for the development environment

    To build:
        cd into the server folder and enter:  docker build -t api-dev -f Dockerfile.dev .
        cd into the client folder and enter:  docker build -t client-dev -f Dockerfile.dev .

    To run:
        cd into the code folder and enter:  docker-compose -f docker-compose-dev.yml up

 
# The commands below will build and run the server and client docker file for the production environment

    To build:
        cd into the server folder and enter:  docker build -t api-production .
        cd into the client folder and enter:  docker build -t client-production -f Dockerfile.production .

    To run:
        cd into the code folder and enter:  docker-compose -f docker-compose-production.yml up