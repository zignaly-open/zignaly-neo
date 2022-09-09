#!/bin/bash

DEPLOYMENTPATH="/zignaly/{directory}"

# Change permissions
sudo chown -R admin:admin $DEPLOYMENTPATH/deploy

# Install server
cd $DEPLOYMENTPATH/deploy/packages/raffles-server
yarn

# Move client
rm -rf $DEPLOYMENTPATH/client
mv $DEPLOYMENTPATH/deploy/packages/raffles-client $DEPLOYMENTPATH/client

# Restart server
pm2 restart zigbids-api-{directory}
