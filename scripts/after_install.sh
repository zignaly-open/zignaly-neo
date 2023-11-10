#!/bin/bash

DEPLOYMENTPATH="/zignaly/{directory}"

# Change permissions
sudo chown -R admin:admin $DEPLOYMENTPATH/deploy

# Install server
cd $DEPLOYMENTPATH/deploy/packages/ps2
npm i express serve-static
node server/index.js
