#!/bin/bash

DEPLOYMENTPATH="/zignaly/{directory}"

sudo rm -rf $DEPLOYMENTPATH/temp
sudo mv $DEPLOYMENTPATH/deploy $DEPLOYMENTPATH/temp
cd $DEPLOYMENTPATH/temp
# Build
sudo yarn --scope=@zignaly-open/raffles-client --include-dependencies
sudo yarn run build --scope=@zignaly-open/raffles-client --include-dependencies

# Replace release
sudo rm -rf $DEPLOYMENTPATH/release
sudo mv $DEPLOYMENTPATH/temp $DEPLOYMENTPATH/release