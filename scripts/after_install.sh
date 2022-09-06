#!/bin/bash

DEPLOYMENTPATH="/zignaly/{directory}"

cd $DEPLOYMENTPATH/deploy
sudo yarn --scope=@zignaly-open/raffles-client --include-dependencies
sudo yarn lerna run build --scope=@zignaly-open/raffles-client --include-dependencies

# sudo cp -r $DEPLOYMENTPATH/release $DEPLOYMENTPATH/releases/$DEPLOYMENT_ID
sudo mv $DEPLOYMENTPATH/deploy $DEPLOYMENTPATH/release
# sudo ln -nfs --relative $DEPLOYMENTPATH/release $DEPLOYMENTPATH/app