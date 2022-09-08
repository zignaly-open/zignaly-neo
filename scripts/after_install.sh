#!/bin/bash

DEPLOYMENTPATH="/zignaly/{directory}"

# Move deploy folder to avoid it from being cleared out by codedeploy when deploying to another env.
rm -rf $DEPLOYMENTPATH/temp
mv $DEPLOYMENTPATH/deploy $DEPLOYMENTPATH/temp

# Build
cd $DEPLOYMENTPATH/temp
yarn --scope=@zignaly-open/raffles-client --include-dependencies
yarn run build --scope=@zignaly-open/raffles-client --include-dependencies

# Replace release
rm -rf $DEPLOYMENTPATH/release
mv $DEPLOYMENTPATH/temp $DEPLOYMENTPATH/release

# Restart pm2
pm2 restart zigbids-api-{directory}