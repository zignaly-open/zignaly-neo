#!/bin/bash


DEPLOYMENTPATH="~/{directory}"

# Change permissions
sudo chown -R admin:admin $DEPLOYMENTPATH/deploy

# Install server
cd $DEPLOYMENTPATH/deploy/packages/ps2
which pm2
which npm
nvm use 20
which pm2
which npm
npm i express serve-static


