#!/bin/bash

DEPLOYMENTPATH="/zignaly/{directory}"

# Install server
cd $DEPLOYMENTPATH/deploy/raffles-server
yarn

# Move client
sudo rm -rf $DEPLOYMENTPATH/client
sudo mv $DEPLOYMENTPATH/deploy/raffles-client $DEPLOYMENTPATH/client

# Restart server
pm2 restart zigbids-api-{directory}
