#!/bin/bash

DEPLOYMENTPATH="/zignaly/{directory}"

cd $DEPLOYMENTPATH/deploy
sudo yarn --scope=@zignaly-open/raffles-client --include-dependencies
sudo yarn run build --scope=@zignaly-open/raffles-client --include-dependencies

# Copy build to keep a cache
sudo cp -r $DEPLOYMENTPATH/deploy $DEPLOYMENTPATH/temp

# Replace release
sudo rm -rf $DEPLOYMENTPATH/release
sudo mv $DEPLOYMENTPATH/temp $DEPLOYMENTPATH/release