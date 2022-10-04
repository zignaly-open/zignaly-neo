#!/bin/bash

DEPLOYMENTPATH="/zignaly/{directory}"

# Change permissions
sudo chown -R admin:admin $DEPLOYMENTPATH/deploy

# Install server
cd $DEPLOYMENTPATH/deploy/packages/raffles-server
yarn

# Move client build
mv $DEPLOYMENTPATH/deploy/packages/raffles-client/build $DEPLOYMENTPATH/releases/$DEPLOYMENT_ID
# Set new client release symlink 
ln -nfs --relative $DEPLOYMENTPATH/releases/$DEPLOYMENT_ID $DEPLOYMENTPATH/client

# Restart server
pm2 restart zigbids-api-{directory}
