#!/bin/bash


DEPLOYMENTPATH="~/{directory}"
\. "~/.nvm/nvm.sh"

# Change permissions
sudo chown -R admin:admin $DEPLOYMENTPATH/deploy

# Install server
which pm2
which npm
nvm use 20
which pm2
which npm
cd $DEPLOYMENTPATH/deploy/packages/ps2
npm i express serve-static


