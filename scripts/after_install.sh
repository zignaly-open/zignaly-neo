#!/bin/bash

DEPLOYMENTPATH="/zignaly/{directory}"

# Change permissions
sudo chown -R admin:admin $DEPLOYMENTPATH/deploy

# Install server
cd $DEPLOYMENTPATH/deploy/packages/raffles-server
yarn

# Restart server
pm2 restart zigbids-api-{directory}
