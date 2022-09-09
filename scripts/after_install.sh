#!/bin/bash

DEPLOYMENTPATH="/zignaly/{directory}"

# Install server
cd $DEPLOYMENTPATH/deploy/packages/raffles-server
yarn

# Move client
sudo rm -rf $DEPLOYMENTPATH/client
sudo mv $DEPLOYMENTPATH/deploy/packages/raffles-client $DEPLOYMENTPATH/client

# Restart server
pm2 restart zigbids-api-{directory}
